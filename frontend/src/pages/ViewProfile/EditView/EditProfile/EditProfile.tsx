import Register from '@/components/Register/Register';
import { useUpdateUser } from '@/components/Register/useUpdateUser';

import useGetUserToView from '../../useGetUserToView';

function EditProfile() {
  const { userToView } = useGetUserToView();
  const { handleSubmit, loading } = useUpdateUser();
  return (
    <>
      {userToView && (
        <Register
          submit={handleSubmit}
          appUser={userToView}
          loading={loading}
        />
      )}
    </>
  );
}

export default EditProfile;
