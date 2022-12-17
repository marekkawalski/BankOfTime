import './OfferForm.scss';

import { OfferType } from '@/enums/OfferType';
import useGetCategories from '@/hooks/useGetCategories';
import { ICreateOffer, IUpdateOffer } from '@/models/Offer';
import { Field, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row, Spinner } from 'react-bootstrap';

import MyReactSelect from '../MyReactSelect/MyReactSelect';
import MySpinner from '../MySpinner/MySpinner';
import { CategoryOption, OfferFormProps } from './types';
import { offerValidation } from './validation/offerValidation';

function OfferForm({ offer, submit }: OfferFormProps) {
  const { categories, loading } = useGetCategories();
  const [categoriesOptions, seCategoriesOptions] = useState<CategoryOption[]>(
    []
  );

  useEffect(() => {
    const tempArray: CategoryOption[] = [];
    categories?.map((category) => {
      tempArray.push({ value: category, label: category.name });
    });
    seCategoriesOptions(tempArray);
  }, [loading]);

  return (
    <MySpinner show={loading}>
      <Container className="container-fluid bg-light text-dark p-5">
        <Container className="bg-light p-5">
          {offer ? <h2>Edit offer</h2> : <h2>Create offer</h2>}
          <Formik
            validationSchema={offerValidation}
            onSubmit={(fOffer: ICreateOffer | IUpdateOffer) =>
              submit.handleSubmit(fOffer)
            }
            initialValues={{
              id: offer?.id ?? undefined,
              title: offer?.title ?? "",
              shortDescription: offer?.shortDescription ?? "",
              price: offer?.price ?? 0,
              longDescription: offer?.longDescription ?? "",
              location: offer?.location ?? "",
              offerType: offer?.offerType ?? OfferType.SELL_OFFER,
              categories: offer?.categories ?? [],
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
                        component={MyReactSelect}
                        values={values?.categories}
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
