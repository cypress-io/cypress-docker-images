describe("page", () => {
  beforeEach(() => {
    cy.visit("index.html")
  })

  it("has h2", () => {
    cy.contains("h2", "test")
  })
})
