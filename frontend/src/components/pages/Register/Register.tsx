import React, { useEffect, useRef, useState } from "react";

import InputGroup from "react-bootstrap/InputGroup";
import { MyToast } from "../../../models/MyToast";
import { IUser } from "../../../models/User";
import AuthenticationService from "../../../services/AuthenticationService";
import RegistrationService from "../../../services/RegistrationService";
import MyToastComponent from "../../Toast/MyToastComponent";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import MyNavbar from "../../Navbar/MyNavbar";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function Register() {
  const [validated, setValidated] = useState(false);
  const [user] = useState<IUser>({
    name: "name",
    lastName: "lastName",
    password: "password",
    email: "email",
  });

  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [myToast, setMyToast] = useState<MyToast>({
    show: false,
    title: "toast",
    background: "danger",
    message: "message",
  });
  useEffect(() => {
    AuthenticationService.logout();
  }, []);
  const repeatPasswordRef = useRef(null);

  const handleSubmit = async (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (!form.checkValidity()) {
      event.stopPropagation();
      setMyToast({
        background: "danger",
        message: "Invalid input in form",
        title: "Error",
        show: true,
      });
    } else {
      try {
        const resp = await RegistrationService.register(user);
        if (resp.status === 201) {
          setMyToast({
            background: "success",
            message: resp.data,
            title: "Success",
            show: true,
          });
        }
      } catch (e: any) {
        setMyToast({
          background: "danger",
          message: e.message.response.data ?? e.message.message,
          title: "Error",
          show: true,
        });
        console.log(e);
      }
    }

    setValidated(true);
  };

  return (
    <>
      <MyNavbar />
      <Container className="container-fluid bg-light text-dark p-5">
        <Container className="container bg-light p-5">
          <h2>Register</h2>
          <div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Col lg={true}>
                <Form.Group
                  as={Col}
                  md="4"
                  className="mb-3"
                  controlId="validateName"
                >
                  <FloatingLabel
                    controlId="floatingInput"
                    label="first name"
                    className="m-0"
                  >
                    <Form.Control
                      required
                      type="text"
                      placeholder="first name"
                      pattern="[A-Za-z]{3,25}"
                      onChange={(event) => {
                        user.name = event.target.value;
                      }}
                    />
                    <Form.Control.Feedback type="valid">
                      Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Please provide your name.
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
                      placeholder="last name"
                      pattern="[A-Za-z]{3,25}"
                      onChange={(event) => {
                        user.lastName = event.target.value;
                      }}
                    />
                    <Form.Control.Feedback type="valid">
                      Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Please provide your last name.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="4"
                  className="mb-3"
                  controlId="validateEmail"
                >
                  <InputGroup hasValidation>
                    <FloatingLabel controlId="validateEmail" label="email">
                      <Form.Control
                        type="email"
                        placeholder="email"
                        aria-describedby="inputGroupPrepend"
                        required
                        onChange={(event) => {
                          user.email = event.target.value;
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your email.
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="valid">
                        Looks good!
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </InputGroup>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="6"
                  className="mb-3"
                  controlId="validatePassword"
                >
                  <InputGroup hasValidation>
                    <FloatingLabel
                      controlId="validatePassword"
                      label="password"
                    >
                      <Form.Control
                        type="password"
                        placeholder="password"
                        required
                        pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).{8,24}"
                        autoComplete="new-password"
                        onChange={(event) => {
                          setPassword(event.target.value);
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        8 to 24 characters.
                        <br />
                        Must include uppercase and lowercase letters, a number
                        and a special character.
                        <br />
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="valid">
                        Nice password!
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </InputGroup>
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
                      placeholder="password"
                      required
                      ref={repeatPasswordRef}
                      onFocus={(event) => {
                        if (password === repeatedPassword) {
                          event.target.setCustomValidity("");
                        } else {
                          event.target.setCustomValidity(
                            "Passwords don't match"
                          );
                        }
                      }}
                      onChange={(event) => {
                        setRepeatedPassword(event.target.value);
                        if (password === event.target.value) {
                          event.target.setCustomValidity("");
                          user.password = event.target.value;
                        } else {
                          event.target.setCustomValidity(
                            "Passwords don't match"
                          );
                        }
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Passwords don't match.
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">
                      Passwords match
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Button type="submit">Register</Button>
            </Form>
          </div>
        </Container>
      </Container>
      <MyToastComponent
        myToast={myToast}
        setMyToast={setMyToast}
      ></MyToastComponent>
    </>
  );
}

export default Register;
