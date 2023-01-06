import './Offer.scss';

import { useServices } from '@/context/ServicesContext';
import { useMyToast } from '@/context/ToastContext';
import { OfferStatus } from '@/enums/OfferState';
import { OfferType } from '@/enums/OfferType';
import { ToastBackground } from '@/enums/ToastBackground';
import { ToastTitle } from '@/enums/ToastTitle';
import useGetAppUser from '@/hooks/useGetAppUser';
import { faEdit, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, OverlayTrigger, Popover } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { IAppUser } from '../../models/AppUser';
import { OfferProps } from '../OfferContainer/types';
import { ManageOffer } from './ManageOffer';
import { IManageOffer } from './types';

function Offer({ offer, handleGetOffers, filters }: OfferProps) {
  const navigate = useNavigate();
  const { loggedInAppUser } = useGetAppUser();
  const services = useServices();
  const [manageOffer, setManageOffer] = useState<IManageOffer>();
  const toast = useMyToast();
  const [client, setClient] = useState<IAppUser | undefined>(undefined);

  useEffect(() => {
    setManageOffer(new ManageOffer(offer, loggedInAppUser));
    setClient(
      offer.offerType === OfferType.PURCHASE_OFFER ? offer.seller : offer.buyer
    );
  }, [loggedInAppUser, offer]);

  const makeTransaction = useCallback(async () => {
    console.log("Make transaction");
    let result: any;
    if (!(services && loggedInAppUser && offer)) return;
    try {
      result = await services.timeTransactionService.makeTransaction(
        offer.id,
        offer?.seller?.id ?? loggedInAppUser.id,
        offer?.buyer?.id ?? loggedInAppUser.id
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
  }, [offer, services, loggedInAppUser, toast]);

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
      default:
        return "text-secondary";
    }
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <div className="preview-profile-wrapper">
          <div className="">
            <div className="card">
              <div className="card-body little-profile text-center mt-5">
                <div className="pro-img">
                  <img src="https://i.imgur.com/8RKXAIV.jpg" alt="user" />
                </div>
                <h5 className="m-b-0">
                  {client?.firstName} {client?.lastName}
                </h5>
                <p className="mb-4">{client?.occupation}</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body little-profile">
                <div>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span className="pr-1"> {client?.email}</span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faPhone} />
                  <span className="pr-1"> {client?.phoneNumber}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          size="sm"
          variant="primary"
          onClick={() => navigate(`/appUser/${client?.email}`)}
        >
          View Profile
        </Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <div>
      <Col>
        <Card className="my-card">
          <Card.Img
            variant="top"
            src="https://mdbootstrap.com/img/new/standard/nature/184.webp"
          />
          <Card.Body>
            <Card.Title>
              <Link className="links" to={`${offer.id}`}>
                {offer.title}{" "}
                {manageOffer?.canEdit() && (
                  <div className="mx-1">
                    <FontAwesomeIcon icon={faEdit} />
                  </div>
                )}
              </Link>
            </Card.Title>
            <Card.Text className="d-flex justify-content-between">
              <div>{offer.shortDescription}</div>
              <div className="price">{offer.price}h</div>
            </Card.Text>

            <Card.Text>
              location: {offer?.location ? offer?.location : "Not provided"}
            </Card.Text>
            <Card.Text> {offer.offerType}</Card.Text>
            {manageOffer?.isOfferOwner() &&
              offer.state === OfferStatus.ON_HOLD && (
                <>
                  <OverlayTrigger
                    trigger="click"
                    placement="left"
                    overlay={popover}
                  >
                    <Button
                      size="sm"
                      variant="primary"
                      className="view-profile"
                    >
                      View client
                    </Button>
                  </OverlayTrigger>
                  <div className="d-flex justify-content-between mt-2">
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
