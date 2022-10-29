import React, { useEffect, useState } from "react";
import MyNavbar from "../../components/Navbar/MyNavbar";
import MyToastComponent from "../../components/Toast/MyToastComponent";
import { MyToast } from "../../models/MyToast";
import { IOffer } from "../../models/Offer";
import AppUserService from "../../services/AppUserService";
import OfferService from "../../services/OfferService";

function AppUserSellOffers() {
  const [sellOffers, setSellOffers] = useState<IOffer[]>([]);
  const [myToast, setMyToast] = useState<MyToast>({
    show: false,
  });
  const handleGetClientSellOffers = async () => {
    try {
      const result = await OfferService.getAppUserSellOffers(
        AppUserService.getAppUser().id
      );
      console.log(result);
      setSellOffers(result?.data ?? []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetClientSellOffers();
  }, []);
  return (
    <section>
      <MyNavbar />
      <MyToastComponent myToast={myToast} setMyToast={setMyToast} />
      <h2>SellOffers</h2>
      <div>
        {sellOffers.map((offer) => {
          return <p>{offer.title}</p>;
        })}
      </div>
    </section>
  );
}

export default AppUserSellOffers;
