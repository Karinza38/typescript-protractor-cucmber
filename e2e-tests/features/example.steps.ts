import { expect } from '../config/helpers/chai-imports';
import { defineSupportCode } from 'cucumber';
import { browser, by, element } from 'protractor';

defineSupportCode(({Given, When, Then}) => {
    Given(/^I am on homepage$/, givenVisitHomepage);
     async function givenVisitHomepage(): Promise<void>{
        await browser.get('https://openweathermap.org/');
    }

    When(/^I enter "([^"]*)" as city name to search$/, searchInvalid);
     async function searchInvalid(cityName: string) {
        await element(by.xpath('//*[@placeholder="Your city name"]')).sendKeys(cityName);
        await element(by.css('button.btn.btn-orange')).click();
      }

    When(/^I click on "([^"]*)" from navigation menu$/,verifyNavigationbar);
     async function verifyNavigationbar(menuItem: string){
        await element(by.xpath(`//a[@href='/${menuItem}']`)).click();
     }

    Then(/^I verify url to have "([^"]*)"$/,verifyUrlToHave);
    async function verifyUrlToHave(menuItem: string){
        browser.getCurrentUrl().then((url: string) => {
            expect(url).to.have(menuItem);
        })
    }

    Then(/^I verify "([^"]*)" message is shown$/, verifyCityNotFound);
     async function verifyCityNotFound(errorMessage: string) {
        await element(by.className('alert alert-warning')).getText().then((text) => {
            expect(text).to.be.contain(errorMessage);
        });
    }

    Then(/^I verify searched city "([^"]*)" is shown$/, verifyCityFound);
     async function verifyCityFound(cityName: string) {
        await element(by.xpath("//*[@id='forecast_list_ul']/descendant::a[contains(@href,'city')]")).getText().then((text) => {
            expect(text).to.be.contain(cityName);
        });
    }

});