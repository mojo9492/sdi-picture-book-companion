
describe("my first test", () => {
    beforeEach(() => {

        cy.visit('http://localhost:3000/');
        cy.url().should('contains', 'http://localhost:3000/');
    });

    it('Searches for item, then edits and verified edited item', () => {
        cy.get('[data-cy="dropdown-menu"]')
            .select('nomenclature')
        
        cy.get('[data-cy="search-input"]')
           .type('cat')

        cy.get('[data-cy="submit-button"]')
            .as('submit')

        cy.get('@submit')
            .click({force: true})

        cy.url().should('eq', 'http://localhost:3000/search?type=nomenclature&nomenclature=cat')
        
        cy.get('[data-cy="edit-button"]')
            .click({force: true})

        cy.get('[data-cy="edit-nomenclature"]')
            .click({force: true})

            .type('zach')
        cy.get('[data-cy="edit-submit-button"]') 
            .click({force: true})

        cy.url().should('eq', 'http://localhost:3000/')
            
        cy.get('[data-cy="dropdown-menu"]')
            .select('nomenclature')
        
        cy.get('[data-cy="search-input"]')
           .type('cat')

        cy.get('[data-cy="submit-button"]')
            .click({force: true})

        cy.get('[data-cy="result-nomenclature"]')
            .invoke('text')
            .should('equal', 'cat')

        })
    });

// data-cy='search-results' container that hold array of items
// data-cy='result-item' individual item to render
// data-cy='edit-item-modal' modal