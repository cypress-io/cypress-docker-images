describe('test local demo page', () => {
  it('heading', () => {
    cy.visit('index.html')
    cy.contains('h2', 'Test')
    cy.screenshot()
  })
})
