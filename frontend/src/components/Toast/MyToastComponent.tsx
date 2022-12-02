import './MyToastComponent.scss';

import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

import { useMyToast } from '../../context/ToastContext';
import { getCurrentTime } from '../../utils/getCurrentTime';

function MyToastComponent() {
  const toast = useMyToast();
  return (
    <ToastContainer className="p-3 my-toast-container">
      <Toast
        delay={5000}
        autohide
        show={toast?.get.show}
        onClose={() => toast?.set({ show: !toast.get?.show })}
        bg={toast?.get.background}
      >
        <Toast.Header>
          <strong className="me-auto">{toast?.get.title}</strong>
          <small>{getCurrentTime()}</small>
        </Toast.Header>
        <Toast.Body>{toast?.get.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default MyToastComponent;
