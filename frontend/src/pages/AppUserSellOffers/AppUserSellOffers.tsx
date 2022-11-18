import MySpinner from '../../components/MySpinner/MySpinner';
import MyNavbar from '../../components/Navbar/MyNavbar';
import OfferContainer from '../../components/OfferContainer/OfferContainer';
import MyToastComponent from '../../components/Toast/MyToastComponent';
import useGetMyToast from '../../components/Toast/useGetMyToast';
import { OfferType } from '../../enums/OfferType';
import useGetAppUserOffers from '../../hooks/useGetAppUserOffers';

function AppUserSellOffers() {
  const { setMyToast, myToast } = useGetMyToast();
  const { loading, offers } = useGetAppUserOffers({
    setMyToast: setMyToast,
    offerType: OfferType.SELL_OFFER,
  });
  return (
    <section className="offers">
      <MyNavbar />
      <MyToastComponent myToast={myToast} setMyToast={setMyToast} />
      <MySpinner show={loading}>
        <OfferContainer title="SellOffers" offers={offers} />
      </MySpinner>
    </section>
  );
}

export default AppUserSellOffers;
