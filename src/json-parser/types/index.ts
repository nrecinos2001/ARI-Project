import { GeometryType } from '../enums';

export interface ICoordinatesBody {
  type: string;
  geometry: {
    type: GeometryType;
    coordinates: number[] | number[][][];
  };
  properties?: any;
}
