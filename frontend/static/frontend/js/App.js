import React from "react";
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import Home from "./components/Home";

export default function App() {
  return (
    <GeistProvider>
      <CssBaseline />
      <Home />
    </GeistProvider>
  );
}
