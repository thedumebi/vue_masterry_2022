// https://docs.cypress.io/api/table-of-contents

describe("Sanity Test", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "Listen to Great Music!");
  });
});
