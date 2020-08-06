import { Warehouse } from './warehouse.model';
import { MeasurementUnit } from './measurementUnit.model';

export class Byproduct {
  constructor(
    id: number,
    name: string,
    weightPerUM: number,
    quantity: number,
    measurementUnit: MeasurementUnit,
    warehouse: Warehouse
  ) {}
}
