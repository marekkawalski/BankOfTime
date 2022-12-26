import './FilterBar.scss';

import { OfferStatus } from '@/enums/OfferState';
import { OfferType } from '@/enums/OfferType';
import { Role } from '@/enums/Role';
import { SortBy } from '@/enums/SortBy';
import useGetAppUser from '@/hooks/useGetAppUser';
import useGetCategories from '@/hooks/useGetCategories';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import { FilterBarProps } from './types';
import useSubmitFilters from './useSubmitFilters';
import { Filter_Validation } from './validation/FilterValidation';

function FilterBar({
  title,
  handleGetOffers,
  handleSettingFilters,
}: FilterBarProps) {
  const location = useLocation();
  const { loggedInAppUser } = useGetAppUser();
  const { categories } = useGetCategories();
  const submit = useSubmitFilters({
    handleGetOffers,
    handleSettingFilters,
  });

  const getDefaultOfferType = (): OfferType => {
    if (location.pathname.includes("appUser")) return OfferType.ALL;
    if (location.pathname.endsWith("sellOffers")) return OfferType.SELL_OFFER;
    else return OfferType.PURCHASE_OFFER;
  };

  return (
    <div className="filter-bar-container">
      <h2>{title}</h2>
      <Formik
        validationSchema={Filter_Validation}
        onSubmit={submit.handleSubmit}
        enableReinitialize={false}
        initialValues={{
          keyword: "",
          category: "",
          sortBy: SortBy.NAME_A_Z,
          offerStatus: undefined,
          offerType: getDefaultOfferType(),
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <div className="filter-bar-container-child">
              <Form.Group className="mb-3" controlId="validateSearch">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  name="keyword"
                  value={values.keyword}
                  onChange={handleChange}
                />
              </Form.Group>
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
                  <option value={SortBy.NEWEST_FIRST}>Newest first</option>
                  <option value={SortBy.OLDEST_FIRST}>Oldest first</option>
                </Form.Select>
              </Form.Group>
            </div>
            {location.pathname.includes("appUser") && (
              <div>
                <div className="filter-bar-container-child">
                  <Form.Group className="mb-3" controlId="validateOfferType">
                    <Form.Label>OfferType</Form.Label>
                    <Form.Select
                      aria-label="Offer type select"
                      name="offerType"
                      value={values.offerType}
                      defaultValue={getDefaultOfferType()}
                      onChange={handleChange}
                    >
                      <option value={OfferType.ALL}>All</option>
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
                      defaultValue={undefined}
                      value={values.offerStatus}
                      onChange={handleChange}
                    >
                      <option value={""}>All</option>
                      <option value={OfferStatus.ACTIVE}>ACTIVE</option>
                      <option value={OfferStatus.APPROVED}>APPROVED</option>
                      <option value={OfferStatus.ON_HOLD}>ON_HOLD</option>
                      <option value={OfferStatus.UNAVAILABLE}>
                        UNAVAILABLE
                      </option>
                      {loggedInAppUser?.userType === Role.ROLE_ADMIN && (
                        <option value={OfferStatus.DELETED}>DELETED</option>
                      )}
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>
            )}

            <div className="filter-bar-container-child">
              <Form.Group className="mb-3" controlId="validateOfferCategory">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  aria-label="Offer category select"
                  name="category"
                  defaultValue={undefined}
                  value={values.category}
                  onChange={handleChange}
                >
                  <option value={""}>All</option>
                  {categories?.map((category) => {
                    return (
                      <option
                        key={category.id + category.name}
                        value={category.name}
                      >
                        {category.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </div>
            <Button type="submit" variant="primary">
              Apply filters
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FilterBar;
