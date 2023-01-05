import './NoEditView.scss';

import { CallTo } from '@/components/CallTo/CallTo';
import { useServices } from '@/context/ServicesContext';
import { useMyToast } from '@/context/ToastContext';
import { OfferStatus } from '@/enums/OfferState';
import { OfferType } from '@/enums/OfferType';
import { ToastBackground } from '@/enums/ToastBackground';
import { ToastTitle } from '@/enums/ToastTitle';
import useGetOffer from '@/hooks/useGetOffer';
import { IAppUser } from '@/models/AppUser';
import { faCheckCircle, faClock, faEnvelope, faMapMarkerAlt, faPerson, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import { Link } from 'react-router-dom';

const images = [
  {
    original:
      "https://images.pexels.com/photos/6462662/pexels-photo-6462662.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    thumbnail:
      "https://images.pexels.com/photos/6462662/pexels-photo-6462662.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];
function NoEditView() {
  const [reload, setReload] = useState<boolean>(false);
  const { offer } = useGetOffer({ reload });
  const [appUser, setAppUser] = useState<IAppUser | undefined>();
  const services = useServices();
  const toast = useMyToast();

  useEffect(() => {
    if (!services) return;
    setAppUser(services.appUserService.getAppUser());
  }, [setAppUser, offer, services]);

  const requestTransaction = async () => {
    let result: any;
    if (!(services && appUser && offer)) return;
    try {
      result = await services.timeTransactionService.requestApproval(
        offer.id,
        offer?.seller?.id ?? appUser.id,
        offer?.buyer?.id ?? appUser.id
      );
      console.log(result);
      toast?.make(
        ToastTitle.SUCCESS,
        ToastBackground.SUCCESS,
        "Request has been sent!"
      );
      setReload(true);
    } catch (error: any) {
      console.log(error);
      toast?.make(
        ToastTitle.ERROR,
        ToastBackground.ERROR,
        (error?.message?.response?.data?.message as string) ?? "Error"
      );
    }
  };
  return (
    <section id="offer-details-section">
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
                      disabled={
                        offer?.seller?.id === appUser?.id ||
                        offer?.state !== OfferStatus.ACTIVE
                      }
                      onClick={() => requestTransaction()}
                    >
                      Buy
                    </Button>
                  ) : (
                    <Button
                      disabled={
                        offer?.buyer?.id === appUser?.id ||
                        offer?.state !== OfferStatus.ACTIVE
                      }
                      onClick={() => requestTransaction()}
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
                    <div>{offer?.state}</div>
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
                  <div className="appUser-name">Contact info</div>
                  {offer?.offerType === OfferType.PURCHASE_OFFER && (
                    <div>
                      <Link
                        className="links"
                        to={`/appUser/${offer.buyer?.email}`}
                      >
                        <span>
                          <FontAwesomeIcon className="pe-2" icon={faPerson} />
                          {offer.buyer?.firstName} {offer.buyer?.lastName}
                        </span>
                      </Link>

                      <div>
                        <span className="pe-1">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <span>{offer.buyer?.email}</span>
                      </div>
                      {offer.buyer?.phoneNumber && (
                        <CallTo phone={offer.buyer.phoneNumber}>
                          <span className="pe-1">
                            <FontAwesomeIcon icon={faPhone} />
                          </span>
                          {offer.buyer.phoneNumber}
                        </CallTo>
                      )}
                      <div></div>
                    </div>
                  )}
                  {offer?.offerType === OfferType.SELL_OFFER && (
                    <div>
                      <Link
                        className="links"
                        to={`/appUser/${offer.seller?.email}`}
                      >
                        <span>
                          <FontAwesomeIcon className="pe-2" icon={faPerson} />
                          {offer.seller?.firstName} {offer.seller?.lastName}
                        </span>
                      </Link>
                      <div>
                        <span className="pe-1">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <span>{offer.seller?.email}</span>
                      </div>
                      {offer.seller?.phoneNumber && (
                        <CallTo phone={offer.seller.phoneNumber}>
                          <span className="pe-1">
                            <FontAwesomeIcon icon={faPhone} />
                          </span>
                          {offer.seller.phoneNumber}
                        </CallTo>
                      )}
                      <div></div>
                    </div>
                  )}
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
