import React, { useState } from 'react';

import MyNavbar from '../../components/Navbar/MyNavbar';
import OfferForm from '../../components/OfferForm/OfferForm';
import MyToastComponent from '../../components/Toast/MyToastComponent';
import { MyToast } from '../../models/MyToast';
import useCreateOffer from './useCreateOffer';

function CreateOffer() {
  const [myToast, setMyToast] = useState<MyToast>({
    show: false,
  });

  return (
    <div>
      <MyNavbar />
      <MyToastComponent myToast={myToast} setMyToast={setMyToast} />
      <OfferForm submit={useCreateOffer(setMyToast)} />
    </div>
  );
}

export default CreateOffer;
