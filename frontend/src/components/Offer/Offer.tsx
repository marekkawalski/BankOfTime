import { useServices } from '@/context/ServicesContext';
import { useMyToast } from '@/context/ToastContext';
import { OfferStatus } from '@/enums/OfferState';
import { OfferType } from '@/enums/OfferType';
import { ToastBackground } from '@/enums/ToastBackground';
import { ToastTitle } from '@/enums/ToastTitle';
import useGetAppUser from '@/hooks/useGetAppUser';
import { useEffect, useState } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { OfferProps } from '../OfferContainer/types';
import { IManageOffer, ManageOffer } from './ManageOffer';

function Offer({ offer, handleGetOffers }: OfferProps) {
  const navigate = useNavigate();
  const { appUser } = useGetAppUser();
  const services = useServices();
  const [manageOffer, setManageOffer] = useState<IManageOffer>();
  const toast = useMyToast();

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
      toast?.make(
        ToastTitle.SUCCESS,
        ToastBackground.SUCCESS,
        "Client has been accepted!"
      );
    } catch (error: any) {
      console.log(error);
      toast?.make(
        ToastTitle.ERROR,
        ToastBackground.ERROR,
        (error?.message?.response?.data?.message as string) ?? "Error"
      );
    }
    await handleGetOffers({});
  };
  return (
    <div>
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
