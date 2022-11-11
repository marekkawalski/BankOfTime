import './NoEditOffer.scss';

import { faCheckCircle, faClock, faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';

import { OfferStatus } from '../../../enums/OfferState';
import { OfferType } from '../../../enums/OfferType';
import { IAppUser } from '../../../models/AppUser';
import { CallTo } from '../../../utils/CallTo';
import { NoEditOfferProps } from './types';

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
function NoEditOffer({ offer }: NoEditOfferProps) {
  const [client, setClient] = useState<IAppUser | undefined>();

  useEffect(() => {
    setClient(offer?.buyer ?? offer?.seller);
  }, [setClient, offer]);

  return (
    <section>
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
                <div className="price">
                  <div>
                    <FontAwesomeIcon icon={faClock} />
                  </div>
                  <div>
                    <h4 className="">{offer?.price}h</h4>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  {offer?.offerType === OfferType.SELL_OFFER ? (
                    <Button>Buy</Button>
                  ) : (
                    <Button>Sell</Button>
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
                      <span className="pe-1">{client?.firstName}</span>
                      <span>{client?.lastName}</span>
                    </div>
                    <div>
                      <span className="pe-1">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                      <span>{client?.email}</span>
                    </div>
                    {client?.phoneNumber && (
                      <CallTo phone={client.phoneNumber}>
                        <span className="pe-1">
                          <FontAwesomeIcon icon={faPhone} />
                        </span>
                        {client.phoneNumber}
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

export default NoEditOffer;
