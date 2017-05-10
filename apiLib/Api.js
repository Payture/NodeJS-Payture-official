var payture = new (require('./paytureCommon')).PaytureCommon();


exports.PaytureAPI = function PaytureAPI(host, merchant) {
     if(host === undefined)
        this.Host = 'https://sandbox.payture.com';
     else 
        this.Host = host;
    
    if(merchant !== undefined){
        this.Merchant = merchant.Key;
        this.Password = merchant.Password;
    }
        this.ApiType = 'api';

    this.pay = function(data, callbackFunc) {
        payOrBlockRequest(payture.COMMANDS.PAY, this, data, callbackFunc);
    };

    this.block = function(data, callbackFunc) {
        payOrBlockRequest(payture.COMMANDS.BLOCK, this, data, callbackFunc);
    };

     function payOrBlockRequest(command, obj, data, callbackFunc) {
        payture.sendRequest(obj, command, 'POST', [
                        {
                            name: 'Key',
                            value: obj.Merchant
                        },
                        {
                            name: 'Amount',
                            value: data.Amount
                        },

                        {
                            name: 'OrderId',
                            value: data.OrderId
                        },
                        {
                            name: 'PayInfo',
                            value: payture.toEncodeUrl({
                                PAN : data.PAN,
                                EMonth : data.EMonth,
                                EYear : data.EYear,
                                CardHolder : data.CardHolder,
                                SecureCode : data.SecureCode,
                                OrderId : data.OrderId, 
                                Amount : data.Amount
                            }),
                        },

                        {
                            name: 'PaytureId',
                            value: data.PaytureId
                        },
                        {
                            name: 'CustomerKey',
                            value: data.CustomerKey
                        },

                        {
                            name: 'CustomFields',
                            value: payture.toEncodeUrl(data.CustomFields)
                        },
                        
                    ], callbackFunc);
    };

    this.unblock = function(data, callbackFunc){
        payture.sendRequest(this, payture.COMMANDS.UNBLOCK, 'POST', [
                            {
                                name: 'Key',
                                value: this.Merchant
                            },
                            {
                                name: 'Amount',
                                value: data.Amount
                            },

                            {
                                name: 'OrderId',
                                value: data.OrderId
                            },
                        ], callbackFunc );
    };

    this.refund = function(data, callbackFunc){
        payture.sendRequest(this, payture.COMMANDS.REFUND, 'POST', [
                                {
                                    name: 'Key',
                                    value: this.Merchant
                                },
                                {
                                    name: 'Amount',
                                    value: data.Amount
                                },

                                {
                                    name: 'Password',
                                    value: this.Password
                                },
                                {
                                    name: 'OrderId',
                                    value: data.OrderId
                                },
                        ], callbackFunc );
    };

    this.charge = function(data, callbackFunc){
        payture.sendRequest(this, payture.COMMANDS.CHARGE, 'POST', [
                            {
                                name: 'Key',
                                value: this.Merchant
                            },

                            {
                                name: 'OrderId',
                                value: data.OrderId
                            },
                        ],callbackFunc );
    };
    
    this.pay3DS = function pay3DS(data,pares){
        payOrBlock3DS(payture.COMMANDS.PAY3DS, pares, this);
    };

    this.block3DS = function block3DS(data, pares){
        payOrBlock3DS(payture.COMMANDS.BLOCK3DS, pares, this);
    };

     function payOrBlock3DS(data, method, pares, obj){
         payture.sendRequest(obj, method, 'POST', [
                {
                    name: 'Key',
                    value: obj.Merchant
                },

                {
                    name: 'OrderId',
                    value: data.OrderId
                },
                {
                    name: 'PaRes',
                    value: pares
                },
                ] );
    };

    this.getState = function(data, callbackFunc){
        payture.sendRequest(this, payture.COMMANDS.GETSTATE, 'GET', [
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

