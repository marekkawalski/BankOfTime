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
  const { appUser } = useGetAppUser();
  const { userToView } = useGetUserToView();

  useEffect(() => {
    if (!services || !userToView) return;
    setManageProfile(new ManageProfile(userToView, appUser));
  }, [services, userToView, appUser]);

  return (
    <section>
      <MySpinner show={!appUser || !userToView}>
        {appUser &&
          userToView &&
          (manageProfile?.canEdit() ? <EditView /> : <NoEditView />)}
      </MySpinner>
    </section>
  );
}

export default ViewProfile;
