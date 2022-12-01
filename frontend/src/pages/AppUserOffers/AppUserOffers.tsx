import MySpinner from '../../components/MySpinner/MySpinner';
import MyNavbar from '../../components/Navbar/MyNavbar';
import OfferContainer from '../../components/OfferContainer/OfferContainer';
import MyToastComponent from '../../components/Toast/MyToastComponent';
import useGetMyToast from '../../components/Toast/useGetMyToast';
import useGetAppUserOffers from '../../hooks/useGetAppUserOffers';

function AppUserOffers() {
  const { setMyToast, myToast } = useGetMyToast();
  const { loading, offers } = useGetAppUserOffers({ setMyToast });
  return (
    <section className="offers">
      <MyNavbar />
      <MyToastComponent myToast={myToast} setMyToast={setMyToast} />
      <MySpinner show={loading}>
        <OfferContainer title="MyOffers" offers={offers} />
      </MySpinner>
    </section>
  );
}

export default AppUserOffers;
