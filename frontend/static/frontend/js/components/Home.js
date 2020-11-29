import React, { useState, useEffect } from "react";
import { Grid } from "@geist-ui/react";
import parse from "html-react-parser";
import { axiosInstance as axios } from "./axiosInstance";

export default function Home() {
  let [days, setDays] = useState("");

  useEffect(() => {
    axios
      .get("day-names")
      .then(res => setDays(res.data))
      .catch(err => console.error(err.message));
  });

  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={18}>{parse(days)}</Grid>
    </Grid.Container>
  );
}
