import './EditOffer.scss';

import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import NoEditOffer from '../NoEditOffer/NoEditOffer';
import EditView from './EditView/EditView';
import { EditOfferProps } from './types';

function EditOffer({ offer }: EditOfferProps) {
  return (
    <section id="edit-offer-section">
      <Tabs defaultActiveKey="edit" id="fill-tab-example" className="mb-3" fill>
        <Tab eventKey="edit" title="Edit">
          <EditView offer={offer} />
        </Tab>
        <Tab eventKey="preview" title="Preview">
          <NoEditOffer offer={offer} />
        </Tab>
      </Tabs>
    </section>
  );
}

export default EditOffer;
