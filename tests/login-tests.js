var LFT = require("leanft");
var Web = LFT.Web;
var whenDone = LFT.whenDone;
var expect = require("leanft/expect");
var verify = require("leanft/verify");
//var URL="http://192.168.99.100:32768/";
var URL="http://"+(process.env.APPURL|| "aut:5000")+"/";
console.log("url is:"+URL);
describe("login tests",function(){
	this.timeout(2*60*1000);
	var browser;
	var registeredUser;
	beforeEach(function(done){
		setTimeout(function (){
		LFT.init();
		Web.Browser.launch("chrome").then(function(resBrowser){
			browser = resBrowser;
		});
		whenDone(done);
	},2000);
	});

	var getRandomIntInclusive = function(min, max) {
  		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	it("should provide the ability to register to as new user",function(done){
		browser.navigate(URL);
		browser.$(Web.Link({
			tagName: "a",
			innerText: /I need an account/
		})).click();

		registeredUser = "LeanFT_Demo_" + getRandomIntInclusive(1,1000);
		browser.$(Web.Edit({
			type: "text",
			placeholder: "Username",
		})).setValue(registeredUser);

		browser.$(Web.Edit({
			name:"email"
		})).setValue( registeredUser + "@default.com");

		browser.$(Web.Edit({
			name:"display-name"
		})).setValue("LeanFT_Demo");

		browser.$(Web.Edit({
			name: "first-name"
		})).setValue("LeanFT");

		browser.$(Web.Edit({
			name: "first-name"
		})).setValue("LeanFT");

		browser.$(Web.Edit({
			name: "last-name"
		})).setValue("Demo");

		browser.$(Web.Edit({
			name: "password",
			index: 1
		})).setValue("W3lcome1");

		browser.$(Web.Edit({
			name: "password-confirm",
		})).setValue("W3lcome1");

		browser.$(Web.Button({
			tagName: "BUTTON",
			name: /Register/
		})).click();

		whenDone(done);
	});

	it("should allow registered users to login",function(done){
		
		browser.navigate(URL);

		browser.$(Web.Edit({
			placeholder: "Username or Email"
		})).setValue(registeredUser);
		browser.$(Web.Edit({
			name: "password",
			index: 0
		})).setValue("W3lcome1");
		browser.$(Web.Button({
			tagName: "BUTTON",
			name: /Sign in/
		})).click();

		//cehck for the display name
		var displayName = browser.$(".lcb-account-button-name");
		verify(displayName.innerText()).toEqual("LeanFT_Demo")

		whenDone(done);
	
	});

	afterEach(function(done){
		// if(browser)
		// 	browser.close();
		LFT.cleanup();
		whenDone(done);
	});
});
