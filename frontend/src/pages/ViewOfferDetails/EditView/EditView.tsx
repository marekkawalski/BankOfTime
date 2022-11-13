import './EditView.scss';

import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import NoEditView from '../NoEditView/NoEditView';
import EditOffer from './EditOffer/EditOffer';
import { EditViewProps } from './types';

function EditView({ offer }: EditViewProps) {
  return (
    <section id="edit-offer-section">
      <Tabs defaultActiveKey="edit" id="fill-tab-example" className="mb-3" fill>
        <Tab
          eventKey="edit"
          title="Edit"
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <EditOffer offer={offer} />
        </Tab>
        <Tab
          eventKey="preview"
          title="Preview"
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <NoEditView offer={offer} />
        </Tab>
      </Tabs>
    </section>
  );
}

export default EditView;
