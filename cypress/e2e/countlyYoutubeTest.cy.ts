
const countly = require("../fixtures/countly.json")
import { youtubePage } from "../support/youTubeSelector";
describe('Countly youTube Test', () => {

    beforeEach(() => {
        // Go to URL select Countly video
        cy.visit(countly.url)  
        cy.sendKeys(youtubePage.searchBox, countly.Countly) 
        cy.wait(8000)
        cy.clickk(youtubePage.searchButton) 
        cy.clickk(youtubePage.countlyVideo) 

    });

    it('TC01 Verify the video URL', () => {
        cy.assertUrl(countly.pathParam) 
    });

    it('TC02 Verify the video title name', () => {
        cy.wait(6000)
        cy.assertGetByText(youtubePage.videoName, countly.videoNameText) 
        
    });

    it('TC03 Verify the video upload date', () => {
        cy.clickk(youtubePage.seeMoreButton)
        cy.assertGetByText(youtubePage.uploadDate, countly.uploadDateText) 
        
    });

    it('TC04 Verify the video owner name', () => {
        cy.assertGetByText(youtubePage.videoOwnerName, countly.videoOwnerText) 

    });

    it('TC05 Verify the number of like more than 10', () => {
        cy.likeButtonAssert()
        
    });

    it('TC06 Verify the  number of subscribers is less than 1000', () => {
        cy.wait(5000)
        cy.subscribersAssert()

    });

    it('TC07 Verify  advertisement content countdown', () => {
        cy.wait(3000)
        cy.adsCountAssert()
        cy.visibleByText('Atla')
        cy.clickByText('Atla')

    });

    it('TC08 Verify the video stopped', () => {
        cy.clickk(youtubePage.pauseButton)
        cy.contains('Oynat (k)').should('exist')

    });

    it('TC09 Verify the page header is fixed at the top', () => {
        cy.scrollTo('bottom');
        cy.visible(youtubePage.youtubeLogo)
        
    });

    it('TC10 Verify the selected random video name', () => {
        cy.wait(3000)
        cy.randomVideoSelect()
        cy.wait(3000)
        cy.randomVideoAssert()

    });
});