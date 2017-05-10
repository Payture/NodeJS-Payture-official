
var EW = require('./apiLib/Ewallet'); 
var InPay = require('./apiLib/InPay');
var Api = require('./apiLib/Api');
var ApplePay = require('./apiLib/ApplePay');

 function Payture(){
    this.EWallet = EW.PaytureEWallet;
    this.InPay = InPay.PaytureInPay;
    this.Api = Api.PaytureAPI;
    this.ApplePay = ApplePay.PaytureAppleApi;
    return this;
}

module.exports.Payture = Payture;