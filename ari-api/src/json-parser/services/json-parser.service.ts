import { BadRequestException, Injectable } from '@nestjs/common';

import { ParseTextDto } from '../dto';
import { Separator } from '@JsonParser/enums';
import { encrypt } from 'src/utils';

@Injectable()
export class JsonParserService {
  parse(parseTextDto: ParseTextDto) {
    const { separator, text } = parseTextDto;
    const splitter = separator === Separator.COMMA ? ',' : ';';

    const textObject = text.reduce((acc, current) => {
      const isSplitterFound = current.match(splitter);
      if (!isSplitterFound)
        throw new BadRequestException('The separator was not the correct one');

      const polygonInitIndex = current.indexOf('(');
      const polygon = !polygonInitIndex
        ? undefined
        : current.slice(polygonInitIndex);
      const splittedText = current.split(splitter);

      const itemBody = {
        documento: splittedText[0],
        nombres: splittedText[1],
        apellidos: splittedText[2],
        tarjeta: encrypt(splittedText[3]),
        tipo: splittedText[4],
        telefono: splittedText[5],
      };
      acc.push(itemBody);
      return acc;
    }, []);
    return textObject;
  }
}
