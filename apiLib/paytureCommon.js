var request = require('request');
var querystring = require('querystring');
var et = require('elementtree');

exports.PaytureCommon = function PaytureCommon(){

    parseResponseBody = function parseResponseBody(body){
        var name = {};
        var rrr = et.XML(body);
        var atr = rrr.attrib;
        for(key in atr){
            name[key] = atr[key];
        }

        var children = rrr._children;
        name.List = {};
        for(key in children){
            name.List[key] = children[key].attrib;
        }
        return name;
    };
 
    this.sendRequest = function sendRequest(obj, command, method, param, callbackFunc, redirectCmd) {
        var self = this;
        request({
            har : {
                method : method,
                url : obj.Host + '/'+ obj.ApiType +'/' + command,
                 headers: [
                    {
                        name: 'content-type',
                        value: 'application/x-www-form-urlencoded'
                    }
                ],
                postData : {
                    mimeType: 'application/x-www-form-urlencoded',
                    params: param
                }
            }
        }, 
        function(error, response, body){
            if(error && callbackFunc)
                callbackFunc(error, response, body);
            else if(error)
                console.log('error:', error); 
            else{
                console.log('Response from ' + command);
                if(callbackFunc){
                    var responseObj = parseResponseBody(body);
                    var responseForLog = JSON.stringify(responseObj);
                    console.log('This is JSON Response:   [' + responseForLog + ']');
                    console.log('This is host: ' + obj.Host);
                    if(command == self.COMMANDS.INIT && (obj.ApiType == 'apim' || obj.ApiType == 'vwapi')){
                                responseObj.RedirectUrl = obj.Host + '/' + obj.ApiType + '/' + redirectCmd + '?SessionId=' + responseObj.SessionId;
                    }
                    responseObj.Cmd = command;
                    callbackFunc(null, response, body, responseObj);
                }
            }
        });
    };

    this.toEncodeUrl = function toEncodeUrl(obj){
        var objectCopy = Object.assign(obj);
        for (var key in objectCopy) {
            if (objectCopy[key] === undefined) {
                delete objectCopy[key];
            }
        }

        return querystring.stringify(objectCopy, ';', '=');
    };

    this.COMMANDS = {
        PAY : 'Pay',
        BLOCK : 'Block',
        UNBLOCK : 'Unblock',
        CHARGE : 'Charge',
        REFUND : 'Refund',
        REGISTER : 'Register',
        DELETE : 'Delete',
        CHECK : 'Check',
        UPDATE : 'Update',
        ADD : 'Add',
        ACTIVATE : 'Activate',
        REMOVE : 'Remove',
        GETLIST : 'GetList',
        INIT : 'Init',
        SENDCODE : 'SendCode',
        PAYSTATUS : 'PayStatus',
        GETSTATE : 'GetState',
        PAY3DS : 'Pay3DS',
        BLOCK3DS : 'Block3DS',
        APPLEPAY : 'ApplePay'
    };

    return this;
}