/// <reference types="cypress" />

describe("Routing e2e tests", () => {
  it("should navigate to the home page", () => {
    cy.visit("/");
    // Assert something unique about the home page
    // Check if data-testid="home" is present
    cy.get('[data-testid="home-page"]').should("exist");
    // cy.contains('Home') // Example: Check if 'Home' text is present
  });

  it("should navigate to the portfolio page", () => {
    cy.visit("/portfolio");
    // Assert something unique about the portfolio page
    cy.get('[data-testid="portfolio-page"]').should("exist");
  });

  it("should navigate to the chat page", () => {
    cy.visit("/login");
    // Assert something unique about the chat page
    cy.get('[data-testid="login-page"]').should("exist");
  });

  // Add more routes as needed
});
