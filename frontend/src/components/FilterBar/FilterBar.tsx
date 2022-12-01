import './FilterBar.scss';

import React from 'react';
import { Button, Form } from 'react-bootstrap';

import { FilterBarProps } from './types';

function FilterBar({ title }: FilterBarProps) {
  return (
    <div className="filter-bar-container">
      <h2>{title}</h2>
      <Form className="d-flex pb-3 mt-1">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
      <hr />
      <div className="filter-bar-container-child">
        <Form.Label>Sort by</Form.Label>
        <Form.Select aria-label="Default select example">
          <option value="1">newest first</option>
          <option value="2">oldest first</option>
          <option value="3">most expensive first</option>
          <option value="3">cheapest first</option>
        </Form.Select>
      </div>
      <div className="filter-bar-container-child">
        <Form.Label>Offer status</Form.Label>
        <Form.Select aria-label="Default select example">
          <option value="1">Active</option>
          <option value="2">Realized</option>
        </Form.Select>
      </div>
      <div className="filter-bar-container-child">
        <Form.Label>Offer category</Form.Label>
        <Form.Select aria-label="Default select example">
          <option value="1">Active</option>
          <option value="2">Realized</option>
        </Form.Select>
      </div>
    </div>
  );
}

export default FilterBar;
