import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  InputGroup,
} from "react-bootstrap";
import { OfferType } from "../../../enums/OfferType";
import { MyToast } from "../../../models/MyToast";
import { Offer } from "../../../models/Offer";
import OfferService from "../../../services/OfferService";
import MyNavbar from "../../Navbar/MyNavbar";
import MyToastComponent from "../../Toast/MyToastComponent";

function CreateOffer() {
  const [validated, setValidated] = useState(false);
  const [myToast, setMyToast] = useState<MyToast>({
    show: false,
    title: "toast",
    background: "danger",
    message: "message",
  });
  const [offer] = useState<Offer>({
    title: "title",
    shortDescription: "shortDescription",
    price: 0,
  });

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
        const resp = await OfferService.createOffer(offer);
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
    <div>
      <MyNavbar />
      <Container className="container-fluid bg-light text-dark p-5">
        <Container className="container bg-light p-5">
          <h2>Create offer</h2>
          <div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Col lg={true}>
                <Form.Group
                  as={Col}
                  md="4"
                  className="mb-3"
                  controlId="validateTitle"
                >
                  <FloatingLabel
                    controlId="floatingInput"
                    label="title"
                    className="m-0"
                  >
                    <Form.Control
                      required
                      type="text"
                      placeholder="title"
                      maxLength={30}
                      minLength={3}
                      onChange={(event) => {
                        offer.title = event.target.value;
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
              </Col>
              <Button type="submit">Create</Button>
            </Form>
          </div>
        </Container>
      </Container>
      <MyToastComponent
        myToast={myToast}
        setMyToast={setMyToast}
      ></MyToastComponent>
    </div>
  );
}

export default CreateOffer;
