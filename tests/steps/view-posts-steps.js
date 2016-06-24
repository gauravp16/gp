var chai = require('chai');
var EC = protractor.ExpectedConditions;

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;


var steps = function() {

  this.Given(/^I am on the homepage$/, function(callback) {
    browser.get('http://localhost:9000');
    callback();
  });

  this.Then(/^I should see nav bar option "([^"]*)"$/, {timeout: 20000}, function (arg1, callback) {
    element.all(by.css('.nav li')).filter(function(elem, index) {
      return elem.getText().then(function(text) {
        return text === arg1;
      });
    }).then(function(filteredElements) {
        expect(filteredElements).to.have.length(1);
        callback();
    });
  });

  this.When(/^I click nav bar option "([^"]*)"$/, {timeout: 20000}, function (arg1, callback) {
    element.all(by.css('.nav li')).filter(function(elem, index) {
      return elem.getText().then(function(text) {
        return text === arg1;
      });
    }).then(function(filteredElements) {
        filteredElements[0].click();
        callback();
    });
  });

  this.Then(/^I should see all the projects$/, {timeout: 20000}, function (callback) {
    expect(element(by.css('projects'))).to.not.be.null;
    var projectElements = element.all(by.repeater('project in projects'));
    expect(projectElements).to.eventually.have.lengthOf(2);
    callback();
  });

  this.Then(/^I should see project title$/, {timeout: 20000}, function (callback) {
    element.all(by.repeater('project in projects')).then(function(projects)
    {
      var projectTitle = projects[0].element(by.binding('project.title'));
      expect(projectTitle.getText()).to.eventually.equal('Simple JS State Machine');
      
      projects[0].element(by.binding('project.url')).click().
        then(function(){
          assert.isOk('link', 'link is clickable');
        });
      
      callback();
    });
  });

  this.Then(/^I should see all the posts$/, {timeout: 20000}, function (callback) {
    expect(element(by.css('posts'))).to.not.be.null;
    var postElements = element.all(by.repeater('post in posts'));
    expect(postElements).to.eventually.have.lengthOf(1);
    callback();
  });

  this.Then(/^I should see post title$/, {timeout: 20000}, function (callback) {
    element.all(by.repeater('post in posts')).then(function(posts){
      var postTitle = posts[0].element(by.binding('post.title'));
      expect(postTitle.getText()).to.eventually.equal('Hello tests');
    });

    callback();
  });

  this.Then(/^I should be able to click on it to view the post$/, {timeout: 20000}, function (callback) {
    element.all(by.repeater('post in posts')).then(function(posts){
      posts[0].element(by.partialLinkText('Hello tests')).click().
        then(function(){
          browser.getCurrentUrl().then(function(url){
            expect(url).to.contain('#/post/');
          });
          callback();
        });
    });
  });

  this.When(/^I open a post$/, {timeout: 20000}, function(callback) {
    element.all(by.repeater('post in posts')).then(function(posts){
      posts[0].element(by.partialLinkText('Hello tests')).click().
        then(function(){
          callback();
        });
    });
  });
  
  this.When(/^I authenticate with Google$/, {timeout: 200000}, function(callback) {
    element(by.css('.btn-google')).click();
    browser.getAllWindowHandles().then(function (handles) {
      // switch to the popup
      browser.switchTo().window(handles[1]);
      var emailInput = browser.driver.findElement(by.id('Email'));      
      emailInput.sendKeys('user').then(function(){
        browser.driver.findElement(by.id('next')).click().then(function(){
          browser.driver.sleep(1500);
          browser.driver.findElement(by.id('Passwd')).sendKeys('1234').then(function(){
            browser.driver.findElement(by.id('signIn')).click().then(function(){
              browser.driver.sleep(2000);
              browser.driver.findElement(by.id('submit_approve_access')).click().then(function(){
                browser.driver.sleep(1500);
                browser.switchTo().window(handles[0]);
                callback();  
              });
            });      
          });      
        });
      });
    });
  });

  this.Then(/^the submit button should be enabled$/, {timeout: 20000},function(callback) {
    browser.waitForAngular();
    expect(element(by.buttonText('Submit')).isDisplayed()).to.eventually.be.true;
    callback();
  });

  this.When(/^I enter comment as "([^"]*)"$/, {timeout: 200000}, function (arg1,callback) {
    element(by.model('response')).sendKeys(arg1);
    callback();
  });

  this.When(/^I save the comment$/, {timeout: 200000}, function (callback) {
    //browser.driver.sleep(2000);
    var submit = element(by.buttonText('Submit'));
    browser.wait(EC.presenceOf(submit), 10000);
    
    submit.isPresent().then(function(){
      submit.click();      
      callback();
    });
  });

  this.Then(/^the comment should be saved successfully$/, {timeout: 200000}, function (callback) {
    browser.waitForAngular();
    element.all(by.repeater('comment in postComments')).then(function(comments){
      expect(comments).to.have.lengthOf(1);
      //expect(comments[0].element(by.binding('comment.body')))
      callback();
    });
  });
  
};

module.exports = steps;