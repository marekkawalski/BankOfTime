import { PageRequestData } from '@/models/PageRequestParams';
import { TimeTransaction } from '@/models/TimeTransaction';

export interface TimeTransactionsData extends PageRequestData {
  content: TimeTransaction[];
}
export interface TimeTransactionRequestParams {
  sortFieldUrl?: string;
  pageSizeUrl?: string;
  pageNumUrl?: string;
}
