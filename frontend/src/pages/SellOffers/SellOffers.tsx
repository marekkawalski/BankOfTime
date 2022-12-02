import MyNavbar from '../../components/Navbar/MyNavbar';
import OfferContainer from '../../components/OfferContainer/OfferContainer';
import { OfferStatus } from '../../enums/OfferState';
import { OfferType } from '../../enums/OfferType';
import useGetOffers from '../../hooks/useGetOffers';

function SellOffers() {
  return (
    <section className="offers">
      <MyNavbar />
      <OfferContainer
        title="SellOffers"
        getOffers={useGetOffers({
          offerType: OfferType.SELL_OFFER,
          offerStatus: OfferStatus.ACTIVE,
        })}
      />
    </section>
  );
}

export default SellOffers;
