import { useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';

import { MyPaginationProps } from './types';

function MyPagination({ data, handleGetData, filters }: MyPaginationProps) {
  useEffect(() => {
    console.log("filters2" + JSON.stringify(filters));
  }, [filters]);
  if (!data) return <></>;

  return (
    <Pagination>
      <Pagination.First
        disabled={data?.number === 0}
        onClick={async () =>
          await handleGetData({
            pageNumUrl: `page-num=0&`,
            ...filters,
          })
        }
      />
      <Pagination.Prev
        disabled={data?.number === 0}
        onClick={async () =>
          await handleGetData({
            pageNumUrl: `page-num=${data?.number - 1}&`,
            ...filters,
          })
        }
      />
      {data?.number !== 0 && (
        <Pagination.Item
          onClick={async () =>
            await handleGetData({
              pageNumUrl: `page-num=0&`,
              ...filters,
            })
          }
        >
          {0}
        </Pagination.Item>
      )}
      {data?.number > data?.totalPages - (data?.number + 1) && (
        <Pagination.Ellipsis />
      )}
      {data?.number - 1 > 0 && (
        <Pagination.Item
          onClick={async () =>
            await handleGetData({
              pageNumUrl: `page-num=${data?.number - 1}&`,
              ...filters,
            })
          }
        >
          {data?.number - 1}
        </Pagination.Item>
      )}
      <Pagination.Item active>{data?.number}</Pagination.Item>
      {data?.number + 1 < data?.totalPages - 1 && (
        <Pagination.Item
          onClick={async () =>
            await handleGetData({
              pageNumUrl: `page-num=${data?.number + 1}&`,
              ...filters,
            })
          }
        >
          {data?.number + 1}
        </Pagination.Item>
      )}
      {data?.number < data?.totalPages - (data?.number + 1) && (
        <Pagination.Ellipsis />
      )}
      {!data?.last && (
        <Pagination.Item
          onClick={async () =>
            await handleGetData({
              pageNumUrl: `page-num=${data?.totalPages - 1}&`,
              ...filters,
            })
          }
        >
          {data?.totalPages - 1}
        </Pagination.Item>
      )}
      <Pagination.Next
        disabled={data.number === data?.totalPages - 1}
        onClick={async () =>
          await handleGetData({
            pageNumUrl: `page-num=${data?.number + 1}&`,
            ...filters,
          })
        }
      />
      <Pagination.Last
        disabled={data.number === data?.totalPages - 1}
        onClick={async () =>
          await handleGetData({
            pageNumUrl: `page-num=${data?.totalPages - 1}&`,
            ...filters,
          })
        }
      />
    </Pagination>
  );
}

export default MyPagination;
