import React, { useState, useEffect } from "react";
import { Row, Col, Loading, Text } from "@geist-ui/react";
import { axiosInstance as axios } from "../axiosInstance";

export default function Calendar() {
  let [calendar, setCalendar] = useState({});
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("calendar")
      .then(res => setCalendar(res.data))
      .catch(err => console.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <Loading size="large" />
  ) : (
    <>
      <Text h1>
        {calendar.monthNames[calendar.monthIndex]} {calendar.year}
      </Text>
      <Row>
        {calendar.dayNames.map(day => (
          <Col>{day}</Col>
        ))}
      </Row>
      {calendar.month.map(week => (
        <Row>
          {week.map(day => (
            <Col>{day === 0 ? null : day}</Col>
          ))}
        </Row>
      ))}
    </>
  );
}
