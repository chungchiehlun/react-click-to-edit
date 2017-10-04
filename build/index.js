'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  head.appendChild(style);
  
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  return returnValue;
}

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

__$styleInject("/* reset */\n.styles__reset___JYk7- {\n  font-size: 100%;\n  font-family: sans-serif;\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n\n.styles__reset--input___CnkKb {\n  line-height: 1.15;\n  margin: 0;\n  overflow: visible;\n}\n\n/* default style */\n.styles__wrapper___3KXDn {\n  font-size: 16px;\n  width: 155px;\n  height: 35px;\n}\n\n.styles__input___15JGo {\n  border: none;\n  border-radius: 0.2em;\n  text-align: center;\n  -webkit-box-shadow: 0 0 1em 0.25em rgba(0, 0, 0, .1);\n          box-shadow: 0 0 1em 0.25em rgba(0, 0, 0, .1);\n}\n\n.styles__text___1_7-z {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n", undefined);

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var makeContentEditable = function makeContentEditable(WrappedComponent) {
  return function (_React$Component) {
    inherits(_class, _React$Component);

    function _class(props) {
      classCallCheck(this, _class);

      var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

      _this.state = {
        value: props.children,
        onEditMode: false
      };
      _this.getIntoEditMode = _this.getIntoEditMode.bind(_this);
      _this.handleEnterKey = _this.handleEnterKey.bind(_this);
      _this.getOffEditMode = _this.getOffEditMode.bind(_this);
      _this.changeValue = _this.changeValue.bind(_this);
      return _this;
    }

    createClass(_class, [{
      key: 'getIntoEditMode',
      value: function getIntoEditMode() {
        this.setState(_extends({}, this.state, {
          onEditMode: true
        }));
      }
    }, {
      key: 'getOffEditMode',
      value: function getOffEditMode() {
        this.setState(_extends({}, this.state, {
          onEditMode: false
        }));
        if (this.props.endEditing) {
          this.props.endEditing(this.state.value);
        }
      }
    }, {
      key: 'handleEnterKey',
      value: function handleEnterKey(e) {
        if (e.keyCode === 13 || e.charCode == 13) {
          this.setState(_extends({}, this.state, {
            onEditMode: false
          }));
          if (this.props.endEditing) {
            this.props.endEditing(this.state.value);
          }
        }
      }
    }, {
      key: 'changeValue',
      value: function changeValue(e) {
        this.setState(_extends({}, this.state, {
          value: e.target.value
        }));
      }
    }, {
      key: 'render',
      value: function render() {
        var customStyle = this.props.customStyle;

        return React.createElement(
          'section',
          {
            className: (customStyle || '' ? (customStyle || '') + ' ' : '') + 'styles__wrapper___3KXDn',
            onClick: this.getIntoEditMode },
          this.state.onEditMode ? React.createElement('input', {
            type: 'text',
            autoFocus: true,
            value: this.state.value,
            className: 'styles__input___15JGo styles__reset___JYk7- styles__reset--input___CnkKb',
            onChange: this.changeValue,
            onKeyPress: this.handleEnterKey,
            onBlur: this.getOffEditMode
          }) : React.createElement(
            'span',
            {
              className: 'styles__text___1_7-z styles__reset___JYk7-'
            },
            this.state.value
          )
        );
      }
    }]);
    return _class;
  }(React.Component);
};

var labelize = function labelize(props) {
  return React.createElement(
    'section',
    null,
    props.children
  );
};

var ClickToEdit = makeContentEditable(labelize);

module.exports = ClickToEdit;
//# sourceMappingURL=index.js.map
