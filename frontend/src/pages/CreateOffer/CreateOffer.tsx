import OfferForm from '@/components/OfferForm/OfferForm';
import React, { useState } from 'react';

import useCreateOffer from './useCreateOffer';

function CreateOffer() {
  return (
    <div>
      <OfferForm submit={useCreateOffer()} />
    </div>
  );
}

export default CreateOffer;
