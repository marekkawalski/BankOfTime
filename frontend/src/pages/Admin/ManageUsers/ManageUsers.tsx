import './ManageUsers.scss';

import MySpinner from '@/components/MySpinner/MySpinner';
import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import MyPagination from '../../../components/MyPagination/MyPagination/MyPagination';
import useGetAppUser from '../../../hooks/useGetAppUser';
import { IAppUser } from '../../../models/AppUser';
import useDisableAppUser from './hooks/useDisableAppUser';
import useEnableAppUser from './hooks/useEnableAppUser';
import useGetAppUsers from './hooks/useGetAppUsers';

function ManageUsers() {
  const [reload, setReload] = useState<boolean>(false);
  const { loading, data, handleGetAppUsers } = useGetAppUsers({ reload });
  const { handleEnableAppUser } = useEnableAppUser({ reload, setReload });
  const { handleDisableAppUser } = useDisableAppUser({ reload, setReload });
  const navigate = useNavigate();
  const { loggedInAppUser } = useGetAppUser();

  return (
    <section className="my-container">
      <MySpinner show={loading || !data}>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>User type</th>
              <th>Enable/Disable</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              (data?.content as IAppUser[]).map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.userType}</td>
                    <td>
                      {user.enabled ? (
                        <Button
                          disabled={user.id === loggedInAppUser?.id}
                          value={user.email}
                          onClick={handleDisableAppUser}
                        >
                          Disable
                        </Button>
                      ) : (
                        <Button
                          disabled={user.id === loggedInAppUser?.id}
                          value={user.email}
                          onClick={handleEnableAppUser}
                        >
                          Enable
                        </Button>
                      )}
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          navigate(`/appUser/${user.email}`);
                        }}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <MyPagination data={data} handleGetData={handleGetAppUsers} />
      </MySpinner>
    </section>
  );
}

export default ManageUsers;
