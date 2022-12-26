import { OfferStatus } from '@/enums/OfferState';
import { OfferType } from '@/enums/OfferType';
import { SortBy } from '@/enums/SortBy';
import { SortDir } from '@/enums/SortDir';

import { UseSubmitFiltersProps } from './types';

function useSubmitFilters({
  handleGetOffers,
  handleSettingFilters,
}: UseSubmitFiltersProps) {
  const handleSubmit = async (submittedValues: {
    offerType: OfferType;
    offerStatus?: OfferStatus;
    sortBy: SortBy;
    keyword: string;
    category: string;
  }) => {
    let sortFieldUrl = "";
    let sortDirectionUrl = "";
    switch (true) {
      case SortBy.CHEAPEST_FIRST === submittedValues.sortBy:
        sortFieldUrl = `sort=price&`;
        sortDirectionUrl = `sort-dir=${SortDir.ASC}&`;
        break;
      case SortBy.MOST_EXPENSIVE_FIRST === submittedValues.sortBy:
        sortFieldUrl = `sort=price&`;
        sortDirectionUrl = `sort-dir=${SortDir.DESC}&`;
        break;
      case SortBy.NAME_A_Z === submittedValues.sortBy:
        sortFieldUrl = `sort=title&`;
        sortDirectionUrl = `sort-dir=${SortDir.ASC}&`;
        break;
      case SortBy.NAME_Z_A === submittedValues.sortBy:
        sortFieldUrl = `sort=title&`;
        sortDirectionUrl = `sort-dir=${SortDir.DESC}&`;
        break;
      case SortBy.NEWEST_FIRST === submittedValues.sortBy:
        sortFieldUrl = `sort=createdAt&`;
        sortDirectionUrl = `sort-dir=${SortDir.DESC}&`;
        break;
      case SortBy.OLDEST_FIRST === submittedValues.sortBy:
        sortFieldUrl = `sort=createdAt&`;
        sortDirectionUrl = `sort-dir=${SortDir.ASC}&`;
        break;
      default:
        console.log("Error");
        break;
    }
    const offerTypeUrl =
      submittedValues.offerType === OfferType.ALL
        ? ""
        : `type=${submittedValues.offerType}&`;
    const offerStatusUrl =
      submittedValues.offerStatus === undefined
        ? ""
        : `status=${submittedValues.offerStatus}&`;

    const keywordUrl =
      submittedValues?.keyword === ""
        ? ""
        : `keyword=${submittedValues.keyword}&`;

    const categoryUrl =
      submittedValues?.category === ""
        ? ""
        : `category=${submittedValues.category}&`;

    await handleGetOffers({
      offerTypeUrl: offerTypeUrl,
      offerStatusUrl: offerStatusUrl,
      sortFieldUrl: sortFieldUrl,
      sortDirectionUrl: sortDirectionUrl,
      keywordUrl: keywordUrl,
      categoryUrl: categoryUrl,
    });

    handleSettingFilters({
      offerTypeUrl: offerTypeUrl,
      offerStatusUrl: offerStatusUrl,
      sortFieldUrl: sortFieldUrl,
      sortDirectionUrl: sortDirectionUrl,
      keywordUrl: keywordUrl,
      categoryUrl: categoryUrl,
    });
  };

  return { handleSubmit };
}

export default useSubmitFilters;
