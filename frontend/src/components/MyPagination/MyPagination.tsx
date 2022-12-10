import Pagination from 'react-bootstrap/Pagination';

import { MyPaginationProps } from './types';

function MyPagination({
  offersData,
  handleGetOffers,
  filters,
}: MyPaginationProps) {
  if (!offersData) return <></>;
  return (
    <Pagination>
      <Pagination.First
        disabled={offersData?.number === 0}
        onClick={async () =>
          await handleGetOffers({
            pageNumUrl: `${filters}page-num=0&`,
          })
        }
      />
      <Pagination.Prev
        disabled={offersData?.number === 0}
        onClick={async () =>
          await handleGetOffers({
            pageNumUrl: `${filters}page-num=${offersData?.number - 1}&`,
          })
        }
      />
      {offersData?.number !== 0 && (
        <Pagination.Item
          onClick={async () =>
            await handleGetOffers({
              pageNumUrl: `${filters}page-num=0&`,
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
              pageNumUrl: `${filters}page-num=${offersData?.number - 1}&`,
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
              pageNumUrl: `${filters}page-num=${offersData?.number + 1}&`,
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
              pageNumUrl: `${filters}page-num=${offersData?.totalPages - 1}&`,
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
            pageNumUrl: `${filters}page-num=${offersData?.number + 1}&`,
          })
        }
      />
      <Pagination.Last
        disabled={offersData.number === offersData?.totalPages - 1}
        onClick={async () =>
          await handleGetOffers({
            pageNumUrl: `${filters}page-num=${offersData?.totalPages - 1}&`,
          })
        }
      />
    </Pagination>
  );
}

export default MyPagination;
