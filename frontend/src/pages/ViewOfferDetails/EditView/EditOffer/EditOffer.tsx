import React, { useState } from 'react';

import MyNavbar from '../../../../components/Navbar/MyNavbar';
import OfferForm from '../../../../components/OfferForm/OfferForm';
import MyToastComponent from '../../../../components/Toast/MyToastComponent';
import { MyToast } from '../../../../models/MyToast';
import { EditOfferProps } from './types';
import useEditOffer from './useEditOffer';

function EditOffer({ offer }: EditOfferProps) {
  const [myToast, setMyToast] = useState<MyToast>({
    show: false,
  });
  console.log(offer);
  return (
    <div>
      <MyNavbar />
      <MyToastComponent myToast={myToast} setMyToast={setMyToast} />
      <OfferForm offer={offer} submit={useEditOffer(setMyToast)} />
    </div>
  );
}

export default EditOffer;
