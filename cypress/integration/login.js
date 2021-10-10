

describe('login and sign up',function(){
    Cypress.on('uncaught:exception', (err, runnable) => {   //exception handling -uncaught:exception
        // returning false here prevents Cypress from
        // failing the test
        return false
        });

        let email = (Math.random() + 1).toString(36).substring(7); //  javascript generate random string 
        let password = (Math.random() + 1).toString(36).substring(7);  // javascript generate random string 
    

it ('verify login functionality',()=>{

    cy.visit('/#/register')
    cy.get('.close-dialog').click()
    cy.get('#emailControl').type(`amola91193${email}@gmail.com`)
    cy.get('#passwordControl').type(`Amola@12345${password}`)
    cy.get('#repeatPasswordControl').type(`Amola@12345${password}`)
    cy.get('#mat-slide-toggle-1').click()
    cy.get('#mat-select-0 > div > div.mat-select-arrow-wrapper.ng-tns-c142-11 > div').click()
    cy.get('.mat-option-text').eq(3).click()
    cy.get('.security-container > .mat-form-field-type-mat-input > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type('12 sep')
   cy.get('#registerButton > .mat-button-wrapper').click() 
    cy.contains("Registration completed successfully. You can now log in.")
})



it('verify  the sign in functionality',()=>{
    cy.visit('/#/login')
    cy.get('.close-dialog').click()
    cy.get('#email').type(`amola91193${email}@gmail.com`)
    cy.get('#password').type(`Amola@12345${password}`)
    cy.get('#loginButton').click()
    cy.get('.fa-layers-counter').contains('0')

})

it.only('verify  the Login in functionality',()=>{

    let payload = {"email": "amola91193@gmail.com", "password": "Amola@12345"}

    cy.request({
     
        method:"post",
        url:"http://localhost:3000/rest/user/login",
        body:payload,

    }).then(function(response){

        expect(response.status).to.eq(200)
        //cy.log(response.body.authentication.token)// to get token
       cy.visit('http://localhost:3000/#/search')
       window.localStorage.setItem('token', response.body.authentication.token)

       }) 


})
})
