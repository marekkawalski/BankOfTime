import OfferForm from '@/components/OfferForm/OfferForm';

import { EditOfferProps } from './types';
import useEditOffer from './useEditOffer';

function EditOffer({ offer }: EditOfferProps) {
  return (
    <div>
      <OfferForm offer={offer} submit={useEditOffer()} />
    </div>
  );
}

export default EditOffer;
