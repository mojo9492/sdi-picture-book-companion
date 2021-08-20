
describe("my first test", () => {
    beforeEach(() => {

        cy.visit('http://localhost:3000/');
        cy.url().should('contains', 'http://localhost:3000/');
        cy.viewport(1500, 1500)
    });

    it('Searches for item, then edits and verified edited item', () => {
        cy.get('[data-cy="dropdown-menu"]')
            .select('nomenclature')
        
        cy.get('[data-cy="search-input"]')
           .type('boot')

        cy.get('[data-cy="submit-button"]')
            .as('submit')

        cy.get('@submit')
            .click({force: true})

        cy.url().should('eq', 'http://localhost:3000/search?type=nomenclature&nomenclature=boot')
        
        cy.get('[data-cy="edit-button"]')
            .click({force: true})

        cy.get('[data-cy="edit-nomenclature"]')
            .click({force: true})
            .type('jungle boot')

        cy.get('[data-cy="edit-submit-button"]') 
            .click({force: true})

        cy.url().should('eq', 'http://localhost:3000/')
            
        cy.get('[data-cy="dropdown-menu"]')
            .select('nomenclature')
        
        cy.get('[data-cy="search-input"]')
           .type('jungle boot')

        cy.get('[data-cy="submit-button"]')
            .click({force: true})

        cy.get('[data-cy="result-nomenclature"]')
            .invoke('text')
            .should('equal', 'jungle boot')

        })

        it('Searches for item,and deletes it', () => {
            cy.get('[data-cy="dropdown-menu"]')
                .select('nomenclature')
            
            cy.get('[data-cy="search-input"]')
               .type('boot')
    
            cy.get('[data-cy="submit-button"]')
                .as('submit')
    
            cy.get('@submit')
                .click({force: true})
    
            cy.url().should('eq', 'http://localhost:3000/search?type=nomenclature&nomenclature=boot')
            
            cy.get('[data-cy="edit-submit-button"]')
                .click({force: true})

            cy.get('[data-cy="delete-submit-button"]')
                .click({force: true})
    
            cy.url().should('eq', 'http://localhost:3000/')
            
            cy.get('[data-cy="dropdown-menu"]')
                .select('nomenclature')
            
            cy.get('[data-cy="search-input"]')
               .type('boot')
    
            cy.get('[data-cy="submit-button"]')
                .click({force: true})
    
            cy.get('[data-cy="search-result"]')
                .invoke('text')
                .should('equal',"No item with 'nomenclature' 'boot' found") 
        })

        it('creates new item', () => {
            cy.get('[data-cy="add-button"]')
                .click()         
            
            cy.get('[data-cy="nomenclature-add"]')
                .type('Army Issue Combat Coat')

            cy.get('[data-cy="common-add"]')
                .type('OCP top')

            cy.get('[data-cy="NSN-add"]')
                .type('8415-01-599-0465')

            cy.get('[data-cy="description-add"]')
                .type('SMALL REGULAR')

            cy.get('[data-cy="submit-add"]')
                .click()
        })

        it('verifies item was added', () => {
            cy.get('[data-cy="search-input"]')
                .type('combat coat')

            cy.get('[data-cy="submit-button"]')
                .click({force: true})

            cy.get('[data-cy="result-common"]')
                .invoke('text')
                .should('equal',"OCP top")
        })
    });
// data-cy='search-results' container that hold array of items
// data-cy='result-item' individual item to render
// data-cy='edit-item-modal' modals