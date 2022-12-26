import { Formik } from 'formik';
import { Button, Col, Container, FloatingLabel, Form, Row, Spinner } from 'react-bootstrap';

import useAddCategory from './useAddCategory';
import { categoryValidation } from './validation/categoryValidation';

function AddCategory() {
  const { loading, handleSubmit } = useAddCategory();
  return (
    <>
      <Container className="container-fluid bg-light text-dark p-5">
        <Container className="container bg-light p-5">
          <h2>Add category</h2>
          <Formik
            validationSchema={categoryValidation}
            onSubmit={handleSubmit}
            initialValues={{
              name: "",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Col lg={true}>
                    <Form.Group
                      as={Col}
                      md="4"
                      className="mb-3"
                      controlId="validateCategoryName"
                    >
                      <FloatingLabel
                        controlId="validateCategoryName"
                        label="name"
                        className="m-0"
                      >
                        <Form.Control
                          type="text"
                          placeholder="name"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          isValid={touched.name && !errors.name}
                          isInvalid={touched.name && !!errors.name}
                        />
                        <Form.Control.Feedback type="valid">
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
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
                  <span>Save</span>
                </Button>
              </Form>
            )}
          </Formik>
        </Container>
      </Container>
    </>
  );
}

export default AddCategory;
