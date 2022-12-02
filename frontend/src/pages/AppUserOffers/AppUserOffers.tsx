import MyNavbar from '../../components/Navbar/MyNavbar';
import OfferContainer from '../../components/OfferContainer/OfferContainer';
import MyToastComponent from '../../components/Toast/MyToastComponent';
import useGetMyToast from '../../components/Toast/useGetMyToast';
import useGetAppUserOffers from '../../hooks/useGetAppUserOffers';

function AppUserOffers() {
  const { setMyToast, myToast } = useGetMyToast();
  return (
    <section className="offers">
      <MyNavbar />
      <MyToastComponent myToast={myToast} setMyToast={setMyToast} />
      <OfferContainer
        title="MyOffers"
        getOffers={useGetAppUserOffers({ setMyToast })}
      />
    </section>
  );
}

export default AppUserOffers;
