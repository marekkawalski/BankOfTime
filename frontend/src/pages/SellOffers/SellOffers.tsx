import OfferContainer from '@/components/OfferContainer/OfferContainer';
import { OfferStatus } from '@/enums/OfferState';
import { OfferType } from '@/enums/OfferType';
import useGetOffers from '@/hooks/useGetOffers';

function SellOffers() {
  return (
    <section className="offers">
      <OfferContainer
        title="SellOffers"
        getOffers={useGetOffers({
          offerTypeUrl: `type=${OfferType.SELL_OFFER}&`,
          offerStatusUrl: `status=${OfferStatus.ACTIVE}&`,
        })}
      />
    </section>
  );
}

export default SellOffers;
