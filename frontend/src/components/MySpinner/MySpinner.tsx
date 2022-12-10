import './MySpinner.scss';

import { Spinner } from 'react-bootstrap';

import { MySpinnerProps } from './types';

function MySpinner({ show, children }: MySpinnerProps) {
  return (
    <>
      {show ? (
        <div className="my-spinner-container">
          <Spinner animation="border" className="my-spinner" />
        </div>
      ) : (
        children
      )}
    </>
  );
}

export default MySpinner;
