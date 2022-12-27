import { TimeTransaction } from '@/models/TimeTransaction';
import { PageRequestData } from '@/types/pageRequestParams';

export interface TimeTransactionsData extends PageRequestData {
  content: TimeTransaction[];
}
export interface TimeTransactionRequestParams {
  sortFieldUrl?: string;
  pageSizeUrl?: string;
  pageNumUrl?: string;
}
