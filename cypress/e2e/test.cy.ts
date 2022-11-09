describe('empty spec', () => {
  it('passes', () => {
    cy.visit('/')
    cy.contains('로그인');
  });
})