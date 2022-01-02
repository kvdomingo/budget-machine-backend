import React from "react";
import { MDBTypography as Type, MDBRow as Row, MDBCol as Col } from "mdbreact";
import PropTypes from "prop-types";

function MonthSummary({ calendar, incomeExpense }) {
  let expenses =
    incomeExpense.loading && calendar.loading
      ? incomeExpense.data
          .filter(
            obj =>
              obj.type === "Expense" && obj.date.split("-")[1] === calendar.data.monthIndex.toString().padStart(2, "0"),
          )
          .reduce((acc, curr) => acc + curr.amount, 0)
      : 0;
  let incomes =
    incomeExpense.loading && calendar.loading
      ? incomeExpense.data
          .filter(
            obj =>
              obj.type === "Income" && obj.date.split("-")[1] === calendar.data.monthIndex.toString().padStart(2, "0"),
          )
          .reduce((acc, curr) => acc + curr.amount, 0)
      : 0;

  return incomeExpense.loading ? (
    <div className="spinner-grow spinner-grow-sm" />
  ) : (
    <div className="mt-5">
      <Type tag="h2" variant="h2-responsive">
        Month Summary
      </Type>
      <Row className="my-2">
        <Col>
          <div className="text-success font-weight-bold">Total Income</div>
        </Col>
        <Col className="text-right">
          <code className="text-success">₱ {incomes.toFixed(2)}</code>
        </Col>
      </Row>
      <Row className="my-2">
        <Col>
          <div className="text-danger font-weight-bold">Total Expenses</div>
        </Col>
        <Col className="text-right">
          <code className="text-danger">₱ {expenses.toFixed(2)}</code>
        </Col>
      </Row>
      <Row className="my-2">
        <Col>
          <div className="text-warning font-weight-bold">Net</div>
        </Col>
        <Col className="text-right">
          <code className="text-warning">₱ {(incomes - expenses).toFixed(2)}</code>
        </Col>
      </Row>
    </div>
  );
}

MonthSummary.propTypes = {
  calendar: PropTypes.object.isRequired,
  incomeExpense: PropTypes.object.isRequired,
};

export default MonthSummary;
