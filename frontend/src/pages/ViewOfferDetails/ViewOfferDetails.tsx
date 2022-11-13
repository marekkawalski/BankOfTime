import { useEffect, useState } from 'react';

import MySpinner from '../../components/MySpinner/MySpinner';
import MyNavbar from '../../components/Navbar/MyNavbar';
import MyToastComponent from '../../components/Toast/MyToastComponent';
import { useServices } from '../../context/ServicesContext';
import { IAppUser } from '../../models/AppUser';
import EditView from './EditView/EditView';
import NoEditView from './NoEditView/NoEditView';
import useGetMyToast from './useGetMyToast';
import useGetOffer from './useGetOffer';
import { canEdit } from './utils/canEdit';

function ViewOfferDetails() {
  const { offer } = useGetOffer();
  const { myToast, setMyToast } = useGetMyToast();
  const [appUser, setAppUser] = useState<IAppUser>();
  const services = useServices();
  useEffect(() => {
    if (!services) return;
    setAppUser(services.appUserService.getAppUser());
  }, [setAppUser, offer, services]);
  return (
    <section>
      <MyNavbar />
      <MyToastComponent myToast={myToast} setMyToast={setMyToast} />
      <MySpinner show={!offer || !appUser}>
        {offer &&
          appUser &&
          (canEdit(offer, appUser) ? (
            <EditView offer={offer} />
          ) : (
            <NoEditView />
          ))}
      </MySpinner>
    </section>
  );
}

export default ViewOfferDetails;
