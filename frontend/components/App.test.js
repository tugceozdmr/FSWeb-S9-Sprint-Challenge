import React from "react";
import {
  fireEvent,
  getByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import AppFunctional from "./AppFunctional";

// Write your tests here

// let email, submit;

// const gerekliDegiskenler = () => {
//   email = screen.getByTestId("email-input");
//   submit = screen.getByTestId("submit-button");
// };

test("hata olmadan render ediliyor", () => {
  render(<AppFunctional />);
});

test("kullanıcı email girebiliyor", () => {
  render(<AppFunctional />);
  const email = screen.getByTestId("email-input");
  fireEvent.change(email, { target: { value: "aaa@gmail.com" } });
  expect(email.value).toBe("aaa@gmail.com");
});

test("aşağı butonu çalışıyor ve hata geliyor", () => {
  render(<AppFunctional />);
  const dbutton = screen.getByTestId("down-button");
  fireEvent.click(dbutton);
  fireEvent.click(dbutton);
  expect(screen.getByText("Aşağı gidemezsiniz.")).toBeInTheDocument();
});
test("yukarı butonu çalışıyor ve hata geliyor", () => {
  render(<AppFunctional />);
  const upbutton = screen.getByTestId("up-button");
  fireEvent.click(upbutton);
  fireEvent.click(upbutton);
  expect(screen.getByText("Yukarı gidemezsiniz.")).toBeInTheDocument();
});
test("sağa gitme butonu çalışıyor ve hata geliyor", () => {
  render(<AppFunctional />);
  const rbutton = screen.getByTestId("right-button");
  fireEvent.click(rbutton);
  fireEvent.click(rbutton);
  expect(screen.getByText("Sağa gidemezsiniz.")).toBeInTheDocument();
});

test("sola gitme butonu çalışıyor ve hata geliyor", () => {
  render(<AppFunctional />);
  const lbutton = screen.getByTestId("left-button");
  fireEvent.click(lbutton);
  fireEvent.click(lbutton);
  expect(screen.getByText("Sola gidemezsiniz.")).toBeInTheDocument();
});