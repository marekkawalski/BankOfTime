import './OfferContainer.scss';

import { OfferRequestParams } from '@/services/types';
import React, { useState } from 'react';

import FilterBar from '../FilterBar/FilterBar';
import OffersPagination from '../MyPagination/OffersPagination/OffersPagination';
import MySpinner from '../MySpinner/MySpinner';
import Offer from '../Offer/Offer';
import { OfferContainerProps } from './types';

const OfferContainer: React.FC<OfferContainerProps> = ({
  title,
  getOffers,
}) => {
  const [filters, setFilers] = useState({});
  const { loading, data, handleGetOffers } = getOffers;

  const handleSettingFilters = (offerRequestParams: OfferRequestParams) => {
    setFilers(offerRequestParams);
  };
  return (
    <section className="offers-section">
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
          <div className="offers-pagination">
            <div className="offers">
              {data?.content.map((offer) => {
                return (
                  <Offer
                    key={offer.id}
                    offer={offer}
                    handleGetOffers={handleGetOffers}
                    filters={filters}
                  />
                );
              })}
            </div>
            <div className="pagination">
              <OffersPagination
                offersData={data}
                filters={filters}
                handleGetOffers={handleGetOffers}
              />
            </div>
          </div>
        </MySpinner>
      </div>
    </section>
  );
};

export default OfferContainer;
