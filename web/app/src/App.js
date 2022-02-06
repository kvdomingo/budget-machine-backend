import React from "react";
import { MDBContainer as Container } from "mdbreact";
import { CookiesProvider } from "react-cookie";
import LoggedInHomeView from "./components/home/LoggedInHomeView";

export default function App() {
  const token = localStorage.getItem("bm-token") || "bm-token";

  return (
    <CookiesProvider>
      <Container className="py-5">{token ? <LoggedInHomeView /> : null}</Container>
    </CookiesProvider>
  );
}
