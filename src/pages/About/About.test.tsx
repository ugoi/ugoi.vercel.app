import { render } from "@testing-library/react";
import About from "./About";
import { test } from "vitest";

test("About is rendered", () => {
  render(<About />);
});
