import { Commission } from '../../commissions/model/commission.model';

export interface Course {
  id?: string;
  title: string;
  category: string;
  price: number;
  isActive: boolean;
  commissions: Commission[];
}
