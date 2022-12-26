import Pagination from 'react-bootstrap/Pagination';

import { OffersPaginationProps } from './types';

function OffersPagination({
  offersData,
  handleGetOffers,
  filters,
}: OffersPaginationProps) {
  if (!offersData) return <></>;
  return (
    <Pagination>
      <Pagination.First
        disabled={offersData?.number === 0}
        onClick={async () =>
          await handleGetOffers({
            pageNumUrl: `page-num=0&`,
            ...filters,
          })
        }
      />
      <Pagination.Prev
        disabled={offersData?.number === 0}
        onClick={async () =>
          await handleGetOffers({
            pageNumUrl: `page-num=${offersData?.number - 1}&`,
            ...filters,
          })
        }
      />
      {offersData?.number !== 0 && (
        <Pagination.Item
          onClick={async () =>
            await handleGetOffers({
              pageNumUrl: `page-num=0&`,
              ...filters,
            })
          }
        >
          {0}
        </Pagination.Item>
      )}
      {offersData?.number >
        offersData?.totalPages - (offersData?.number + 1) && (
        <Pagination.Ellipsis />
      )}
      {offersData?.number - 1 > 0 && (
        <Pagination.Item
          onClick={async () =>
            await handleGetOffers({
              pageNumUrl: `page-num=${offersData?.number - 1}&`,
              ...filters,
            })
          }
        >
          {offersData?.number - 1}
        </Pagination.Item>
      )}
      <Pagination.Item active>{offersData?.number}</Pagination.Item>
      {offersData?.number + 1 < offersData?.totalPages - 1 && (
        <Pagination.Item
          onClick={async () =>
            await handleGetOffers({
              pageNumUrl: `page-num=${offersData?.number + 1}&`,
              ...filters,
            })
          }
        >
          {offersData?.number + 1}
        </Pagination.Item>
      )}
      {offersData?.number <
        offersData?.totalPages - (offersData?.number + 1) && (
        <Pagination.Ellipsis />
      )}
      {!offersData?.last && (
        <Pagination.Item
          onClick={async () =>
            await handleGetOffers({
              pageNumUrl: `page-num=${offersData?.totalPages - 1}&`,
              ...filters,
            })
          }
        >
          {offersData?.totalPages - 1}
        </Pagination.Item>
      )}
      <Pagination.Next
        disabled={offersData.number === offersData?.totalPages - 1}
        onClick={async () =>
          await handleGetOffers({
            pageNumUrl: `page-num=${offersData?.number + 1}&`,
            ...filters,
          })
        }
      />
      <Pagination.Last
        disabled={offersData.number === offersData?.totalPages - 1}
        onClick={async () =>
          await handleGetOffers({
            pageNumUrl: `page-num=${offersData?.totalPages - 1}&`,
            ...filters,
          })
        }
      />
    </Pagination>
  );
}

export default OffersPagination;
