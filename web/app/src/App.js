import React from "react";
import { MDBContainer as Container } from "mdbreact";
import LoggedInHomeView from "./components/home/LoggedInHomeView";

export default function App() {
  const token = localStorage.getItem("bm-token") || "bm-token";

  return <Container className="py-5">{token ? <LoggedInHomeView /> : null}</Container>;
}
