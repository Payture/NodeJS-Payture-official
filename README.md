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

Params of Merchant account provide as the second parameter for constructor function in simple object, like: { Key : 'YourMerchantAccount', Password : 'YourPassword' };

Please note, that { Key : 'YourMerchantAccount', Password : 'YourPassword' } - fake account, [our support](http://payture.com/kontakty/) help you to get one!
Examples you can see below.

## Payture API <a id="API"></a>
For use this you need create instanse of PaytureAPI object. Example:
```javascript
var api = new payture.Api('https://sandbox.payture.com', { Key : 'YourMerchantAccount', Password : 'YourPassword' });
```
Please note, that { Key : 'YourMerchantAccount', Password : 'YourPassword' } - fake account, [our support](http://payture.com/kontakty/) help you to get one!

### API Functions:
All functions taking 2 parameters: first -  required for request data as js object, second - callback function that you need specify. The functions list and examples of usage below. Let's go to explore!
#### pay <a id="pay"></a>
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
| CardHolder       | Card's holder name.                                               |
| SecureCode       | CVC2/CVV2.                                                        |
| CustomerKey      | Customer identifier in Payture AntiFraud system.                  |
| CustomFields     | Addition fields for processing (especially for AntiFraud system). |

#### block
The data and description for params as the same as for [pay](#pay) function.
```javascript
api.block(data, callbackFunc);
```
#### charge <a id="charge"></a>
```javascript
var data = {
    OrderId : 'ORD00000000000000001',
    Amount : 10000
};
api.charge(data, callbackFunc);
```
Description of provided params.

| Parameter's name | Definition                                                        |
| ---------------- | ----------------------------------------------------------------- |
| OrderId          | Payment identifier in your service system.                        |
| Amount           | Amount of payment kopec.                                          |

#### refund
The data and description for params as the same as for [charge](#charge) function.
```javascript
api.refund(data, callbackFunc);
```
#### unblock
The data and description for params as the same as for [charge](#charge) function.
```javascript
api.unblock(data, callbackFunc);
```
#### getState
```javascript
var data = {
    Key : 'YourMerchantAccount',
    OrderId : 'ORD00000000000000001'
};
api.getState(data, callbackFunc);
```
Description of provided params.

| Parameter's name | Definition                                                        |
| ---------------- | ----------------------------------------------------------------- |
| Key              | YourMerchantAccount                                               |
| OrderId          | Payment identifier in your service system.                        |

***
## Payture InPay <a id="InPay"></a>
For use this API just create instanse of PaytureInPay object:
```javascript
var inpay = new payture.InPay('https://sandbox.payture.com', { Key : 'YourMerchantAccount', Password : 'YourPassword' });
```
Please note, that { Key : 'YourMerchantAccount', Password : 'YourPassword' } - fake account, [our support](http://payture.com/kontakty/) help you to get one!

### API Functions:
#### init
```javascript
var data = {
    OrderId : 'ORD00000000000000001',
    Amount : 10000,
    IP : '127.0.0.1',
    SessionType	 : 'Pay',
    Url : 'payture.com',
    TemplateTag : '',
    Language : 'RU',
    Total : 1,
    Product : 'Something'
};
inpay.init(data, callbackFunc);
```
Description of provided params.

| Parameter's name | Definition                                                        |
| ---------------- | ----------------------------------------------------------------- |
| OrderId          | Payment identifier in your service system.                        |
| Amount           | Amount of payment kopec.                                          |
| IP               | Customer's IP.                                                    |
| SessionType      | 'Pay' - for 1-stage payment, 'Block' - for 2-stage payment.       |
| Url              | The url for return customer after completion of payment.          |
| TemplateTag      | Used template.                                                    |
| Language         | Template language.                                                |

#### pay
```javascript
var sessionId = 'e5c43d9f-2646-42bc-aeec-0b9005ceb972'; //retrived from init response
inpay.pay(sessionId, callbackFunc);
```
Description of provided params.

| Parameter's name | Definition                                                        |
| ---------------- | ----------------------------------------------------------------- |
| sessionId        | Payment identifier. Given by init response                        |

#### charge <a id="chargeInpay"></a>
```javascript
var data = {
    OrderId : 'ORD00000000000000001',
    Amount : 10000,
};
inpay.charge(data, callbackFunc);
```
Description of provided params.

| Parameter's name | Definition                                                        |
| ---------------- | ----------------------------------------------------------------- |
| OrderId          | Payment identifier in your service system.                        |
| Amount           | Amount of payment kopec.                                          |

#### refund
The data and description for params as the same as for [charge](#chargeInpay) function.
```javascript
api.refund(data, callbackFunc);
```
#### unblock
The data and description for params as the same as for [charge](#chargeInpay) function.
```javascript
api.unblock(data, callbackFunc);
```
#### payStatus
```javascript
var orderId : 'ORD00000000000000001';
inpay.payStatus(orderId, callbackFunc);
```
Description of provided params.

| Parameter's name | Definition                                                        |
| ---------------- | ----------------------------------------------------------------- |
| OrderId          | Payment identifier in your service system.                        |
***

## Payture eWallet <a id="eWallet"></a>
For use this API just create instanse of PaytureEWallet object:
```javascript
var ew = new payture.EWallet('https://sandbox.payture.com', { Key : 'YourMerchantAccount', Password : 'YourPassword' });
```
Please note, that { Key : 'YourMerchantAccount', Password : 'YourPassword' } - fake account, [our support](http://payture.com/kontakty/) help you to get one!

### API Functions:
#### Payment functions:
##### init
```javascript
var data = {
    OrderId : 'ORD00000000000000001',
    Amount : 10000,
    IP : '127.0.0.1',
    SessionType	 : 'Pay',
    CardId : '40252318-de07-4853-b43d-4b67f2cd2077',
    VWUserLgn : '123@ya.ru',
    VWUserPsw : '2645363',
    PhoneNumber : '79001234567',
    TemplateTag : '',
    Language : 'RU',
};
ew.init(data, callbackFunc);
```
Description of provided params.

| Parameter's name | Definition                                                        |
| ---------------- | ----------------------------------------------------------------- |
| OrderId          | Payment identifier in your service system.                        |
| Amount           | Amount of payment kopec.                                          |
| IP               | Customer's IP.                                                    |
| SessionType      | 'Pay' - for 1-stage payment, 'Block' - for 2-stage payment, 'Add' - for register card. |
| VWUserLgn        | Customer's identifier in Payture system. (Email is recommended).  |
| VWUserPsw        | Customer's password in Payture system.                            |
| PhoneNumber      | Customer's phone number.                                          |
| CardId           | Card's identifier.                                                |
| TemplateTag      | Used template.                                                    |
| Language         | Template language.                                                |
##### merchantPayRegCard
```javascript
var data = {
    OrderId : 'ORD00000000000000001',
    Amount : 10000,
    IP : '127.0.0.1',
    SecureCode	 : 123,
    CardId : '40252318-de07-4853-b43d-4b67f2cd2077',
    VWUserLgn : '123@ya.ru',
    VWUserPsw : '2645363',
};
ew.merchantPayRegCard(data, callbackFunc);
```
Description of provided params.

| Parameter's name | Definition                                                        |
| ---------------- | ----------------------------------------------------------------- |
| OrderId          | Payment identifier in your service system.                        |
| Amount           | Amount of payment kopec.                                          |
| IP               | Customer's IP.                                                    |
| SecureCode       | CVC2/CVV2.                                                        |
| VWUserLgn        | Customer's identifier in Payture system. (Email is recommended).  |
| VWUserPsw        | Customer's password in Payture system.                            |
| CardId           | Card's identifier.                                                |
| ConfirmCode      | Confirm code from SMS - if verification code was requested.       |
| CustomFields     | Addition information about customer.                              |

##### merchantPayNoRegCard
```javascript
var data = {
    OrderId : 'ORD00000000000000001',
    Amount : 10000,
    IP : '127.0.0.1',
    SecureCode	 : 123,
    CardId : 'FreePay',
    VWUserLgn : '123@ya.ru',
    VWUserPsw : '2645363',
    CardHolder : 'Vasya Petrov',
    CardNumber : '4111111111111112',
    EMonth : 10,
    EYear : 20,
};
ew.merchantPayNoRegCard(data, callbackFunc);
```
Description of provided params.

| Parameter's name | Definition                                                        |
| ---------------- | ----------------------------------------------------------------- |
| OrderId          | Payment identifier in your service system.                        |
| Amount           | Amount of payment kopec.                                          |
| IP               | Customer's IP.                                                    |
| SecureCode       | CVC2/CVV2.                                                        |
| VWUserLgn        | Customer's identifier in Payture system. (Email is recommended).  |
| VWUserPsw        | Customer's password in Payture system.                            |
| CardNumber       | Card's number.                                                    |
| EMonth           | The expiry month of card.                                         |
| EYear            | The expiry year of card.                                          |
| CardHolder       | Card's holder name.                                               |
| CardId           | Card's identifier.                                                |
| ConfirmCode      | Confirm code from SMS - if verification code was requested.       |
| CustomFields     | Addition information about customer.                              |

##### payturePay
```javascript
var sessionId = 'e5c43d9f-2646-42bc-aeec-0b9005ceb972'; 
ew.payturePay(sessionId, callbackFunc);
```
Description of provided params.

| Parameter's name | Definition                                                        |
| ---------------- | ----------------------------------------------------------------- |
| sessionId        | Value extracted from init response (where SessionType=Pay(Block)) |

##### charge <a id="chargeEW"></a>
```javascript
var data = {
    OrderId : 'ORD00000000000000001',
    Amount : 10000,
};
ew.charge(data, callbackFunc);
```
Description of provided params.

| Parameter's name | Definition                                                        |
| ---------------- | ----------------------------------------------------------------- |
| OrderId          | Payment identifier in your service system.                        |
| Amount           | Amount of payment kopec.                                          |

##### refund
The data and description for params as the same as for [charge](#chargeEW) function.
```javascript
ew.refund(data, callbackFunc);
```
##### unblock
The data and description for params as the same as for [charge](#chargeEW) function.
```javascript
ew.unblock(data, callbackFunc);
```
##### payStatus
```javascript
var data = {
    OrderId : 'ORD00000000000000001'
};
ew.payStatus(data, callbackFunc);
```
Description of provided params.

| Parameter's name | Definition                                                        |
| ---------------- | ----------------------------------------------------------------- |
| OrderId          | Payment identifier in your service system.                        |

##### sendCode

```javascript
var data = {
    OrderId : 'ORD00000000000000001',
    Amount : 10000,
    CardId : '40252318-de07-4853-b43d-4b67f2cd2077',
    VWUserLgn : '123@ya.ru',
    VWUserPsw : '2645363'
};
ew.sendCode(data, callbackFunc);
```
Description of provided params.

| Parameter's name | Definition                                                        |
| ---------------- | ----------------------------------------------------------------- |
| OrderId          | Payment identifier in your service system.                        |
| Amount           | Amount of payment kopec.                                          |
| VWUserLgn        | Customer's identifier in Payture system. (Email is recommended).  |
| VWUserPsw        | Customer's password in Payture system.                            |
| CardId           | Card's identifier.                                                |

#### Customer functions:
##### registerCustomer <a id="registerCustomer"></a>
```javascript
var data = {
    VWUserLgn : '123@ya.ru',
    VWUserPsw : '2645363',
    PhoneNumber : '79156783333'
};
ew.registerCustomer(data, callbackFunc);
```
Description of provided params.

| Parameter's name | Definition                                                        |
| ---------------- | ----------------------------------------------------------------- |
| PhoneNumber      | Customer's phone number.                                          |
| VWUserLgn        | Customer's identifier in Payture system. (Email is recommended).  |
| VWUserPsw        | Customer's password in Payture system.                            |
| Email            | Customer's email.                                                 |

##### deleteCustomer
```javascript
var data = {
    VWUserLgn : '123@ya.ru',
    VWUserPsw : '2645363',
    PhoneNumber : '79156783333'
};
ew.deleteCustomer(data, callbackFunc);
```
Description of provided params.

| Parameter's name | Definition                                                        |
| ---------------- | ----------------------------------------------------------------- |
| VWUserLgn        | Customer's identifier in Payture system. (Email is recommended).  |
##### updateCustomer
The description for params as the same as for [registerCustomer](#registerCustomer) function.
```javascript
var data = {
    VWUserLgn : '123@ya.ru',
    VWUserPsw : '2645363',
    PhoneNumber : '79156783333'
    Email : 'testCustomer@test.com'
};
ew.updateCustomer(data, callbackFunc);
```

##### checkCustomer
```javascript
var data = {
    VWUserLgn : '123@ya.ru',
    VWUserPsw : '2645363',
};
ew.checkCustomer(data, callbackFunc);
```
Description of provided params.

| Parameter's name | Definition                                                        |
| ---------------- | ----------------------------------------------------------------- |
| VWUserLgn        | Customer's identifier in Payture system. (Email is recommended).  |
| VWUserPsw        | Customer's password in Payture system.                            |

#### Card functions:
##### merchantAddCard
```javascript
var data = {
    SecureCode	 : 123,
    PhoneNumber : '79001234567',
    VWUserLgn : '123@ya.ru',
    VWUserPsw : '2645363',
    CardHolder : 'Vasya Petrov',
    CardNumber : '4111111111111112',
    EMonth : 10,
    EYear : 20,
};
ew.merchantAddCard(data, callbackFunc);
```
Description of provided params.

| Parameter's name | Definition                                                        |
| ---------------- | ----------------------------------------------------------------- |
| SecureCode       | CVC2/CVV2.                                                        |
| VWUserLgn        | Customer's identifier in Payture system. (Email is recommended).  |
| VWUserPsw        | Customer's password in Payture system.                            |
| CardNumber       | Card's number.                                                    |
| EMonth           | The expiry month of card.                                         |
| EYear            | The expiry year of card.                                          |
| CardHolder       | Card's holder name.                                               |
| PhoneNumber      | Card's identifier.                                                |

##### paytureAddCard
```javascript
var sessionId = 'e5c43d9f-2646-42bc-aeec-0b9005ceb972'; 
ew.paytureAddCard(sessionId, callbackFunc);
```
Description of provided params.

| Parameter's name | Definition                                                  |
| ---------------- | ------------------------------------------------------------|
| sessionId        | Value extracted from init response (where SessionType=Add). |

##### activateCard
```javascript
var data = {
    Amount : 101,
    CardId : '40252318-de07-4853-b43d-4b67f2cd2077',
    VWUserLgn : '123@ya.ru',
    VWUserPsw : '2645363',
};
ew.activateCard(data, callbackFunc);
```
Description of provided params.

| Parameter's name | Definition                                                        |
| ---------------- | ----------------------------------------------------------------- |
| Amount           | Amount of payment kopec.                                          |
| VWUserLgn        | Customer's identifier in Payture system. (Email is recommended).  |
| VWUserPsw        | Customer's password in Payture system.                            |
| CardId           | Card's identifier.                                                |

##### removeCard
```javascript
var data = {
    CardId : '40252318-de07-4853-b43d-4b67f2cd2077',
    VWUserLgn : '123@ya.ru',
    VWUserPsw : '2645363',
};
ew.removeCard(data, callbackFunc);
```
Description of provided params.

| Parameter's name | Definition                                                        |
| ---------------- | ----------------------------------------------------------------- |
| VWUserLgn        | Customer's identifier in Payture system. (Email is recommended).  |
| VWUserPsw        | Customer's password in Payture system.                            |
| CardId           | Card's identifier.                                                |

##### getCardList
```javascript
var data = {
    VWUserLgn : '123@ya.ru',
    VWUserPsw : '2645363',
};
ew.getCardList(data, callbackFunc);
```
Description of provided params.

| Parameter's name | Definition                                                        |
| ---------------- | ----------------------------------------------------------------- |
| VWUserLgn        | Customer's identifier in Payture system. (Email is recommended).  |
| VWUserPsw        | Customer's password in Payture system.                            |

***

## Payture ApplePay <a id="ApplePay"></a>
For use this API just create instanse of PaytureAppleApi object:
```javascript
var apple = new payture.ApplePay('https://sandbox.payture.com',  { Key : 'YourMerchantAccount', Password : 'YourPassword' });
```
Please note, that { Key : 'YourMerchantAccount', Password : 'YourPassword' } - fake account, [our support](http://payture.com/kontakty/) help you to get one!
### API Functions:
#### pay <a id="payApple"></a>
```javascript
var data = {
    PayToken : 'abcdefg',
    OrderId : 'ORD00000000000000001',,
};
apple.pay(data, callbackFunc);
```
Description of provided params.

| Parameter's name | Definition                                                        |
| ---------------- | ----------------------------------------------------------------- |
| PayToken         | PaymentData from PayToken for current transaction                 |
| OrderId          | Payment identifier in your service system                         |

#### block
The data and description for params as the same as for [pay](#payApple) function.
```javascript
apple.block(data, callbackFunc);
```
***


Visit our [site](http://payture.com/) for more information.
You can find our contact [here](http://payture.com/kontakty/).