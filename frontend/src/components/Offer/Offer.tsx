import './Offer.scss';

import { useServices } from '@/context/ServicesContext';
import { useMyToast } from '@/context/ToastContext';
import { OfferStatus } from '@/enums/OfferState';
import { OfferType } from '@/enums/OfferType';
import { ToastBackground } from '@/enums/ToastBackground';
import { ToastTitle } from '@/enums/ToastTitle';
import useGetAppUser from '@/hooks/useGetAppUser';
import { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { OfferProps } from '../OfferContainer/types';
import { ManageOffer } from './ManageOffer';
import { IManageOffer } from './types';

function Offer({ offer, handleGetOffers, filters }: OfferProps) {
  const navigate = useNavigate();
  const { appUser } = useGetAppUser();
  const services = useServices();
  const [manageOffer, setManageOffer] = useState<IManageOffer>();
  const toast = useMyToast();

  useEffect(() => {
    setManageOffer(new ManageOffer(offer, appUser));
  }, [appUser]);

  const makeTransaction = useCallback(async () => {
    console.log("Make transaction");
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
    await handleGetOffers(filters);
  }, [offer, services, appUser, toast]);

  const rejectPendingApproval = useCallback(async () => {
    console.log("Reject approval");
    let result: any;
    if (!(services && offer)) return;
    try {
      result = await services.timeTransactionService.rejectPendingApproval(
        offer.id
      );
      console.log(result);
      toast?.make(
        ToastTitle.SUCCESS,
        ToastBackground.SUCCESS,
        "Client has been rejected!"
      );
    } catch (error: any) {
      console.log(error);
      toast?.make(
        ToastTitle.ERROR,
        ToastBackground.ERROR,
        (error?.message?.response?.data?.message as string) ?? "Error"
      );
    }
    await handleGetOffers(filters);
  }, [offer, services, toast]);

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

            <Card.Text>
              location: {offer?.location ? offer?.location : "Not provided"}
            </Card.Text>
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
              <div className="">
                <Button
                  onClick={() => {
                    navigate(`${offer.id}`);
                  }}
                  size="sm"
                  variant="primary"
                  className="btn-offer-details"
                >
                  View offer details
                </Button>
                {manageOffer?.isOfferOwner() &&
                  offer.state === OfferStatus.ON_HOLD && (
                    <>
                      <Button
                        size="sm"
                        variant="primary"
                        className="mx-2"
                        onClick={() =>
                          navigate(
                            `/appUser/${
                              offer.offerType === OfferType.PURCHASE_OFFER
                                ? offer.seller?.email
                                : offer.buyer?.email
                            }`
                          )
                        }
                      >
                        View client profile
                      </Button>
                      <div className="btn-actions">
                        <Button
                          size="sm"
                          variant="success"
                          onClick={makeTransaction}
                          className="btn-accept"
                        >
                          Accept
                          {offer.offerType === OfferType.PURCHASE_OFFER ? (
                            <span> seller </span>
                          ) : (
                            <span> buyer</span>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          className="btn-reject"
                          onClick={rejectPendingApproval}
                        >
                          Reject{" "}
                          {offer.offerType === OfferType.PURCHASE_OFFER ? (
                            <span> seller </span>
                          ) : (
                            <span> buyer</span>
                          )}
                        </Button>
                      </div>
                    </>
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
