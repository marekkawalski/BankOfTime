import './NoEditView.scss';

import { faCheckCircle, faClock, faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';

import { CallTo } from '../../../components/CallTo/CallTo';
import MyToastComponent from '../../../components/Toast/MyToastComponent';
import useGetMyToast from '../../../components/Toast/useGetMyToast';
import { useServices } from '../../../context/ServicesContext';
import { OfferStatus } from '../../../enums/OfferState';
import { OfferType } from '../../../enums/OfferType';
import { IAppUser } from '../../../models/AppUser';
import useGetOffer from '../useGetOffer';

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];
function NoEditView() {
  const { myToast, setMyToast } = useGetMyToast();
  const { offer } = useGetOffer(setMyToast);
  const [appUser, setAppUser] = useState<IAppUser | undefined>();
  const services = useServices();

  useEffect(() => {
    if (!services) return;
    setAppUser(services.appUserService.getAppUser());
  }, [setAppUser, offer, services]);

  const makeTransaction = async () => {
    let result: any;
    if (!(services && appUser && offer)) return;
    try {
      result = await services.timeTransactionService.makeTransaction(
        offer.id,
        offer?.seller?.id ?? appUser.id,
        offer?.buyer?.id ?? appUser.id
      );
      console.log(result);
      setMyToast({
        background: "success",
        message: "Transaction succeeded!",
        title: "Success",
        show: true,
      });
    } catch (error: any) {
      console.log(error);
      setMyToast({
        background: "danger",
        message: (error?.message?.response?.data?.message as string) ?? "Error",
        title: "Error",
        show: true,
      });
    }
  };
  return (
    <section id="offer-details-section">
      <MyToastComponent myToast={myToast} setMyToast={setMyToast} />
      <div className="offer-container">
        <div className="offer-container-child">
          <ImageGallery items={images} />
        </div>
        <div className="offer-container-child">
          <div className="offer-content">
            <h3 className="">{offer?.title}</h3>
            <div className="offer-description">
              <div>
                <hr />
                <p>{offer?.shortDescription}</p>
                <p>{offer?.longDescription}</p>
              </div>
              <div className="offer-details">
                <div className="price-container">
                  <h4 id="time-icon">
                    <FontAwesomeIcon icon={faClock} />
                  </h4>
                  <div>
                    {offer?.previousPrice &&
                    offer.previousPrice > offer.price ? (
                      <div className="price-inner-container">
                        <div>Save {offer.previousPrice - offer.price}h</div>
                        <div className="price">
                          <h4 className="previous-price">
                            <span>{offer.previousPrice}h</span>
                          </h4>
                          <h4>
                            <span> {offer?.price}h</span>
                          </h4>
                        </div>
                      </div>
                    ) : (
                      <h4 className="">{offer?.price}h</h4>
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  {offer?.offerType === OfferType.SELL_OFFER ? (
                    <Button
                      disabled={offer?.seller?.id === appUser?.id}
                      onClick={() => makeTransaction()}
                    >
                      Buy
                    </Button>
                  ) : (
                    <Button
                      disabled={offer?.buyer?.id === appUser?.id}
                      onClick={() => makeTransaction()}
                    >
                      Sell
                    </Button>
                  )}
                </div>
                <div>
                  <hr />
                  {offer?.state === OfferStatus.ACTIVE ? (
                    <div className="state-available">
                      <span className="pe-1">
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </span>
                      <span>Available</span>
                    </div>
                  ) : (
                    <div>Unavailable</div>
                  )}
                </div>
                <div>
                  <hr />
                  <span>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </span>
                  <span> {offer?.location}</span>
                </div>
                <div>
                  <hr />
                  <div>
                    <div className="appUser-name">
                      <span className="pe-1">{appUser?.firstName}</span>
                      <span>{appUser?.lastName}</span>
                    </div>
                    <div>
                      <span className="pe-1">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                      <span>{appUser?.email}</span>
                    </div>
                    {appUser?.phoneNumber && (
                      <CallTo phone={appUser.phoneNumber}>
                        <span className="pe-1">
                          <FontAwesomeIcon icon={faPhone} />
                        </span>
                        {appUser.phoneNumber}
                      </CallTo>
                    )}
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NoEditView;
