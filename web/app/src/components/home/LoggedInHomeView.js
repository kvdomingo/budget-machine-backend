import React, { useState, useEffect } from "react";
import { MDBRow as Row, MDBCol as Col } from "mdbreact";
import Calendar from "./Calendar";
import Today from "./Today";
import MonthSummary from "./MonthSummary";
import api from "../../utils/Endpoints";

export default function LoggedInHomeView() {
  const [calendar, setCalendar] = useState({ data: {}, loading: true });
  const [incomeExpense, setIncomeExpense] = useState({ data: [], loading: true });
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  const handleChangeSelectedDay = (e, day) => {
    setSelectedDay(day);
  };

  useEffect(() => {
    api.data
      .getCalendar()
      .then(res => setCalendar({ data: res.data, loading: false }))
      .catch(err => console.error(err.message));
  }, []);

  useEffect(() => {
    api.data
      .getIncomesExpenses()
      .then(res => setIncomeExpense({ data: res.data, loading: false }))
      .catch(err => console.error(err.message));
  }, []);

  return (
    <Row>
      <Col xl={7}>
        <Today incomeExpense={incomeExpense} selectedDay={selectedDay} />
      </Col>
      <Col xl={5}>
        <Calendar
          calendar={calendar}
          handleChangeSelectedDay={handleChangeSelectedDay}
          selectedDay={selectedDay}
          incomeExpense={incomeExpense}
        />
        <MonthSummary incomeExpense={incomeExpense} calendar={calendar} />
      </Col>
    </Row>
  );
}
