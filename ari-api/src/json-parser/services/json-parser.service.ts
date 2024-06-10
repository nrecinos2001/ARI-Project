import { BadRequestException, Injectable } from '@nestjs/common';

import { ParseTextDto } from '../dto';
import { GeometryType, Separator } from '../enums';
import { ICoordinatesBody } from '../types';
import { decryptData } from 'src/utils';

@Injectable()
export class JsonParserService {
  parsePolygon(text: string[]): ICoordinatesBody {
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

  parseCoordenate(text: string[]): ICoordinatesBody {
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
    const { separator, text: encryptedText, key } = parseTextDto;
    const [encryptedData, iv] = encryptedText;
    const rawText = decryptData(encryptedData, iv, key);
    const text = JSON.parse(rawText);
    const splitter = separator === Separator.COMMA ? ',' : ';';

    const textObject = text.reduce((acc, current) => {
      try {
        const isSplitterFound = current.match(splitter);
        if (!isSplitterFound) {
          throw new BadRequestException(
            'The separator was not the correct one',
          );
        }
        const textForCoordinates = current.replaceAll(')', '');
        const coordinatesInitIndex = textForCoordinates.indexOf('(');
        const coordinatesPositions = textForCoordinates.slice(
          coordinatesInitIndex + 1,
        );
        const coordinatesToUpdate = coordinatesPositions
          .replaceAll('(', '\n')
          .split('\n');
        const isPolygon = coordinatesToUpdate.length > 1;

        const coordinates = isPolygon
          ? coordinatesToUpdate.filter((item) => item)
          : coordinatesToUpdate;

        const coordinatesBody = isPolygon
          ? this.parsePolygon(coordinates)
          : this.parseCoordenate(coordinates);
        const splittedText = current.split(splitter);

        const itemBody = {
          documento: splittedText[0],
          nombres: splittedText[1],
          apellidos: splittedText[2],
          tarjeta: splittedText[3],
          tipo: splittedText[4],
          telefono: splittedText[5],
          coordinates: coordinatesBody,
        };
        acc.push(itemBody);
        return acc;
      } catch (error) {
        const errorMessage = error?.message || 'Review your data and try again';
        throw new BadRequestException(errorMessage);
      }
    }, []);
    return textObject;
  }
}
