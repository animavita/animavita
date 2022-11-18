import React from "react";
import Header from "../header/header.component";
import { Wrapper } from "./container.styles";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Wrapper>{children}</Wrapper>
    </>
  );
}
