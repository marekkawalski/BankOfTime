import './OfferForm.scss';

import { OfferStatus } from '@/enums/OfferState';
import { OfferType } from '@/enums/OfferType';
import { Role } from '@/enums/Role';
import useGetCategories from '@/hooks/useGetCategories';
import { Field, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row, Spinner } from 'react-bootstrap';

import useGetAppUser from '../../hooks/useGetAppUser';
import MyReactSelect from '../MyReactSelect/MyReactSelect';
import MySpinner from '../MySpinner/MySpinner';
import { OfferFormProps } from './types';
import useSubmitOffer from './useSubmitOffer';
import { offerValidation } from './validation/offerValidation';

function OfferForm({ offer, submit }: OfferFormProps) {
  const { categories, loading } = useGetCategories();
  const { handleSubmitOffer } = useSubmitOffer({ categories, submit });
  const [categoriesOptions, seCategoriesOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [defaultCategoriesOptions, seDefaultCategoriesOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const { loggedInAppUser } = useGetAppUser();

  useEffect(() => {
    let tempArray: { value: string; label: string }[] = [];
    categories?.map((category) => {
      tempArray.push({ value: category.name, label: category.name });
    });
    seCategoriesOptions(tempArray);

    if (offer) {
      tempArray = [];
      offer.categories?.map((category) => {
        tempArray.push({ value: category.name, label: category.name });
      });
      seDefaultCategoriesOptions(tempArray);
    }
  }, [loading]);

  return (
    <MySpinner show={loading}>
      <Container className="container-fluid bg-light text-dark p-5">
        <Container className="bg-light p-5">
          {offer ? <h2>Edit offer</h2> : <h2>Create offer</h2>}
          <Formik
            validationSchema={offerValidation}
            onSubmit={handleSubmitOffer}
            initialValues={{
              id: offer?.id ?? undefined,
              title: offer?.title ?? "",
              shortDescription: offer?.shortDescription ?? "",
              price: offer?.price ?? 0,
              longDescription: offer?.longDescription ?? "",
              location: offer?.location ?? "",
              offerType: offer?.offerType ?? OfferType.SELL_OFFER,
              categories: defaultCategoriesOptions.map((value) => value.label),
              offerStatus: offer?.state,
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Col lg={true}>
                    <Form.Group
                      as={Col}
                      md="8"
                      className="mb-3"
                      controlId="validateTitle"
                    >
                      <FloatingLabel
                        controlId="validateTitleLabel"
                        label="title"
                        className="m-0"
                      >
                        <Form.Control
                          type="text"
                          placeholder="title"
                          name="title"
                          value={values.title}
                          onChange={handleChange}
                          isValid={touched.title && !errors.title}
                          isInvalid={touched.title && !!errors.title}
                        />
                        <Form.Control.Feedback type="valid">
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.title}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="8"
                      className="mb-3"
                      controlId="validateShortDescription"
                    >
                      <FloatingLabel
                        controlId="shortDescription"
                        label="short description"
                        className="m-0"
                      >
                        <Form.Control
                          type="text"
                          placeholder="short description"
                          name="shortDescription"
                          value={values.shortDescription}
                          onChange={handleChange}
                          isValid={
                            touched.shortDescription && !errors.shortDescription
                          }
                          isInvalid={
                            touched.shortDescription &&
                            !!errors.shortDescription
                          }
                        />
                        <Form.Control.Feedback type="valid">
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.shortDescription}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="8"
                      className="mb-3"
                      controlId="validatePrice"
                    >
                      <FloatingLabel
                        controlId="price"
                        label="price"
                        className="m-0"
                      >
                        <Form.Control
                          type="number"
                          placeholder="price"
                          name="price"
                          value={values.price}
                          onChange={handleChange}
                          isValid={touched.price && !errors.price}
                          isInvalid={touched.price && !!errors.price}
                        />
                        <Form.Control.Feedback type="valid">
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.price}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="8"
                      className="mb-3"
                      controlId="validateLongDescription"
                    >
                      <FloatingLabel
                        controlId="longDescription"
                        label="long description"
                        className="m-0"
                      >
                        <Form.Control
                          type="text"
                          placeholder="long description"
                          name="longDescription"
                          value={values.longDescription}
                          onChange={handleChange}
                          isValid={
                            touched.longDescription && !errors.longDescription
                          }
                          isInvalid={
                            touched.longDescription && !!errors.longDescription
                          }
                        />
                        <Form.Control.Feedback type="valid">
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.longDescription}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="8"
                      className="mb-3"
                      controlId="validateLocation"
                    >
                      <FloatingLabel
                        controlId="location"
                        label="location"
                        className="m-0"
                      >
                        <Form.Control
                          type="text"
                          placeholder="location"
                          name="location"
                          value={values.location}
                          onChange={handleChange}
                          isValid={touched.location && !errors.location}
                          isInvalid={touched.location && !!errors.location}
                        />
                        <Form.Control.Feedback type="valid">
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.location}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="8"
                      className="mb-3"
                      controlId="validateOfferType"
                    >
                      <Form.Select
                        aria-label="Offer type select"
                        name="offerType"
                        defaultValue={offer?.offerType ?? OfferType.SELL_OFFER}
                        onChange={handleChange}
                      >
                        <option value={OfferType.SELL_OFFER}>Sell offer</option>
                        <option value={OfferType.PURCHASE_OFFER}>
                          Purchase offer
                        </option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col lg={true}>
                    <Form.Group
                      as={Col}
                      md="8"
                      className="mb-3"
                      controlId="validateCategories"
                    >
                      <Field
                        className="was-validated"
                        name="categories"
                        options={categoriesOptions}
                        defaultCategoriesOptions={defaultCategoriesOptions}
                        component={MyReactSelect}
                        placeholder="Select categories"
                        isMulti={true}
                        isValid={touched.categories && !errors.categories}
                        isInvalid={touched.categories && !!errors.categories}
                        label="name"
                      />
                      <div className="text-danger small">
                        {errors?.categories as string}
                      </div>
                    </Form.Group>
                    {loggedInAppUser?.userType === Role.ROLE_ADMIN && (
                      <Form.Group
                        as={Col}
                        md="8"
                        className="mb-3"
                        controlId="validateOfferStatus"
                      >
                        <Form.Select
                          aria-label="Offer status select"
                          name="offerStatus"
                          defaultValue={offer?.state}
                          onChange={handleChange}
                        >
                          <option value={OfferStatus.ACTIVE}>Active</option>
                          <option value={OfferStatus.APPROVED}>Approved</option>
                          <option value={OfferStatus.ON_HOLD}>On hold</option>
                          <option value={OfferStatus.DELETED}>Deleted</option>
                        </Form.Select>
                      </Form.Group>
                    )}
                  </Col>
                </Row>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={submit.loading}
                >
                  {submit.loading ? (
                    <span>
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span>Loading...</span>
                    </span>
                  ) : offer ? (
                    <span>Update offer</span>
                  ) : (
                    <span>Create offer</span>
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </Container>
      </Container>
    </MySpinner>
  );
}

export default OfferForm;
