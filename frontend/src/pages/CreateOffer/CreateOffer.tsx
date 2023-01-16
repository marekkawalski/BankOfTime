import OfferForm from '@/components/OfferForm/OfferForm';
import useCreateOffer from '@/components/OfferForm/useCreateOffer';

function CreateOffer() {
  return (
    <div>
      <OfferForm submit={useCreateOffer()} />
    </div>
  );
}

export default CreateOffer;
