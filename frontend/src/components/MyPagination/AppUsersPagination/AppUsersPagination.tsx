import Pagination from 'react-bootstrap/Pagination';

import { AppUsersPaginationProps } from './types';

function AppUsersPagination({
  appUsersData,
  handleGetAppUsers,
}: AppUsersPaginationProps) {
  if (!appUsersData) return <></>;
  return (
    <Pagination>
      <Pagination.First
        disabled={appUsersData?.number === 0}
        onClick={async () =>
          await handleGetAppUsers({
            pageNumUrl: `page-num=0&`,
          })
        }
      />
      <Pagination.Prev
        disabled={appUsersData?.number === 0}
        onClick={async () =>
          await handleGetAppUsers({
            pageNumUrl: `page-num=${appUsersData?.number - 1}&`,
          })
        }
      />
      {appUsersData?.number !== 0 && (
        <Pagination.Item
          onClick={async () =>
            await handleGetAppUsers({
              pageNumUrl: `page-num=0&`,
            })
          }
        >
          {0}
        </Pagination.Item>
      )}
      {appUsersData?.number >
        appUsersData?.totalPages - (appUsersData?.number + 1) && (
        <Pagination.Ellipsis />
      )}
      {appUsersData?.number - 1 > 0 && (
        <Pagination.Item
          onClick={async () =>
            await handleGetAppUsers({
              pageNumUrl: `page-num=${appUsersData?.number - 1}&`,
            })
          }
        >
          {appUsersData?.number - 1}
        </Pagination.Item>
      )}
      <Pagination.Item active>{appUsersData?.number}</Pagination.Item>
      {appUsersData?.number + 1 < appUsersData?.totalPages - 1 && (
        <Pagination.Item
          onClick={async () =>
            await handleGetAppUsers({
              pageNumUrl: `page-num=${appUsersData?.number + 1}&`,
            })
          }
        >
          {appUsersData?.number + 1}
        </Pagination.Item>
      )}
      {appUsersData?.number <
        appUsersData?.totalPages - (appUsersData?.number + 1) && (
        <Pagination.Ellipsis />
      )}
      {!appUsersData?.last && (
        <Pagination.Item
          onClick={async () =>
            await handleGetAppUsers({
              pageNumUrl: `page-num=${appUsersData?.totalPages - 1}&`,
            })
          }
        >
          {appUsersData?.totalPages - 1}
        </Pagination.Item>
      )}
      <Pagination.Next
        disabled={appUsersData.number === appUsersData?.totalPages - 1}
        onClick={async () =>
          await handleGetAppUsers({
            pageNumUrl: `page-num=${appUsersData?.number + 1}&`,
          })
        }
      />
      <Pagination.Last
        disabled={appUsersData.number === appUsersData?.totalPages - 1}
        onClick={async () =>
          await handleGetAppUsers({
            pageNumUrl: `page-num=${appUsersData?.totalPages - 1}&`,
          })
        }
      />
    </Pagination>
  );
}

export default AppUsersPagination;
