import { Injectable } from '@nestjs/common';

import { ParseTextDto } from '../dto';
import { Separator } from '@JsonParser/enums';

@Injectable()
export class JsonParserService {
  parse(parseTextDto: ParseTextDto) {
    const { separator, text } = parseTextDto;
    const splitter = separator === Separator.COMMA ? ',' : ';';
    const textObject = text.reduce((acc, current) => {
      const polygonInitIndex = current.indexOf('(');
      const polygon = !polygonInitIndex
        ? undefined
        : current.slice(polygonInitIndex);
      const splittedText = current.split(splitter);
      const itemBody = {
        documento: splittedText[0],
        nombres: splittedText[1],
        apellidos: splittedText[2],
        tarjeta: splittedText[3],
      };
      acc.push(itemBody);
      return acc;
    }, []);
    return textObject;
  }
}
