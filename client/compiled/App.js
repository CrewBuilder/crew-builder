'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactFacebookLogin = require('react-facebook-login');

var _reactFacebookLogin2 = _interopRequireDefault(_reactFacebookLogin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var responseFacebook = function responseFacebook(response) {
  console.log(response);
};

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.checkLogin = function () {
      FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
        console.log('response', response);
      });
    };

    return _this;
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      function checkLoginState() {
        FB.getLoginStatus(function (response) {
          statusChangeCallback(response);
        });
      }
      function componentClicked(e) {
        console.log('e', e);
      }
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_reactFacebookLogin2.default, {
          appId: '356644548109752',
          autoLoad: true,
          fields: 'name,email,picture',
          onClick: componentClicked,
          callback: responseFacebook }),
        ','
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;