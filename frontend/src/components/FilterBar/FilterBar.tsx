import './FilterBar.scss';

import { OfferStatus } from '@/enums/OfferState';
import { OfferType } from '@/enums/OfferType';
import { Role } from '@/enums/Role';
import { SortBy } from '@/enums/SortBy';
import { SortDir } from '@/enums/SortDir';
import { Formik } from 'formik';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import useGetAppUser from '../../hooks/useGetAppUser';
import { FilterBarProps } from './types';
import { Filter_Validation } from './validation/FilterValidation';

function FilterBar({
  title,
  handleGetOffers,
  handleSettingFilters,
}: FilterBarProps) {
  const location = useLocation();
  const user = useGetAppUser();

  const submit = async (submittedValues: {
    offerType: OfferType;
    offerStatus: OfferStatus;
    sortBy: SortBy;
  }) => {
    let sortFieldUrl = " ";
    let sortDirectionUrl = "";
    switch (true) {
      case SortBy.CHEAPEST_FIRST === submittedValues.sortBy:
        sortFieldUrl = `sort=price&`;
        sortDirectionUrl = `sort-dir=${SortDir.ASC}&`;
        break;
      case SortBy.MOST_EXPENSIVE_FIRST === submittedValues.sortBy:
        sortFieldUrl = `sort=price&`;
        sortDirectionUrl = `sort-dir=${SortDir.DESC}&`;
        break;
      case SortBy.NAME_A_Z === submittedValues.sortBy:
        sortFieldUrl = `sort=title&`;
        sortDirectionUrl = `sort-dir=${SortDir.ASC}&`;
        break;
      case SortBy.NAME_Z_A === submittedValues.sortBy:
        sortFieldUrl = `sort=title&`;
        sortDirectionUrl = `sort-dir=${SortDir.DESC}&`;
        break;
      default:
        console.log("Error");
        break;
    }
    await handleGetOffers({
      offerTypeUrl: `type=${submittedValues.offerType}&`,
      offerStatusUrl: `status=${submittedValues.offerStatus}&`,
      sortFieldUrl: sortFieldUrl,
      sortDirectionUrl: sortDirectionUrl,
    });

    handleSettingFilters(
      `type=${submittedValues.offerType}&status=${submittedValues.offerStatus}&${sortDirectionUrl}&${sortFieldUrl}&`
    );
  };
  return (
    <div className="filter-bar-container">
      <h2>{title}</h2>
      <Form className="d-flex pb-3 mt-1">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>

      <Formik
        validationSchema={Filter_Validation}
        onSubmit={async (submittedValues) => submit(submittedValues)}
        enableReinitialize={false}
        initialValues={{
          sortBy: SortBy.NAME_A_Z,
          offerStatus: OfferStatus.ACTIVE,
          offerType: location.pathname.endsWith("sellOffers")
            ? OfferType.SELL_OFFER
            : OfferType.PURCHASE_OFFER,
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <div className="filter-bar-container-child">
              <Form.Group className="mb-3" controlId="validateSorting">
                <Form.Label>Sort by</Form.Label>
                <Form.Select
                  aria-label="Sort by"
                  name="sortBy"
                  value={values.sortBy}
                  defaultValue={SortBy.NAME_A_Z}
                  onChange={handleChange}
                >
                  <option value={SortBy.NAME_A_Z}>Name A-Z</option>
                  <option value={SortBy.NAME_Z_A}>Name Z-A</option>
                  <option value={SortBy.CHEAPEST_FIRST}>Cheapest first</option>
                  <option value={SortBy.MOST_EXPENSIVE_FIRST}>
                    Most expensive first
                  </option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="filter-bar-container-child">
              <Form.Group className="mb-3" controlId="validateOfferType">
                <Form.Label>OfferType</Form.Label>
                <Form.Select
                  aria-label="Offer type select"
                  name="offerType"
                  value={values.offerType}
                  defaultValue={
                    location.pathname.endsWith("sellOffers")
                      ? OfferType.SELL_OFFER
                      : OfferType.PURCHASE_OFFER
                  }
                  onChange={handleChange}
                >
                  <option value={OfferType.SELL_OFFER}>Sell offer</option>
                  <option value={OfferType.PURCHASE_OFFER}>
                    Purchase offer
                  </option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="filter-bar-container-child">
              <Form.Group className="mb-3" controlId="validateOfferStatus">
                <Form.Label>OfferStatus</Form.Label>
                <Form.Select
                  aria-label="Offer status select"
                  name="offerStatus"
                  defaultValue={OfferStatus.ACTIVE}
                  value={values.offerStatus}
                  onChange={handleChange}
                >
                  <option value={OfferStatus.ACTIVE}>ACTIVE</option>
                  <option value={OfferStatus.APPROVED}>APPROVED</option>
                  <option value={OfferStatus.ON_HOLD}>ON_HOLD</option>
                  <option value={OfferStatus.UNAVAILABLE}>UNAVAILABLE</option>
                  {user.appUser?.userType === Role.ADMIN && (
                    <option value={OfferStatus.DELETED}>DELETED</option>
                  )}
                </Form.Select>
              </Form.Group>
            </div>

            <Button type="submit" variant="primary">
              Apply filters
            </Button>
          </Form>
        )}
      </Formik>
      <hr />
      {/* <div className="filter-bar-container-child">
        <Form.Label>Sort by</Form.Label>
        <Form.Select aria-label="Default select example">
          <option value="1">newest first</option>
          <option value="2">oldest first</option>
          <option value="3">most expensive first</option>
          <option value="3">cheapest first</option>
        </Form.Select>
      </div>
      <div className="filter-bar-container-child">
        <Form.Label>Offer status</Form.Label>
        <Form.Select aria-label="Default select example">
          <option value="1">Active</option>
          <option value="2">Realized</option>
        </Form.Select>
      </div>
      <div className="filter-bar-container-child">
        <Form.Label>Offer category</Form.Label>
        <Form.Select aria-label="Default select example">
          <option value="1">Active</option>
          <option value="2">Realized</option>
        </Form.Select>
      </div> */}
    </div>
  );
}

export default FilterBar;
