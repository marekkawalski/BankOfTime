import './OfferContainer.scss';

import React, { useState } from 'react';
import { Row } from 'react-bootstrap';

import FilterBar from '../FilterBar/FilterBar';
import MySpinner from '../MySpinner/MySpinner';
import Offer from '../Offer/Offer';
import { OfferContainerProps } from './types';

const OfferContainer: React.FC<OfferContainerProps> = ({
  title,
  getOffers,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { offers, handleGetOffers, loading } = getOffers;
  return (
    <MySpinner show={loading}>
      <section>
        <div className="main-container">
          <FilterBar title={title} handleGetOffers={handleGetOffers} />
          <div className="content-container">
            <div>
              {offers.length === 0 && <div>No offers</div>}
              <Row xs={1} md={2} className="g-4 mb-3">
                {offers.map((offer) => {
                  return (
                    <Offer offer={offer} handleGetOffers={handleGetOffers} />
                  );
                })}
              </Row>
            </div>
          </div>
        </div>
      </section>
    </MySpinner>
  );
};

export default OfferContainer;
