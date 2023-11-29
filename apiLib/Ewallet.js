var payture = new (require('./paytureCommon')).PaytureCommon();

exports.PaytureEWallet = function PaytureEWallet(host, merchant){
    if(host === undefined)
        this.Host = 'https://sandbox.payture.com';
     else 
        this.Host = host;
    
    this.ApiType = 'vwapi';
    
    if(merchant !== undefined){
        this.VWID = merchant.Key;
        this.Password = merchant.Password;
    }
/*
* region Customers
*/
    this.registerCustomer = function(data, callbackFunc){
        registerOrUpdate(payture.COMMANDS.REGISTER, data, this, callbackFunc);
    };

    function registerOrUpdate(command, data, obj, callbackFunc){
 
        payture.sendRequest(obj, command, 'POST',  [
                {
                    name: 'VWID',
                    value: obj.VWID
                },

                {
                    name: 'Data',
                    value: payture.toEncodeUrl({
                        VWUserLgn : data.VWUserLgn,
                        VWUserPsw : data.VWUserPsw,
                        PhoneNumber : data.PhoneNumber,
                        Email : data.Email,
                    })
                },
            ], callbackFunc);
    }

    this.deleteCustomer = function(data, callbackFunc) {
        payture.sendRequest(this, 'Delete', 'POST', [
                {
                    name: 'VWID',
                    value: this.VWID
                },

                {
                    name: 'Data',
                    value: payture.toEncodeUrl({
                        VWUserLgn : data.VWUserLgn,
                        Password : this.Password
                    })
                },
            ], callbackFunc); 
    };

    this.updateCustomer = function(data, callbackFunc) {
        registerOrUpdate(payture.COMMANDS.UPDATE, data, this, callbackFunc);
    };

    this.checkCustomer = function(data, callbackFunc) {
        payture.sendRequest(this, payture.COMMANDS.CHECK, 'POST', [
                {
                    name: 'VWID',
                    value: this.VWID
                },

                {
                    name: 'Data',
                    value: payture.toEncodeUrl({
                        VWUserLgn : data.VWUserLgn,
                        VWUserPsw : data.VWUserPsw
                    })
                },
            ], callbackFunc); 
    };
/*
* endregion Customers
*/



/*
* region Cards
*/
    this.merchantAddCard = function(data, callbackFunc) {
        payture.sendRequest(this, payture.COMMANDS.ADD, 'POST', [
                {
                    name: 'VWID',
                    value: this.VWID
                },

                {
                    name: 'Data',
                    value: payture.toEncodeUrl({
                        VWUserLgn : data.VWUserLgn,
                        VWUserPsw : data.VWUserPsw,
                        PhoneNumber : data.PhoneNumber,
                        CardNumber : data.CardNumber,
                        CardHolder : data.CardHolder,
                        SecureCode : data.SecureCode,
                        EMonth : data.EMonth,
                        EYear : data.EYear,
                    })
                },
            ], callbackFunc); 
    };

    this.paytureAddCard = function(sessionId, callbackFunc){
        payture.sendRequest(this, payture.COMMANDS.ADD, 'POST', [
                {
                    name: 'SessionId',
                    value: sessionId 
                },
            ], callbackFunc);         

    };

    this.activateCard = function(data, callbackFunc){
        payture.sendRequest(this, payture.COMMANDS.ACTIVATE, 'POST', [
                {
                    name: 'VWID',
                    value: this.VWID
                },

                {
                    name: 'Data',
                    value: payture.toEncodeUrl({
                        VWUserLgn : data.VWUserLgn,
                        VWUserPsw : data.VWUserPsw,
                        CardId : data.CardId,
                        Amount : data.Amount
                    })
                },
            ], callbackFunc); 
        };

    this.removeCard = function(data, callbackFunc){
        payture.sendRequest(this, payture.COMMANDS.REMOVE, 'POST', [
            {
                name: 'VWID',
                value: this.VWID
            },

            {
                name: 'Data',
                value: payture.toEncodeUrl({
                    VWUserLgn : data.VWUserLgn,
                    VWUserPsw : data.VWUserPsw,
                    CardId : data.CardId
                })
            },
        ], callbackFunc); 
    };

    this.getCardList = function(data, callbackFunc){
        payture.sendRequest(this, payture.COMMANDS.GETLIST, 'GET', [
            {
                name: 'VWID',
                value: this.VWID
            },

            {
                name: 'Data',
                value: payture.toEncodeUrl({
                    VWUserLgn : data.VWUserLgn,
                    VWUserPsw : data.VWUserPsw
                })
            },
        ], callbackFunc); 
    };
/*
* endregion Cards
*/

/*
* region PaymentsApi
*/
this.init = function(data, callbackFunc) {
    let encodedData = {};

    // Iterate over each key in the data object
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            encodedData[key] = data[key];
        }
    }


    // Prepare the request data
    let requestData = [
        {
            name: 'VWID',
            value: this.VWID
        },
        {
            name: 'Data',
            value: payture.toEncodeUrl(encodedData)
        },
    ];

    // Determine the command type
    let commandType = (data.SessionType === 'Add' ? 'Add' : 'Pay');

    // Send the request
    payture.sendRequest(this, payture.COMMANDS.INIT, 'POST', requestData, callbackFunc, commandType);
};


    this.merchantPayRegCard = function(data, callbackFunc){

        payture.sendRequest(this, payture.COMMANDS.PAY, 'POST', [
            {
                name: 'VWID',
                value: this.VWID
            },

            {
                name: 'Data',
                value: payture.toEncodeUrl({
                    IP : data.IP,
                    OrderId : data.OrderId,
                    Amount : data.Amount,
                    VWUserLgn : data.VWUserLgn,
                    VWUserPsw : data.VWUserPsw,
                    SecureCode : data.SecureCode,
                    CardId : data.CardId,
                    CustomFields : data.CustomFields,
                    ConfirmCode : data.ConfirmCode
                })
            },
        ], callbackFunc); 
    };

    this.merchantPayNoRegCard = function(data, callbackFunc){
        payture.sendRequest(this, payture.COMMANDS.PAY, 'POST', [
            {
                name: 'VWID',
                value: this.VWID
            },

            {
                name: 'Data',
                value: payture.toEncodeUrl({
                    IP : data.IP,
                    OrderId : data.OrderId,
                    Amount : data.Amount,
                    VWUserLgn : data.VWUserLgn,
                    VWUserPsw : data.VWUserPsw,
                    CardNumber : data.CardNumber,
                    CardHolder : data.CardHolder,
                    EMonth : data.EMonth,
                    EYear : data.EYear,
                    SecureCode : data.SecureCode,
                    CardId : 'FreePay',
                    CustomFields : data.CustomFields,
                    ConfirmCode : data.ConfirmCode
                })
            },
        ], callbackFunc); 
    };   

    this.payOnPaytureSide = function(sessionId, callbackFunc){

        payture.sendRequest(this, payture.COMMANDS.PAY, 'POST', [
            {
                name: 'SessionId',
                value: sessionId
            },
        ], callbackFunc); 
    };

    this.sendCode = function(callbackFunc){
        payture.sendRequest(this, payture.COMMANDS.SENDCODE, 'POST', [
            {
                name: 'VWID',
                value: this.VWID
            },

            {
                name: 'Data',
                value: payture.toEncodeUrl({
                    OrderId : data.OrderId,
                    Amount : data.Amount,
                    VWUserLgn : data.VWUserLgn,
                    VWUserPsw : data.VWUserPsw,
                    CardId : data.CardId,
                })
            },
        ], callbackFunc); 
    };

    this.charge = function(data, callbackFunc){
        chargeOrUnblock(data, payture.COMMANDS.CHARGE, this, callbackFunc);
    };

    this.unblock = function(data, callbackFunc){
        chargeOrUnblock(data, payture.COMMANDS.UNBLOCK, this, callbackFunc);
    };

    function chargeOrUnblock(data, command, obj, callbackFunc){
        payture.sendRequest(obj, command, 'POST', [
            {
                name: 'VWID',
                value: obj.VWID
            },

            {
                name: 'Password',
                value: obj.Password
            },
            {
                name: 'OrderId',
                value: data.OrderId,
            },

            {
                name: 'Amount',
                value: data.Amount
            }
        ], callbackFunc);  
    };

    this.refund = function(data, callbackFunc){
        payture.sendRequest(this, payture.COMMANDS.REFUND, 'POST', [
            {
                name: 'VWID',
                value: this.VWID
            },

            {
                name: 'Data',
                value: payture.toEncodeUrl({
                    OrderId : data.OrderId,
                    Amount : data.Amount,
                    Password : this.Password
                })
            }
        ], callbackFunc);  
    };

    this.payStatus = function(data, callbackFunc){
        payture.sendRequest(this, payture.COMMANDS.PAYSTATUS, 'GET', [
            {
                name: 'VWID',
                value: this.VWID
            },

            {
                name: 'Data',
                value: payture.toEncodeUrl({ OrderId : data.OrderId,})
            }
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
    
/*
* endregion PaymentsApi
*/


    return this;
}
