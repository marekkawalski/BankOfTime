import React, { useEffect, useState } from "react";

import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import { PWD_REGEX, USERNAME_REGEX, USER_REGEX } from "../../../config/config";
import { MyToast } from "../../../models/MyToast";
import { UserToRegister } from "../../../models/User";
import AuthenticationService from "../../../services/AuthenticationService";
import RegistrationService from "../../../services/RegistrationService";
import MyToastComponent from "../../Toast/MyToastComponent";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import MyNavbar from "../../Navbar/MyNavbar";

function Register() {
  const [validated, setValidated] = useState(false);
  const [user] = useState<UserToRegister>({
    name: "name",
    lastName: "lastName",
    password: "password",
    username: "username",
  });
  const [isValidRepeatedPassword, setIsValidRepeatedPassword] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isValidLastName, setIsValidLastName] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [myToast, setMyToast] = useState<MyToast>({
    show: false,
    title: "toast",
    background: "danger",
    message: "message",
  });
  const navigate = useNavigate();
  useEffect(() => {
    AuthenticationService.logout();
  }, []);

  const handleSubmit = async (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
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
      <MyToastComponent
        myToast={myToast}
        setMyToast={setMyToast}
      ></MyToastComponent>
      <MyNavbar />
      <Container className="container-fluid bg-light text-dark p-5">
        <Container className="container bg-light p-5">
          <Row>
            <h2>Register</h2>
            <div>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Col lg={true} className="mb-2">
                  <Form.Group
                    as={Col}
                    md="4"
                    className="mb-3"
                    controlId="validateName"
                  >
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="First name"
                      onChange={(event) => {
                        user.name = event.target.value;
                        setIsValidName(USER_REGEX.test(user.name));
                      }}
                      isInvalid={!isValidName}
                      isValid={isValidName}
                    />
                    <Form.Control.Feedback type="valid">
                      Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Please provide your name.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="4"
                    className="mb-3"
                    controlId="validateLastName"
                  >
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Last name"
                      onChange={(event) => {
                        user.lastName = event.target.value;
                        setIsValidLastName(USER_REGEX.test(user.lastName));
                      }}
                      isInvalid={!isValidLastName}
                      isValid={isValidLastName}
                    />
                    <Form.Control.Feedback type="valid">
                      Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Please provide your last name.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="4"
                    className="mb-3"
                    controlId="validationCustomUsername"
                  >
                    <Form.Label>Username</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend">
                        @
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Username"
                        aria-describedby="inputGroupPrepend"
                        required
                        onChange={(event) => {
                          user.username = event.target.value;
                          setIsValidUsername(
                            USERNAME_REGEX.test(user.username)
                          );
                        }}
                        isInvalid={!isValidUsername}
                        isValid={isValidUsername}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please choose a username.
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="valid">
                        Looks good!
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="6"
                    className="mb-3"
                    controlId="validatePassword"
                  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="password"
                      required
                      onChange={(event) => {
                        user.password = event.target.value;
                        setIsValidPassword(PWD_REGEX.test(user.password));
                      }}
                      isInvalid={!isValidPassword}
                      isValid={isValidPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      8 to 24 characters.
                      <br />
                      Must include uppercase and lowercase letters, a number and
                      a special character.
                      <br />
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">
                      Nice password!
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="6"
                    className="mb-3"
                    controlId="validationCustom03"
                  >
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="password"
                      required
                      onChange={(event) => {
                        setIsValidRepeatedPassword(
                          event.target.value === user.password
                        );
                      }}
                      isInvalid={!isValidRepeatedPassword}
                      isValid={isValidRepeatedPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      Passwords don't match.
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">
                      Passwords match
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Button type="submit">Register</Button>
              </Form>
            </div>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default Register;
