/// <reference types="cypress" />

describe('picture book companion app', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    describe('searching for items', () => {
        it('shows items after typing in the search field and selecting a query type after submission', () => {
            cy.findByRole('input', { name: /Search by/i }).type('2920-01-420-9968');
            cy.get('select').select('NSN')
            cy.findByRole('button', { name: 'Submit'}).click()
            cy.get(/Humvee Alternator \/ Generator 200 Amp/i)
        })
    });

    describe('adding an item', () => { });

    describe('deleting an item', () => { });

    describe('editing an item', () => { });
})