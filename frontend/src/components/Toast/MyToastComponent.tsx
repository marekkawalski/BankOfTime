import React from "react";
import { ToastContainer, Toast } from "react-bootstrap";
import { getCurrentTime } from "../../utils/utils";
import "./MyToastComponent.scss";
import { MyToastComponentProps } from "./types";

function MyToastComponent({ myToast, setMyToast }: MyToastComponentProps) {
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
