
var EW = require('./apiLib/Ewallet'); 
var InPay = require('./apiLib/InPay');
var Api = require('./apiLib/Api');
var ApplePay = require('./apiLib/ApplePay');

var payture = {
 EWallet: EW.PaytureEWallet,
 InPay: InPay.PaytureInPay,
 Api: Api.PaytureAPI,
 ApplePay: ApplePay.PaytureAppleApi,
}

module.exports = payture;
