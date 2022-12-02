import OfferContainer from '@/components/OfferContainer/OfferContainer';
import useGetAppUserOffers from '@/hooks/useGetAppUserOffers';

function AppUserOffers() {
  return (
    <section className="offers">
      <OfferContainer title="MyOffers" getOffers={useGetAppUserOffers({})} />
    </section>
  );
}

export default AppUserOffers;
