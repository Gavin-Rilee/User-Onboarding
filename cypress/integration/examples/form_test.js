describe('Tests app', () => {
    beforeEach(()=> {
//rbitrary code that runs 
//before each test



        cy.visit('http://localhost:3000')
    })
    //! it is a test
    it('Check to make sure this works', () => {
        //! expect is an insertion
        //! there can be several assertions per test
        
        expect(1+2).to.equal(3)
        expect(45+45).not.to.equal(33)
    })
    it("Give me the name!", () => {
        cy.get('input[name="name"]').should('exist')
        cy.get('input[name="foobar"]').should('not.exist')
    })
    it('Checking names!', () => {
        //grab the inputs
        //assert they're empty
        // type in em 
        //assert that the thing we typed is there 
        cy.get('input[name="name"]').should('have.value', "").type('Pike trickfoot').should('have.value', 'Pike trickfoot')
        // cy.get('input[name="name"]')
    })
    it('Checking emails!', () => {
        cy.get('input[name="email"]').should('have.value',"").type('gnomeilicous@gmail.com')
    })

     it('Checking password!', () => {
        cy.get('input[name="password"]').should('have.value',"").type('123456789')
    })

     it('Checking Terms Check!', () => {
        cy.get('input[name="tos"]').should('have.value','on')
    })
    
    it('Activating Submit', () => {
cy.get('button').should('be.disabled')
cy.get('input[name="name"]').type('Pike trickfoot')
cy.get('button').should('be.disabled')
cy.get('input[name="name"]').clear()
cy.get('input[name="email"]').type('gnomeilicous@gmail.com')
cy.get('button').should('be.disabled')
cy.get('input[name="name"]').clear()
cy.get('input[name="password"]').type('123456789')
cy.get('button').should('be.disabled')
cy.get('input[name="name"]').type('Pike trickfoot')
cy.get('input[name="email"]').type('gnomeilicous@gmail.com')
cy.get('input[name="tos"]').type('true')
cy.get('button').should('not.be.disabled')


    })
})