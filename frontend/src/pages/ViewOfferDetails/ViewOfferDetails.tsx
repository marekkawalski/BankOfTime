import { useEffect, useState } from 'react';

import MySpinner from '../../components/MySpinner/MySpinner';
import { IManageOffer, ManageOffer } from '../../components/Offer/ManageOffer';
import { useServices } from '../../context/ServicesContext';
import useGetOffer from '../../hooks/useGetOffer';
import { IAppUser } from '../../models/AppUser';
import EditView from './EditView/EditView';
import NoEditView from './NoEditView/NoEditView';

function ViewOfferDetails() {
  const { offer } = useGetOffer({});
  const [appUser, setAppUser] = useState<IAppUser>();
  const services = useServices();
  const [manageOffer, setManageOffer] = useState<IManageOffer>();

  useEffect(() => {
    if (!services) return;
    setAppUser(services.appUserService.getAppUser());
    if (!offer) return;
    setManageOffer(new ManageOffer(offer, appUser));
  }, [setAppUser, offer, services]);
  return (
    <section>
      <MySpinner show={!offer || !appUser}>
        {offer &&
          appUser &&
          (manageOffer?.canEdit() ? (
            <EditView offer={offer} />
          ) : (
            <NoEditView />
          ))}
      </MySpinner>
    </section>
  );
}

export default ViewOfferDetails;
