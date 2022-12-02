import React, { useState } from 'react';

import MyNavbar from '../../../../components/Navbar/MyNavbar';
import OfferForm from '../../../../components/OfferForm/OfferForm';
import { EditOfferProps } from './types';
import useEditOffer from './useEditOffer';

function EditOffer({ offer }: EditOfferProps) {
  return (
    <div>
      <MyNavbar />
      <OfferForm offer={offer} submit={useEditOffer()} />
    </div>
  );
}

export default EditOffer;
