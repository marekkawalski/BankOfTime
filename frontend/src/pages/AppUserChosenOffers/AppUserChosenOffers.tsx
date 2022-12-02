import OfferContainer from '../../components/OfferContainer/OfferContainer';
import useGetAppUserChosenOffers from '../../hooks/useGetAppUserChosenOffers';

function AppUserChosenOffers() {
  return (
    <section className="offers">
      <OfferContainer
        title="ChosenOffers"
        getOffers={useGetAppUserChosenOffers({})}
      />
    </section>
  );
}

export default AppUserChosenOffers;
