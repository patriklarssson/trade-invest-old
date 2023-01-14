describe('components-ui: ComponentsUi component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=componentsui--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to ComponentsUi!');
    });
});
