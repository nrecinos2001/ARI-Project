import { GeometryType } from '../enums';

export interface ICoordenatesBody {
  type: string;
  geometry: {
    type: GeometryType;
    coordinates: number[] | number[][][];
  };
  properties?: any;
}
