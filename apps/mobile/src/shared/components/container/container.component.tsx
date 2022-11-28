import React from "react";
import { Children } from "../../types";
import Header from "../header/header.component";
import { Wrapper } from "./container.styles";

export default function Container({ children }: { children: Children }) {
  return (
    <>
      <Header />
      <Wrapper>{children}</Wrapper>
    </>
  );
}
