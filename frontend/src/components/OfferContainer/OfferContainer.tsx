import './OfferContainer.scss';

import React, { useState } from 'react';
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
  const [filters, setFilers] = useState("");
  const { loading, data, handleGetOffers } = getOffers;

  const handleSettingFilters = (filtersUrl: string) => {
    setFilers(filtersUrl);
  };
  return (
    <section>
      <div className="main-container">
        <div className="filters">
          <FilterBar
            title={title}
            handleGetOffers={handleGetOffers}
            handleSettingFilters={handleSettingFilters}
          />
        </div>
        <MySpinner show={loading || data === undefined}>
          {data?.content.length === 0 && <div>No offers</div>}
          <div className="offers">
            <Row xs={1} md={2} className="g-4 mb-3">
              {data?.content.map((offer) => {
                return (
                  <Offer offer={offer} handleGetOffers={handleGetOffers} />
                );
              })}
            </Row>
          </div>
          <div className="pagination">
            <MyPagination
              offersData={data}
              filters={filters}
              handleGetOffers={handleGetOffers}
            />
          </div>
        </MySpinner>
      </div>
    </section>
  );
};

export default OfferContainer;
