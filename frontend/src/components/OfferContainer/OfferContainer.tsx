import './OfferContainer.scss';

import React from 'react';
import { Row } from 'react-bootstrap';

import FilterBar from '../FilterBar/FilterBar';
import MyPagination from '../MyPagination/MyPagination';
import MySpinner from '../MySpinner/MySpinner';
import Offer from '../Offer/Offer';
import { OfferContainerProps } from './types';

const OfferContainer: React.FC<OfferContainerProps> = ({
  title,
  getOffers,
}) => {
  const { loading, data, handleGetOffers } = getOffers;
  return (
    <MySpinner show={loading || data === undefined}>
      <section>
        <div className="main-container">
          <FilterBar title={title} handleGetOffers={handleGetOffers} />
          <div className="content-container">
            <div>
              {data?.content.length === 0 && <div>No offers</div>}
              <Row xs={1} md={2} className="g-4 mb-3">
                {data?.content.map((offer) => {
                  return (
                    <Offer offer={offer} handleGetOffers={handleGetOffers} />
                  );
                })}
              </Row>
            </div>
          </div>
        </div>
        <MyPagination
          offersData={data}
          filters=""
          handleGetOffers={handleGetOffers}
        ></MyPagination>
      </section>
    </MySpinner>
  );
};

export default OfferContainer;
