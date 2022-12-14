import OfferForm from '@/components/OfferForm/OfferForm';

import useCreateOffer from './useCreateOffer';

function CreateOffer() {
  return (
    <div>
      <OfferForm submit={useCreateOffer()} />
    </div>
  );
}

export default CreateOffer;
