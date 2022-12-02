import React, { useEffect, useState } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { useServices } from '../../context/ServicesContext';
import { OfferStatus } from '../../enums/OfferState';
import { OfferType } from '../../enums/OfferType';
import useGetAppUser from '../../hooks/useGetAppUser';
import { OfferProps } from '../OfferContainer/types';
import MyToastComponent from '../Toast/MyToastComponent';
import useGetMyToast from '../Toast/useGetMyToast';
import { IManageOffer, ManageOffer } from './ManageOffer';

function Offer({ offer, handleGetOffers }: OfferProps) {
  const { myToast, setMyToast } = useGetMyToast();
  const navigate = useNavigate();
  const { appUser } = useGetAppUser();
  const services = useServices();
  const [manageOffer, setManageOffer] = useState<IManageOffer>();

  useEffect(() => {
    setManageOffer(new ManageOffer(offer, appUser));
  }, [appUser]);

  const setFooterClassName = (): string => {
    switch (true) {
      case offer.state === OfferStatus.ACTIVE:
        return "text-success";
      case offer.state === OfferStatus.APPROVED:
        return "text-success";
      case offer.state === OfferStatus.ON_HOLD:
        return "text-warning";
      case offer.state === OfferStatus.UNAVAILABLE:
        return "text-secondary";
      default:
        return "text-secondary";
    }
  };
  const makeTransaction = async () => {
    let result: any;
    if (!(services && appUser && offer)) return;
    try {
      result = await services.timeTransactionService.makeTransaction(
        offer.id,
        offer?.seller?.id ?? appUser.id,
        offer?.buyer?.id ?? appUser.id
      );
      console.log(result);
      setMyToast({
        background: "success",
        message: "Client has been accepted!",
        title: "Success",
        show: true,
      });
    } catch (error: any) {
      console.log(error);
      setMyToast({
        background: "danger",
        message: (error?.message?.response?.data?.message as string) ?? "Error",
        title: "Error",
        show: true,
      });
    }
    await handleGetOffers();
  };
  const reload = async () => {
    await handleGetOffers();
    setMyToast({
      background: "success",
      message: "Client has been accepted!",
      title: "Success",
      show: true,
    });
    // await handleGetOffers();
  };
  return (
    <div>
      <MyToastComponent myToast={myToast} setMyToast={setMyToast} />
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
            <Card.Text> {offer.offerType}</Card.Text>
            {manageOffer?.canEdit() ? (
              <div>
                <Button
                  onClick={() => {
                    navigate(`${offer.id}`);
                  }}
                  size="sm"
                  variant="primary"
                >
                  Edit offer
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  onClick={() => {
                    navigate(`${offer.id}`);
                  }}
                  size="sm"
                  variant="primary"
                >
                  View offer details
                </Button>
                {manageOffer?.isOfferOwner() &&
                  offer.state === OfferStatus.ON_HOLD && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => makeTransaction()}
                    >
                      Accept
                      {offer.offerType === OfferType.PURCHASE_OFFER ? (
                        <span>seller </span>
                      ) : (
                        <span>buyer</span>
                      )}
                    </Button>
                  )}
              </div>
            )}
            <Button size="sm" variant="primary" onClick={() => reload()}>
              Test
            </Button>
          </Card.Body>
          <Card.Footer className={setFooterClassName()}>
            {offer.state}
          </Card.Footer>
        </Card>
      </Col>
    </div>
  );
}

export default Offer;
