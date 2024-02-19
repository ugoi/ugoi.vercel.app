import { render } from "@testing-library/react";
import Home from "./Home";
import { test } from "vitest";

test("Home is rendered", () => {
  render(<Home />);
});
