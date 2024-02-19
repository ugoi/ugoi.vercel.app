// import { UgoiRouterProvider } from "./ugoi-router";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { UgoiRouterProvider } from "./ugoi-router-provider";

describe("Router tests", () => {
  test("should render the correct element for the root path", () => {
    render(<UgoiRouterProvider />);
    expect(screen.getByTestId("home-page")).toBeTruthy();
  });
});
