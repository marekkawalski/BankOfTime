import React, { useEffect, useState } from "react";

import InputGroup from "react-bootstrap/InputGroup";
import { PWD_REGEX, USERNAME_REGEX, USER_REGEX } from "../../../config/config";
import { MyToast } from "../../../models/MyToast";
import { UserToRegister } from "../../../models/User";
import AuthenticationService from "../../../services/AuthenticationService";
import RegistrationService from "../../../services/RegistrationService";
import MyToastComponent from "../../Toast/MyToastComponent";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import MyNavbar from "../../Navbar/MyNavbar";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function Register() {
  const [validated, setValidated] = useState(false);
  const [user] = useState<UserToRegister>({
    name: "name",
    lastName: "lastName",
    password: "password",
    username: "username",
  });
  const [isValidRepeatedPassword, setIsValidRepeatedPassword] = useState<
    boolean | undefined
  >(false);
  const [isValidName, setIsValidName] = useState<boolean | undefined>(false);
  const [isValidLastName, setIsValidLastName] = useState<boolean | undefined>(
    false
  );
  const [isValidPassword, setIsValidPassword] = useState<boolean | undefined>(
    false
  );
  const [isValidUsername, setIsValidUsername] = useState<boolean | undefined>(
    false
  );
  const [myToast, setMyToast] = useState<MyToast>({
    show: false,
    title: "toast",
    background: "danger",
    message: "message",
  });
  useEffect(() => {
    AuthenticationService.logout();
  }, []);

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
    return false;
  };

  return (
    <>
      <MyNavbar />
      <MyToastComponent
        myToast={myToast}
        setMyToast={setMyToast}
      ></MyToastComponent>
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
                      onChange={(event) => {
                        user.name = event.target.value;
                        setIsValidName(USER_REGEX.test(user.name));
                      }}
                      isInvalid={
                        typeof (isValidName === undefined)
                          ? false
                          : !isValidName
                      }
                      isValid={isValidName}
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
                      onChange={(event) => {
                        user.lastName = event.target.value;
                        setIsValidLastName(USER_REGEX.test(user.lastName));
                      }}
                      isInvalid={
                        typeof (isValidLastName === undefined)
                          ? false
                          : !isValidLastName
                      }
                      isValid={isValidLastName}
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
                  controlId="validateUsername"
                >
                  <InputGroup hasValidation>
                    <FloatingLabel controlId="validateUsername" label="email">
                      <Form.Control
                        type="email"
                        placeholder="email"
                        aria-describedby="inputGroupPrepend"
                        required
                        onChange={(event) => {
                          user.username = event.target.value;
                          setIsValidUsername(
                            USERNAME_REGEX.test(user.username)
                          );
                        }}
                        isInvalid={
                          typeof (isValidUsername === undefined)
                            ? false
                            : !isValidUsername
                        }
                        isValid={isValidUsername}
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
                        onChange={(event) => {
                          user.password = event.target.value;
                          setIsValidPassword(PWD_REGEX.test(user.password));
                        }}
                        isInvalid={
                          typeof (isValidPassword === undefined)
                            ? false
                            : !isValidPassword
                        }
                        isValid={isValidPassword}
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
                      onChange={(event) => {
                        setIsValidRepeatedPassword(
                          event.target.value === user.password
                        );
                      }}
                      isInvalid={
                        typeof (isValidRepeatedPassword === undefined)
                          ? false
                          : !isValidRepeatedPassword
                      }
                      isValid={isValidRepeatedPassword}
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
    </>
  );
}

export default Register;
