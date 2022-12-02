import MyNavbar from '../../components/Navbar/MyNavbar';
import OfferContainer from '../../components/OfferContainer/OfferContainer';
import MyToastComponent from '../../components/Toast/MyToastComponent';
import useGetMyToast from '../../components/Toast/useGetMyToast';
import useGetAppUserChosenOffers from '../../hooks/useGetAppUserChosenOffers';

function AppUserChosenOffers() {
  const { setMyToast, myToast } = useGetMyToast();

  return (
    <section className="offers">
      <MyNavbar />
      <MyToastComponent myToast={myToast} setMyToast={setMyToast} />
      <OfferContainer
        title="ChosenOffers"
        getOffers={useGetAppUserChosenOffers({ setMyToast })}
      />
    </section>
  );
}

export default AppUserChosenOffers;
