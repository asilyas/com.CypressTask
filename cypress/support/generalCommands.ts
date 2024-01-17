import { youtubePage } from "../support/youTubeSelector";
export { }
declare global {
    namespace Cypress {
        interface Chainable {
            clickk(selector: string): Chainable<void>
            clickByText(selector: string): Chainable<void>
            visibleByText(text: string): Chainable<void>
            assertUrl(pathParam: string): Chainable<void>
            sendKeys(selector,data: string): Chainable<void>
            assertGetByText(selector,text: string): Chainable<void>
            likeButtonAssert():Chainable<void>
            subscribersAssert():Chainable<void>
            adsCountAssert():Chainable<void>
            randomVideoSelect():Chainable<void>
            randomVideoAssert():Chainable<void>
            visible(selector:string): Chainable<void>
            amazonsearch(productName:string):Chainable<void>
           
        }
    }
}
Cypress.Commands.add('clickk', (selector) => {
    cy.get(selector)
        .should('be.visible')
        .click()
})
Cypress.Commands.add('clickByText', (text) => {
    cy.contains(text)
        .click({ force: true })
})
Cypress.Commands.add("visibleByText",(text)=>{
    cy.contains(text,{timeout:25000})
    .should('be.visible')
})
Cypress.Commands.add('assertUrl',(pathParam)=>{
    cy.url().should('include',pathParam)      
})

Cypress.Commands.add('sendKeys',(selector,data)=>{
    cy.get(selector).should('exist').should('be.visible').type(data).should('have.value',data)
})

Cypress.Commands.add('assertGetByText',(selector,text)=>{
    cy.get(selector).should('contain',text)
})
Cypress.Commands.add('likeButtonAssert',()=>{
    cy.get(youtubePage.likeButton)
            .first()
            .invoke('text').then((textContent) => {
                
                const numberValue = parseInt(textContent);
                
                cy.wrap(numberValue).should('be.gt', 10);
            });
})
Cypress.Commands.add('subscribersAssert',()=>{
    cy.get(youtubePage.subscribers)
            .invoke('text').then((textContent) => {
                
                const numberValue = parseInt(textContent);
                
                cy.wrap(numberValue).should('be.lt', 1000);
            });
})
Cypress.Commands.add('adsCountAssert',()=>{
    cy.get(youtubePage.adsCount).then(($currentTime) => {

        const currentTime = parseFloat($currentTime.text().replace(':', '.'));
        expect(currentTime).to.be.closeTo(0, 2); 
    });
})
let elementText;
Cypress.Commands.add('randomVideoSelect',()=>{
    
        cy.get(':nth-child(18) > #dismissible > .details > .metadata > .yt-simple-endpoint > h3.style-scope > #video-title')
            .invoke('text')
            .then((text) => {
                elementText = text.trim();
                cy.log('Alinan text:', elementText);
            });
        cy.get(':nth-child(18) > #dismissible > .details > .metadata > .yt-simple-endpoint > h3.style-scope > #video-title').click()
})
Cypress.Commands.add('randomVideoAssert',()=>{
    let element2Text
        cy.get('#above-the-fold > :nth-child(1) > h1.style-scope > .style-scope')
            .invoke('text')
            .then((text) => {
                element2Text = text.trim();
                cy.log('Alinan text:', element2Text);
                expect(elementText).to.eq(element2Text)
            });
})
Cypress.Commands.add('visible',(selector)=>{
    cy.get(selector).should('be.visible')
})


Cypress.Commands.add('amazonsearch',(productName)=>{
    cy.visit('https://www.amazon.com')
    cy.get('#twotabsearchtextbox').type(productName)
    cy.get('#nav-search-submit-button').click()
    cy.get('#twotabsearchtextbox').should('have.value',productName)

})