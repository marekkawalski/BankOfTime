import { OfferStatus } from '@/enums/OfferState';
import { OfferType } from '@/enums/OfferType';
import { SortBy } from '@/enums/SortBy';
import * as Yup from 'yup';

export const Filter_Validation = Yup.object().shape({
  keyword: Yup.string(),
  category: Yup.string(),
  sortBy: Yup.string().oneOf([
    undefined,
    SortBy.NAME_A_Z,
    SortBy.NAME_Z_A,
    SortBy.CHEAPEST_FIRST,
    SortBy.MOST_EXPENSIVE_FIRST,
    SortBy.NEWEST_FIRST,
    SortBy.OLDEST_FIRST,
  ]),
  offerStatus: Yup.string().oneOf([
    undefined,
    OfferStatus.ACTIVE,
    OfferStatus.APPROVED,
    OfferStatus.DELETED,
    OfferStatus.ON_HOLD,
  ]),
  offerType: Yup.string().oneOf([
    OfferType.ALL,
    OfferType.PURCHASE_OFFER,
    OfferType.SELL_OFFER,
  ]),
});
