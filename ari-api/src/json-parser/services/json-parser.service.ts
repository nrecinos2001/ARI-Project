import { BadRequestException, Injectable } from '@nestjs/common';

import { encrypt } from 'src/utils';

import { ParseTextDto } from '../dto';
import { GeometryType, Separator } from '../enums';
import { ICoordenatesBody } from '../types';

@Injectable()
export class JsonParserService {
  parsePolygon(text: string[]): ICoordenatesBody {
    const data: number[] = text.reduce((acc, current) => {
      const splittedText = current.split(',');
      acc.push([parseFloat(splittedText[0]), parseFloat(splittedText[1])]);
      return acc;
    }, []);
    return {
      type: 'Feature',
      geometry: { type: GeometryType.POLYGON, coordinates: [[data]] },
    };
  }

  parseCoordenate(text: string[]): ICoordenatesBody {
    const splittedText = text[0].split(',');
    const coordinates: number[] = [
      parseFloat(splittedText[0]),
      parseFloat(splittedText[1]),
    ];
    return {
      type: 'Feature',
      geometry: { type: GeometryType.POINT, coordinates },
    };
  }

  parse(parseTextDto: ParseTextDto) {
    const { separator, text } = parseTextDto;
    const splitter = separator === Separator.COMMA ? ',' : ';';

    const textObject = text.reduce((acc, current) => {
      try {
        const isSplitterFound = current.match(splitter);
        if (!isSplitterFound) {
          throw new BadRequestException(
            'The separator was not the correct one',
          );
        }
        const textForCoordenates = current.replaceAll(')', '');
        const coordenatesInitIndex = textForCoordenates.indexOf('(');
        const coordenatesPositions = textForCoordenates.slice(
          coordenatesInitIndex + 1,
        );
        const coordenatesToUpdate = coordenatesPositions
          .replaceAll('(', '\n')
          .split('\n');
        const isPolygon = coordenatesToUpdate.length > 1;

        const coordenates = isPolygon
          ? coordenatesToUpdate.filter((item) => item)
          : coordenatesToUpdate;

        const coordenatesBody = isPolygon
          ? this.parsePolygon(coordenates)
          : this.parseCoordenate(coordenates);
        const splittedText = current.split(splitter);

        const itemBody = {
          documento: splittedText[0],
          nombres: splittedText[1],
          apellidos: splittedText[2],
          tarjeta: encrypt(splittedText[3]),
          tipo: splittedText[4],
          telefono: splittedText[5],
          coordenates: coordenatesBody,
        };
        acc.push(itemBody);
        return acc;
      } catch {
        throw new BadRequestException('Review your data and try again');
      }
    }, []);
    return textObject;
  }
}
