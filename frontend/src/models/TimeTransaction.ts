import { TransactionStatus } from '@/enums/TransactionStatus';

import { IOffer } from './Offer';

export interface TimeTransaction {
  readonly id: number;
  transactionStatus: TransactionStatus;
  transactionDate: string;
  offer: IOffer;
}
