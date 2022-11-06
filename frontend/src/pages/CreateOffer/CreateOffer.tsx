import React, { useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form } from 'react-bootstrap';

import MyNavbar from '../../components/Navbar/MyNavbar';
import MyToastComponent from '../../components/Toast/MyToastComponent';
import { OfferType } from '../../enums/OfferType';
import { MyToast } from '../../models/MyToast';
import { ICreateOffer } from '../../models/Offer';
import OfferService from '../../services/OfferService';

function CreateOffer() {
  const [validated, setValidated] = useState(false);
  const [myToast, setMyToast] = useState<MyToast>({
    show: false,
  });
  const [offer] = useState<ICreateOffer>({
    title: "title",
    shortDescription: "shortDescription",
    price: 0,
    offerType: OfferType.PURCHASE_OFFER,
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
        console.log(resp);
        if (resp.status === 201) {
          setMyToast({
            background: "success",
            message: "Offer has been created",
            title: "Success",
            show: true,
          });
        } else {
          setMyToast({
            background: "danger",
            message: "an error occurred",
            title: "Error",
            show: true,
          });
        }
      } catch (e: any) {
        setMyToast({
          background: "danger",
          message: e.toString(),
          title: "Error",
          show: true,
        });
        console.log(e);
      }
    }
  };

  return (
    <div>
      <MyNavbar />
      <MyToastComponent myToast={myToast} setMyToast={setMyToast} />
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
                <Form.Group
                  as={Col}
                  md="4"
                  className="mb-3"
                  controlId="validateShortDescription"
                >
                  <FloatingLabel
                    controlId="floatingInput"
                    label="short description"
                    className="m-0"
                  >
                    <Form.Control
                      required
                      type="text"
                      placeholder="short description"
                      maxLength={100}
                      minLength={3}
                      onChange={(event) => {
                        offer.shortDescription = event.target.value;
                      }}
                    />
                    <Form.Control.Feedback type="valid">
                      Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Please provide short description.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="4"
                  className="mb-3"
                  controlId="validatePrice"
                >
                  <FloatingLabel
                    controlId="floatingInput"
                    label="price"
                    className="m-0"
                  >
                    <Form.Control
                      required
                      type="number"
                      placeholder="price"
                      onChange={(event) => {
                        offer.price = parseFloat(event.target.value);
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
                <Form.Select
                  aria-label="Offer type select"
                  onChange={(event) => {
                    const value: string = event.target.value;
                    offer.offerType = value as OfferType;
                    console.log(value as OfferType);
                    console.log(offer);
                  }}
                >
                  <option value={OfferType.PURCHASE_OFFER}>
                    Purchase offer
                  </option>
                  <option value={OfferType.SELL_OFFER}>Sell offer</option>
                </Form.Select>
              </Col>
              <Button type="submit" className="mt-3">
                Create
              </Button>
            </Form>
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default CreateOffer;
