import React from "react";
import { ToastContainer, Toast } from "react-bootstrap";
import { IMyToast } from "../../models/MyToast";
import { getCurrentTime } from "../../utils/utils";
import "./MyToastComponent.scss";

function MyToastComponent({ myToast, setMyToast }: IMyToast) {
  return (
    <ToastContainer className="p-3 my-toast-container">
      <Toast
        delay={5000}
        autohide
        show={myToast?.show}
        onClose={() => setMyToast({ show: !myToast?.show })}
        bg={myToast?.background}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{myToast?.title}</strong>
          <small>{getCurrentTime()}</small>
        </Toast.Header>
        <Toast.Body>{myToast?.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default MyToastComponent;
