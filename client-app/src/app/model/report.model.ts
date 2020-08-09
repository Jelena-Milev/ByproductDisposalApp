import { Warehouse } from './warehouse.model';
import { Employee } from './employee.model';
import { ReportItem } from './reportItem.model';

export class Report {
  constructor(
    public id: string,
    public date: Date,
    public utilizationRate: number,
    public note:string,
    public warehouse: Warehouse,
    public employee: Employee,
    public items: ReportItem[]
  ) {}
}
