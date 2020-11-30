import React from "react";
import { MDBContainer as Container } from "mdbreact";
import LoggedInHomeView from "./components/Home/LoggedInHomeView";

export default function App() {
  const token = localStorage.getItem("bm-token") || "bm-token";

  return <Container className="py-5">{token ? <LoggedInHomeView /> : null}</Container>;
}
