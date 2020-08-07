import { Warehouse } from './warehouse.model';
import { MeasurementUnit } from './measurementUnit.model';

export class Byproduct {
  constructor(
    public id: number,
    public name: string,
    public weightPerUM: number,
    public quantity: number,
    public measurementUnit: MeasurementUnit,
    public warehouse: Warehouse
  ) {}
}
