# NodeJS-Payture-official

This is Offical Payture API for NodeJS. To get started you will need a Merchant account, please contact our support to get one. Here you can explore how to use our API functions! GO!

## Install
Simple to install:  
```npm
npm install payture-official
```
And include to your project:
```javascript
var payture = require('payture-official');
```


## Payture API tutorial
You can use one or all of follows API:

 * [Payture API](#API)
 * [Payture InPay](#InPay)
 * [Payture eWallet](#eWallet)
 * [Payture ApplePay](#ApplePay)

### General information
#### Callback function
Every API function received callback function as second parameter. You need to provide callback for taking required action after receiving a response from the server. 
The callback accepts 4 parameters:
```javascript
var callbackFunc = function(error, response, body, responseObject){
    // do some work with received arguments....
};
```
* *error* - if no one error occurs when handing request the value of this parameter will be null, otherwise - in case of error - the value is the error;
* *response* - the raw response from the external server;
* *body* - body of the received response;
* *responseObject* - this is body of the response as js object;


#### API Initialization
For create instanse of required API you need provide the name of Host and params of your Merchant account (Key and Password).

**HOST**

Pass the 'https://sandbox.payture.com' for test as the name of Host (first parameter).

**Merchant**

Params of Merchant account provide as the second parameter for constructor function in simple object, like: { Key: 'Merchant', Password: 123 };
Examples you can see below.

## Payture API <a id="API"></a>
For use this you need create instanse of PaytureAPI object. Example:
```javascript
var api = new payture.Api('https://sandbox.payture.com', { Key : 'Merchant', Password : 123 });
```
### API Functions:
All functions taking 2 parameters: first -  required for request data as js object, second - callback function that you need specify. The functions list and examples of usage below. Let's go to explore!
* pay
```javascript
var data = {
    OrderId : 'ORD00000000000000001',
    Amount : 10000,
    PAN : '4111111111111112',
    EMonth : 12,
    EYear : 20,
    CardHolder : 'Vasya Petrov',
    SecureCode : 123,
    CustomerKey : 'testCustomer',
    CustomFields : {},
};
api.pay(data, callbackFunc);
```
Description of provided params.

| Parameter's name | Definition                                                        |
| ---------------- | ----------------------------------------------------------------- |
| OrderId          | Payment identifier in your service system.                        |
| Amount           | Amount of payment kopec.                                          |
| PAN              | Card's number.                                                    |
| EMonth           | The expiry month of card.                                         |
| EYear            | The expiry year of card.                                          |
| PAN              | extension to be used for dest files.                              |
| CardHolder       | Card's holder name.                                               |
| SecureCode       | CVC2/CVV2.                                                        |
| CustomerKey      | Customer identifier in Payture AntiFraud system.                  |
| CustomFields     | Addition fields for processing (especially for AntiFraud system). |

* block
* charge
* refund
* unblock
* getState

***
## Payture InPay <a id="InPay"></a>
For use this API just create instanse of PaytureInPay object:
```javascript
var api = new payture.InPay('https://sandbox.payture.com', { Key : 'Merchant', Password : 123 });
```
### API Functions:
* init
* pay
* charge
* refund
* unblock
* payStatus

***

## Payture eWallet <a id="eWallet"></a>
For use this API just create instanse of PaytureEWallet object:
```javascript
var api = new payture.EWallet('https://sandbox.payture.com', { Key : 'VWMerchant', Password : 2645363 });
```

### API Functions:
#### Payment functions:
* init
* payOnMerchantSideForRegCard
* payOnMerchantSideForNoRegCard
* payOnPaytureSide
* charge
* refund
* unblock
* payStatus
* sendCode

#### Customer functions:
* registerCustomer
* deleteCustomer
* updateCustomer
* checkCustomer

#### Card functions:
* addCardOnMerchantSide
* addCardOnPaytureSide
* activateCard
* removeCard
* getCardList
***

## Payture ApplePay <a id="ApplePay"></a>
For use this API just create instanse of PaytureAppleApi object:
```javascript
var api = new payture.ApplePay('https://sandbox.payture.com', { Key : 'VWMerchant', Password : 2645363 });
```
### API Functions:
* pay
* block

***


Visit our [site](http://payture.com/) for more information.
You can find our contact [here](http://payture.com/kontakty/).