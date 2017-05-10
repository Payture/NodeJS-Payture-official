# NodeJS-Payture-official

This is Offical Payture API for NodeJS. To get started you will need a Merchant account, please contact our support to get one. Here you can explore how to use our API function! GO!

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

 * Payture API
 * Payture InPay
 * Payture eWallet
 * Payture ApplePay


## Payture API
For use this you need create instanse of PaytureAPI object and pass in the name of HOST and params of your Merchant account, like this:
```javascript
var api = new payture.Api('https://sandbox.payture.com', { Key : 'Merchant', Password : 123 });
```
### API Functions:
* pay
* block
* charge
* refund
* unblock
* getState

***
## Payture InPay
For use this API just create instanse of PaytureInPay object with the name of HOST and params of your Merchant account:
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

## Payture eWallet
For use this API just create instanse of PaytureEWallet object with the name of HOST and params of your Merchant account:
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

## Payture ApplePay
For use this API just create instanse of PaytureAppleApi object with the name of HOST and params of your Merchant account:
```javascript
var api = new payture.ApplePay('https://sandbox.payture.com', { Key : 'VWMerchant', Password : 2645363 });
```
### API Functions:
* pay
* block

***


Visit our [site](http://payture.com/) for more information.
You can find our contact [here](http://payture.com/kontakty/).