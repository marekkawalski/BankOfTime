import './OfferContainer.scss';

import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

import { useServices } from '../../context/ServicesContext';
import { IAppUser } from '../../models/AppUser';
import { canEdit } from '../../utils/canEdit';
import { OfferContainerProps } from './types';

const OfferContainer: React.FC<OfferContainerProps> = ({ title, offers }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [appUser, setAppUser] = useState<IAppUser | undefined>();
  const navigate = useNavigate();
  const services = useServices();

  useEffect(() => {
    if (!services) return;
    setAppUser(services.appUserService.getAppUser());
  }, [setAppUser, services]);

  return (
    <section>
      <div className="main-container">
        <div className="filter-bar-container">
          <h2>{title}</h2>
          <Form className="d-flex pb-3 mt-1">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <hr />
          <div className="filter-bar-container-child">
            <Form.Label>Sort by</Form.Label>
            <Form.Select aria-label="Default select example">
              <option value="1">newest first</option>
              <option value="2">oldest first</option>
              <option value="3">most expensive first</option>
              <option value="3">cheapest first</option>
            </Form.Select>
          </div>
          <div className="filter-bar-container-child">
            <Form.Label>Offer status</Form.Label>
            <Form.Select aria-label="Default select example">
              <option value="1">Active</option>
              <option value="2">Realized</option>
            </Form.Select>
          </div>
          <div className="filter-bar-container-child">
            <Form.Label>Offer category</Form.Label>
            <Form.Select aria-label="Default select example">
              <option value="1">Active</option>
              <option value="2">Realized</option>
            </Form.Select>
          </div>
        </div>
        <div className="content-container">
          <div>
            {offers.length === 0 && <div>No offers</div>}
            <Row xs={1} md={2} className="g-4 mb-3">
              {offers.map((offer) => {
                return (
                  <Col>
                    <Card>
                      <Card.Img
                        variant="top"
                        src="https://mdbootstrap.com/img/new/standard/nature/184.webp"
                      />
                      <Card.Body>
                        <Card.Title>{offer.title}</Card.Title>
                        <Card.Text className="d-flex justify-content-between">
                          <div>{offer.shortDescription}</div>
                          <div className="price">{offer.price}h</div>
                        </Card.Text>
                        {offer?.location && (
                          <Card.Text>location: {offer?.location}</Card.Text>
                        )}
                        <Card.Text> {offer.state}</Card.Text>
                        {canEdit(offer, appUser) ? (
                          <Button
                            onClick={() => {
                              navigate(`${offer.id}`);
                            }}
                            size="sm"
                            variant="primary"
                          >
                            Edit offer
                          </Button>
                        ) : (
                          <Button
                            onClick={() => {
                              navigate(`${offer.id}`);
                            }}
                            size="sm"
                            variant="primary"
                          >
                            View offer details
                          </Button>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferContainer;
