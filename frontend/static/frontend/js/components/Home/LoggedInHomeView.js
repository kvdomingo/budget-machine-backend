import React from "react";
import { Grid } from "@geist-ui/react";
import Calendar from "./Calendar";

export default function LoggedInHomeView() {
  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={18}>
        <Calendar />
      </Grid>
    </Grid.Container>
  );
}
