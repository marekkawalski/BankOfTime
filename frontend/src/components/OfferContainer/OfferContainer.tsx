import './OfferContainer.scss';

import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';

import FilterBar from '../FilterBar/FilterBar';
import Offer from '../Offer/Offer';
import { OfferContainerProps } from './types';

const OfferContainer: React.FC<OfferContainerProps> = ({
  title,
  offers,
  reload,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <section>
      <div className="main-container">
        <FilterBar title={title} />
        <div className="content-container">
          <div>
            {offers.length === 0 && <div>No offers</div>}
            <Row xs={1} md={2} className="g-4 mb-3">
              {offers.map((offer) => {
                return <Offer offer={offer} />;
              })}
            </Row>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferContainer;
