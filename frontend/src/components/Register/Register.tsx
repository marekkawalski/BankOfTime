import './Register.scss';

import { Role } from '@/enums/Role';
import { Formik } from 'formik';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useLocation } from 'react-router-dom';

import useGetAppUser from '../../hooks/useGetAppUser';
import { RegisterProps, ValuesProps } from './types';
import { registrationValidationSchema } from './validation/registrationValidation';
import { updateUserValidationSchema } from './validation/updateUserValidation';

function Register({ appUser, submit, loading }: RegisterProps) {
  const location = useLocation();
  const { loggedInAppUser } = useGetAppUser();

  return (
    <>
      <Container className="container-fluid bg-light text-dark p-5">
        <Container className="container bg-light p-5">
          {appUser ? <h2>Update profile</h2> : <h2>Register</h2>}
          <Formik
            validationSchema={
              location.pathname.includes("register")
                ? registrationValidationSchema
                : updateUserValidationSchema
            }
            onSubmit={submit}
            initialValues={
              {
                id: appUser?.id ?? undefined,
                firstName: appUser?.firstName ?? "",
                lastName: appUser?.lastName ?? "",
                email: appUser?.email ?? "",
                password: location.pathname.includes("register")
                  ? ""
                  : undefined,
                confirmPassword: "",
                city: appUser?.city ?? "",
                country: appUser?.country ?? "",
                aboutMe: appUser?.aboutMe ?? "",
                phone: appUser?.phoneNumber ?? "",
                occupation: appUser?.occupation ?? "",
                userRole: appUser?.userType,
              } as ValuesProps
            }
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Col lg={true}>
                    <Form.Group
                      as={Col}
                      md="6"
                      className="mb-3"
                      controlId="validateFirstName"
                    >
                      <FloatingLabel
                        controlId="validateFirstNameLabel"
                        label="name"
                        className="m-0"
                      >
                        <Form.Control
                          type="text"
                          placeholder="first name"
                          name="firstName"
                          value={values.firstName}
                          onChange={handleChange}
                          isValid={touched.firstName && !errors.firstName}
                          isInvalid={touched.firstName && !!errors.firstName}
                        />
                        <Form.Control.Feedback type="valid">
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.firstName}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="6"
                      className="mb-3"
                      controlId="validateLastName"
                    >
                      <FloatingLabel
                        controlId="validateLastName"
                        label="last name"
                        className="m-0"
                      >
                        <Form.Control
                          required
                          type="text"
                          name="lastName"
                          placeholder="last name"
                          value={values.lastName}
                          onChange={handleChange}
                          isValid={touched.lastName && !errors.lastName}
                          isInvalid={touched.lastName && !!errors.lastName}
                        />
                        <Form.Control.Feedback type="valid">
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.lastName}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="6"
                      className="mb-3"
                      controlId="validateEmail"
                    >
                      <FloatingLabel controlId="validateEmail" label="email">
                        <Form.Control
                          type="email"
                          placeholder="email"
                          disabled={appUser !== undefined}
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          isValid={touched.email && !errors.email}
                          isInvalid={touched.email && !!errors.email}
                        />
                        <Form.Control.Feedback type="valid">
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="6"
                      className="mb-3"
                      controlId="validatePassword"
                    >
                      <FloatingLabel
                        controlId="validatePassword"
                        label="password"
                      >
                        <Form.Control
                          type="password"
                          placeholder="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          isValid={touched.password && !errors.password}
                          isInvalid={touched.password && !!errors.password}
                        />
                        <Form.Control.Feedback type="valid">
                          Nice password!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="6"
                      className="mb-3"
                      controlId="validateRepeatPassword"
                    >
                      <FloatingLabel
                        controlId="validateRepeatPassword"
                        label="repeat password"
                      >
                        <Form.Control
                          type="password"
                          placeholder="confirmPassword"
                          name="confirmPassword"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          isValid={
                            touched.confirmPassword && !errors.confirmPassword
                          }
                          isInvalid={
                            touched.confirmPassword && !!errors.confirmPassword
                          }
                        />
                        <Form.Control.Feedback type="valid">
                          Passwords match
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.confirmPassword}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    {loggedInAppUser?.userType === Role.ROLE_ADMIN && (
                      <Form.Group
                        as={Col}
                        md="8"
                        className="mb-3"
                        controlId="validateUserRole"
                      >
                        <Form.Select
                          aria-label="User role select"
                          name="userRole"
                          defaultValue={values?.userRole}
                          value={values.userRole}
                          onChange={handleChange}
                        >
                          <option value={Role.ROLE_NORMAL}>Role normal</option>
                          <option value={Role.ROLE_ADMIN}>Role admin</option>
                        </Form.Select>
                      </Form.Group>
                    )}
                  </Col>
                  <Col>
                    <Form.Group
                      as={Col}
                      md="6"
                      className="mb-3"
                      controlId="validateCity"
                    >
                      <FloatingLabel
                        controlId="validateCity"
                        label="city"
                        className="m-0"
                      >
                        <Form.Control
                          required
                          type="text"
                          name="city"
                          placeholder="city"
                          value={values.city}
                          onChange={handleChange}
                          isValid={touched.city && !errors.city}
                          isInvalid={touched.city && !!errors.city}
                        />
                        <Form.Control.Feedback type="valid">
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.city}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="6"
                      className="mb-3"
                      controlId="validateCountry"
                    >
                      <FloatingLabel
                        controlId="validateCountry"
                        label="country"
                        className="m-0"
                      >
                        <Form.Control
                          required
                          type="text"
                          name="country"
                          placeholder="country"
                          value={values.country}
                          onChange={handleChange}
                          isValid={touched.country && !errors.country}
                          isInvalid={touched.country && !!errors.country}
                        />
                        <Form.Control.Feedback type="valid">
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.country}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="6"
                      className="mb-3"
                      controlId="validatePhone"
                    >
                      <FloatingLabel
                        controlId="validatePhone"
                        label="phone"
                        className="m-0"
                      >
                        <Form.Control
                          required
                          type="text"
                          name="phone"
                          placeholder="phone"
                          value={values.phone}
                          onChange={handleChange}
                          isValid={touched.phone && !errors.phone}
                          isInvalid={touched.phone && !!errors.phone}
                        />
                        <Form.Control.Feedback type="valid">
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="6"
                      className="mb-3"
                      controlId="validateOccupation"
                    >
                      <FloatingLabel
                        controlId="validateOccupation"
                        label="occupation"
                        className="m-0"
                      >
                        <Form.Control
                          required
                          type="text"
                          name="occupation"
                          placeholder="occupation"
                          value={values.occupation}
                          onChange={handleChange}
                          isValid={touched.occupation && !errors.occupation}
                          isInvalid={touched.occupation && !!errors.occupation}
                        />
                        <Form.Control.Feedback type="valid">
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.occupation}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="10"
                      className="mb-3 about-me"
                      size="lg"
                      controlId="validateAboutMe"
                    >
                      <FloatingLabel
                        controlId="validateAboutMe"
                        label="aboutMe"
                        className="m-0"
                      >
                        <Form.Control
                          as="textarea"
                          required
                          type="textarea"
                          name="aboutMe"
                          style={{ height: "120px" }}
                          placeholder="aboutMe"
                          value={values.aboutMe}
                          onChange={handleChange}
                          isValid={touched.aboutMe && !errors.aboutMe}
                          isInvalid={touched.aboutMe && !!errors.aboutMe}
                        />
                        <Form.Control.Feedback type="valid">
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.aboutMe}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>
                <Button type="submit">
                  {loading && (
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                  {appUser === undefined ? (
                    <span>Register </span>
                  ) : (
                    <span>Save</span>
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </Container>
      </Container>
    </>
  );
}

export default Register;
