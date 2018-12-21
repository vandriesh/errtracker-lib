(function () {
  'use strict';

  function postData(url, data) {
      if (url === void 0) { url = ""; }
      if (data === void 0) { data = {}; }
      // Default options are marked with *
      return fetch(url, {
          method: 'POST',
          mode: 'no-cors',
          cache: 'no-cache',
          credentials: 'omit',
          headers: {
              'Content-Type': 'application/json; charset=utf-8'
              // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: 'follow',
          referrer: 'no-referrer',
          body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
  }

  var SlackHandler = /** @class */ (function () {
      function SlackHandler(slackUrl) {
          this.slackUrl = slackUrl;
      }
      SlackHandler.prototype.handle = function (errMsg, info) {
          var _this = this;
          if (info === void 0) { info = []; }
          var message = this.format(errMsg, info);
          postData(this.slackUrl, message)
              .then(function (resp) { return console.info(_this.constructor.name, 'service provider has been notified'); })
              .catch(function (resp) {
              return console.error(_this.constructor.name, 'ErrTracker: could notify, due to error');
          });
      };
      SlackHandler.prototype.formatTextAttach = function (text) {
          return { text: text };
      };
      SlackHandler.prototype.format = function (errorMessage, extraInfo) {
          var attachments = [];
          var details = [
              "message: " + errorMessage.message,
              "source: " + errorMessage.filename,
              "line: " + errorMessage.lineno,
              "col: " + errorMessage.colno,
              "error: " + errorMessage.error
          ];
          attachments.push(this.formatTextAttach(details.join('\n')));
          if (extraInfo) {
              attachments.push(this.formatTextAttach(extraInfo.join('\n')));
          }
          var outputMessage = {
              channel: 'exceptions-js',
              username: 'errtracker',
              text: 'We got an error!',
              attachments: attachments
          };
          return outputMessage;
      };
      return SlackHandler;
  }());

  var Utils = {
      toArray: function (obj) {
          var arr = [];
          var keys = Object.keys(obj);
          for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
              var key = keys_1[_i];
              arr.push(key + ": " + obj[key]);
          }
          return arr;
      }
  };

  var ErrTracker = /** @class */ (function () {
      function ErrTracker(defaultHandler) {
          this.extraInfo = {};
          this.handlers = [];
          this.handlersQuickAccess = {};
          this.handlers.push(defaultHandler);
          this.handlersQuickAccess[defaultHandler.constructor.name] = defaultHandler;
      }
      ErrTracker.getSlackErrTracker = function (slackWebhookUrl) {
          return new ErrTracker(new SlackHandler(slackWebhookUrl));
      };
      ErrTracker.prototype.handle = function (event) {
          var _this = this;
          var substring = 'script error';
          var message = event.toString();
          var errMsg;
          if (message.indexOf(substring) > -1) {
              errMsg = { message: 'Script Error: See Browser Console for Detail' };
          }
          else {
              errMsg = event;
          }
          this.handlers.forEach(function (handler) { return handler.handle(errMsg, Utils.toArray(_this.extraInfo)); });
          return true;
      };
      ErrTracker.prototype.setExtraInfo = function (extraInfo) {
          this.extraInfo = Object.assign({}, extraInfo);
      };
      return ErrTracker;
  }());

  // Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
  (function (scope, _a) {
      var platform = _a.platform, userAgent = _a.userAgent;
      scope['errtracker'] = {
          useSlackChannel: function (slackWebhookUrl) {
              if (scope['__usingSlackChannel']) {
                  return;
              }
              var ErrTrackerHandler = new ErrTracker(new SlackHandler(slackWebhookUrl));
              ErrTrackerHandler.setExtraInfo({
                  platform: platform,
                  userAgent: userAgent
              });
              scope.addEventListener('error', function (event) { return ErrTrackerHandler.handle(event); });
          }
      };
  })(window, navigator);

}());
