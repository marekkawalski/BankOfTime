import OfferForm from '@/components/OfferForm/OfferForm';

import useEditOffer from '../../../../components/OfferForm/useEditOffer';
import { EditOfferProps } from './types';

function EditOffer({ offer }: EditOfferProps) {
  return (
    <div>
      <OfferForm offer={offer} submit={useEditOffer()} />
    </div>
  );
}

export default EditOffer;
