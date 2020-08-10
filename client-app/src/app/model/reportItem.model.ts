import { Byproduct } from './byproduct.model';

export class ReportItem {
  constructor(
    public byproduct: Byproduct,
    public quantityForDisposal: number,
    public id?: number
  ) {}
}
