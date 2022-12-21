import Register from '@/components/Register/Register';
import { useUpdateUser } from '@/components/Register/useUpdateUser';
import useGetAppUser from '@/hooks/useGetAppUser';

function EditProfile() {
  const { appUser } = useGetAppUser();
  const { handleSubmit, loading } = useUpdateUser();
  return (
    <>
      {appUser && (
        <Register submit={handleSubmit} appUser={appUser} loading={loading} />
      )}
    </>
  );
}

export default EditProfile;
