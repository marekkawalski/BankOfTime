import React from 'react';
import { useParams } from 'react-router-dom';

function ViewOfferDetails() {
  const params = useParams();
  console.log(params.id);
  return <div>ViewOfferDetails</div>;
}

export default ViewOfferDetails;
