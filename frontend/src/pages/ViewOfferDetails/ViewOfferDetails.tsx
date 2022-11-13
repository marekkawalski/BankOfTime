import { useEffect } from 'react';

import MyNavbar from '../../components/Navbar/MyNavbar';
import MyToastComponent from '../../components/Toast/MyToastComponent';
import EditView from './EditView/EditView';
import NoEditView from './NoEditView/NoEditView';
import useGetAppUser from './useGetAppUser';
import useGetMyToast from './useGetMyToast';
import useGetOffer from './useGetOffer';
import { canEdit } from './utils/canEdit';

function ViewOfferDetails() {
  const { offer } = useGetOffer();
  const { myToast, setMyToast } = useGetMyToast();
  const { appUser, setAppUser } = useGetAppUser();

  useEffect(() => {
    setAppUser(offer?.buyer ?? offer?.seller);
  }, [setAppUser, offer]);
  return (
    <section>
      <MyNavbar />
      <MyToastComponent myToast={myToast} setMyToast={setMyToast} />
      {canEdit(offer, appUser) ? (
        <EditView offer={offer} />
      ) : (
        <NoEditView offer={offer} />
      )}
    </section>
  );
}

export default ViewOfferDetails;
