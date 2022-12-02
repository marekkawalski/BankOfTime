import { useServices } from '@/context/ServicesContext';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { Button, Col, Container, Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { registrationValidationSchema } from './registrationValidation';
import useRegister from './useRegister';

function Register() {
  const services = useServices();

  useEffect(() => {
    if (!services) return;
    services.authenticationService.logout();
  }, [services]);

  return (
    <>
      <Container className="container-fluid bg-light text-dark p-5">
        <Container className="container bg-light p-5">
          <h2>Register</h2>
          <Formik
            validationSchema={registrationValidationSchema}
            onSubmit={useRegister()}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Col lg={true}>
                  <Form.Group
                    as={Col}
                    md="4"
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
                    md="4"
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
                    md="4"
                    className="mb-3"
                    controlId="validateEmail"
                  >
                    <FloatingLabel controlId="validateEmail" label="email">
                      <Form.Control
                        type="email"
                        placeholder="email"
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
                    md="4"
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
                    md="4"
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
                </Col>
                <Button type="submit">Register</Button>
              </Form>
            )}
          </Formik>
        </Container>
      </Container>
    </>
  );
}

export default Register;
