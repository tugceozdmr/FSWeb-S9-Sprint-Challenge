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
  const email = screen.getByTestId("email");
  fireEvent.change(email, { target: { value: "abc@hotmail.com" } });
  expect(email.value).toBe("abc@hotmail.com");
});

test("aşağı butonu çalışıyor ve hata geliyor", () => {
  render(<AppFunctional />);
  const dobutton = screen.getByTestId("down-butt");
  fireEvent.click(dobutton);
  fireEvent.click(dobutton);
  expect(screen.getByText("Aşağı gidemezsiniz.")).toBeInTheDocument();
});
test("yukarı butonu çalışıyor ve hata geliyor", () => {
  render(<AppFunctional />);
  const upbutton = screen.getByTestId("up-but");
  fireEvent.click(upbutton);
  fireEvent.click(upbutton);
  expect(screen.getByText("Yukarı gidemezsiniz.")).toBeInTheDocument();
});
test("sağa gitme butonu çalışıyor ve hata geliyor", () => {
  render(<AppFunctional />);
  const rbutton = screen.getByTestId("right-butt");
  fireEvent.click(rbutton);
  fireEvent.click(rbutton);
  expect(screen.getByText("Sağa gidemezsiniz.")).toBeInTheDocument();
});

test("sola gitme butonu çalışıyor ve hata geliyor", () => {
  render(<AppFunctional />);
  const lbutton = screen.getByTestId("left-butt");
  fireEvent.click(lbutton);
  fireEvent.click(lbutton);
  expect(screen.getByText("Sola gidemezsiniz.")).toBeInTheDocument();
});