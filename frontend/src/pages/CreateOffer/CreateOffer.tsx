import React, { useState } from 'react';

import MyNavbar from '../../components/Navbar/MyNavbar';
import OfferForm from '../../components/OfferForm/OfferForm';
import useCreateOffer from './useCreateOffer';

function CreateOffer() {
  return (
    <div>
      <MyNavbar />
      <OfferForm submit={useCreateOffer()} />
    </div>
  );
}

export default CreateOffer;
