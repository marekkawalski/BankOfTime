import MySpinner from '@/components/MySpinner/MySpinner';
import { useServices } from '@/context/ServicesContext';
import useGetAppUser from '@/hooks/useGetAppUser';
import { useEffect, useState } from 'react';

import EditView from './EditView/EditView';
import { ManageProfile } from './ManageProfile';
import NoEditView from './NoEditView/NoEditView';
import { IManageProfile } from './types';
import useGetUserToView from './useGetUserToView';

function ViewProfile() {
  const services = useServices();
  const [manageProfile, setManageProfile] = useState<IManageProfile>();
  const { loggedInAppUser } = useGetAppUser();
  const { userToView } = useGetUserToView();

  useEffect(() => {
    if (!services || !userToView) return;
    setManageProfile(new ManageProfile(userToView, loggedInAppUser));
  }, [services, userToView, loggedInAppUser]);

  return (
    <section>
      <MySpinner show={!loggedInAppUser || !userToView}>
        {loggedInAppUser &&
          userToView &&
          (manageProfile?.canEdit() ? <EditView /> : <NoEditView />)}
      </MySpinner>
    </section>
  );
}

export default ViewProfile;
