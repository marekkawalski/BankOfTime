import { PageRequestData, PageRequestParams } from '@/models/PageRequestParams';

export interface MyPaginationProps {
  data: PageRequestData | null;
  handleGetData: (pageRequestParams: PageRequestParams) => Promise<void>;
  filters?: PageRequestParams;
}
