var payture = new (require('./paytureCommon')).PaytureCommon();

exports.PaytureInPay = function PaytureInPay(host, merchant) {
     if(host === undefined)
        this.Host = 'https://sandbox.payture.com';
     else 
        this.Host = host;
    this.ApiType = 'apim';
    

    if(merchant !== undefined){
        this.Merchant = merchant.Key;
        this.Password = merchant.Password;
    }

    this.init = function(data, callbackFunc){

        payture.sendRequest(this, payture.COMMANDS.INIT, 'POST', [
                        {
                            name: 'Key',
                            value: this.Merchant
                        },
                        {
                            name: 'Data',
                            value: payture.toEncodeUrl(data),
                        },
                        
                    ], callbackFunc, 'Pay');
    };

    this.pay = function(sessionId, callbackFunc){
        payture.sendRequest(this, payture.COMMANDS.PAY, 'POST', [
                        {
                            name: 'SessionId',
                            value: sessionId 
                        },
                    ], callbackFunc);
    };

    this.unblock = function(data, callbackFunc){
        unblockOrChargeOrRefund(data, payture.COMMANDS.UNBLOCK, this, callbackFunc);
    };

    this.refund = function(data, callbackFunc){
        unblockOrChargeOrRefund(data, payture.COMMANDS.REFUND, this, callbackFunc);
    };

    this.charge = function(data, callbackFunc){
        unblockOrChargeOrRefund(data, payture.COMMANDS.CHARGE, this, callbackFunc);
    };

    function unblockOrChargeOrRefund(data, command, obj, callbackFunc) {
        payture.sendRequest(obj, command, 'POST', [
                        {
                            name: 'Key',
                            value: obj.Merchant
                        },
                        {
                            name: 'OrderId',
                            value: data.OrderId,
                        },
                        {
                            name: 'Password',
                            value: obj.Password
                        },
                        {
                            name: 'Amount',
                            value: data.Amount,
                        },
                        
                    ], callbackFunc);
    };


    this.payStatus = function(orderId, callbackFunc){
        payture.sendRequest(this, payture.COMMANDS.PAYSTATUS, 'GET', [
                        {
                            name: 'Key',
                            value: this.Merchant
                        },
                        {
                            name: 'OrderId',
                            value: orderId,
                        },
                        
                    ], callbackFunc);
    };

    this.getState = function(data, callbackFunc){
        payture.sendRequest(this, payture.COMMANDS.GETSTATE, 'POST', [
                    {
                        name: 'Key',
                        value: this.Merchant
                    },

                    {
                        name: 'OrderId',
                        value: data.OrderId
                    }
                ], callbackFunc );
    };

    return this;
}
