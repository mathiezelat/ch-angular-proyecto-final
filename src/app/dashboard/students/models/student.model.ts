import { Commission } from '../../commissions/model/commission.model';

export interface Student {
  id?: string;
  firstName: string;
  lastName: string;
  profile: string;
  dni: string;
  isActive: boolean;
  commissions: Commission[];
}
