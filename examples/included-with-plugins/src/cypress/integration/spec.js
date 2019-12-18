import { onlyOn, skipOn } from '@cypress/skip-test'

onlyOn('linux', () => {
  describe('linux tests', () => {
    it('has h2', () => {
      cy.visit('index.html')
      cy.contains('h2', 'test')
    })
  })
})

skipOn('linux', () => {
  describe('Tests on Mac or Windows', () => {
    it('has h2', () => {
      cy.visit('index.html')
      cy.contains('h2', 'test')
    })
  })
})
