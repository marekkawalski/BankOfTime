import MySpinner from '../../components/MySpinner/MySpinner';
import MyNavbar from '../../components/Navbar/MyNavbar';
import OfferContainer from '../../components/OfferContainer/OfferContainer';
import MyToastComponent from '../../components/Toast/MyToastComponent';
import useGetMyToast from '../../components/Toast/useGetMyToast';
import { OfferContainerFor } from '../../enums/OfferContainerFor';
import { OfferType } from '../../enums/OfferType';
import useGetOffers from '../../hooks/useGetOffers';

function SellOffers() {
  const { setMyToast, myToast } = useGetMyToast();
  const { loading, offers } = useGetOffers({
    setMyToast: setMyToast,
    offerType: OfferType.SELL_OFFER,
  });
  return (
    <section className="offers">
      <MyNavbar />
      <MyToastComponent myToast={myToast} setMyToast={setMyToast} />
      <MySpinner show={loading}>
        <OfferContainer
          title="SellOffers"
          offers={offers}
          offerContainerFor={OfferContainerFor.CLIENT}
        />
      </MySpinner>
    </section>
  );
}

export default SellOffers;
