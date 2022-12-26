import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import NoEditView from '../NoEditView/NoEditView';
import EditProfile from './EditProfile/EditProfile';

function EditView() {
  return (
    <section id="edit-offer-section">
      <Tabs defaultActiveKey="edit" id="fill-tab-example" className="mb-3" fill>
        <Tab eventKey="edit" title="Edit">
          <EditProfile />
        </Tab>
        <Tab
          eventKey="preview"
          title="Preview"
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <NoEditView />
        </Tab>
      </Tabs>
    </section>
  );
}

export default EditView;
