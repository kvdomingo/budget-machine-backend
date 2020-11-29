import React from "react";
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import LoggedInHomeView from "./components/Home/LoggedInHomeView";

export default function App() {
  return (
    <GeistProvider>
      <CssBaseline />
      <LoggedInHomeView />
    </GeistProvider>
  );
}
