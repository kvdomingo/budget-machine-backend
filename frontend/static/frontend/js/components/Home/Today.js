import React, { useEffect, useState } from "react";
import {
  MDBTypography as Type,
  MDBListGroup as ListGroup,
  MDBListGroupItem as ListGroupItem,
  MDBCol as Col,
  MDBRow as Row,
  MDBIcon as Icon,
  MDBBtn as Button,
} from "mdbreact";
import dateFormat from "dateformat";
import { axiosInstance } from "../axiosInstance";

export default function Today(props) {
  const todayHeader = dateFormat(new Date(), "dddd, d mmmm yyyy");

  let [incomeExpense, setIncomeExpense] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("income-expense")
      .then(res => setIncomeExpense(res.data))
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <div className="spinner-grow spinner-grow-sm" />
  ) : (
    <>
      <Type tag="h1" variant="h2" className="mb-4">
        {todayHeader}
      </Type>
      <div className="btn btn-outline-black btn-sm mb-4">Create category</div>
      <ListGroup>
        {incomeExpense
          .filter(obj => obj.type === "Expense")
          .map(obj => (
            <ListGroupItem>
              <Row>
                <Col md={2} className="text-uppercase">
                  <code>
                    <small>{obj.category}</small>
                  </code>
                </Col>
                <Col md={6}>{obj.description}</Col>
                <Col md={2} className="text-left text-md-right">
                  <code>{obj.amount}</code>
                </Col>
                <Col md={2} className="text-right">
                  <div className="btn p-1 kill-shadow m-0">
                    <Icon far icon="edit" size="1x" />
                    <Icon far icon="trash-alt" size="1x" className="ml-2" />
                  </div>
                </Col>
              </Row>
            </ListGroupItem>
          ))}
        <ListGroupItem>
          <div className="btn border-light kill-shadow text-center h-100 w-100 m-0 p-0">
            <Icon fas icon="plus" size="lg" />
          </div>
        </ListGroupItem>
      </ListGroup>
    </>
  );
}
