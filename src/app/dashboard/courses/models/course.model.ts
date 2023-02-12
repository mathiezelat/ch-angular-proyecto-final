import { Commission } from '../../commissions/model/commission.model';

export interface Course {
  id?: string;
  title: string;
  category: string;
  hours: number;
  classes: number;
  teacher: string;
  price: number;
  isActive: boolean;
  commissions: Commission[];
}
