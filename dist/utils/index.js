"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateToken = exports.validatePassWord = exports.hashPassword = exports.getUserId = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var SECRET = 'edteam';

var getUserId = function getUserId(request) {
  var header = request.get('authorization');

  if (header) {
    var token = header.replace('Bearer ', '');

    var _jwt$verify = _jsonwebtoken["default"].verify(token, SECRET),
        userId = _jwt$verify.userId;

    return userId;
  }

  throw new Error('Se requiere autenticación');
};

exports.getUserId = getUserId;

var hashPassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(password) {
    var salt;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(password.length < 6)) {
              _context.next = 2;
              break;
            }

            throw new Error("Password debe tener al menos 6 caracteres");

          case 2:
            _context.next = 4;
            return _bcrypt["default"].genSalt(10);

          case 4:
            salt = _context.sent;
            return _context.abrupt("return", _bcrypt["default"].hash(password, salt));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function hashPassword(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.hashPassword = hashPassword;

var validatePassWord = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(requestPassword, password) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", _bcrypt["default"].compare(requestPassword, password));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function validatePassWord(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.validatePassWord = validatePassWord;

var generateToken = function generateToken(userId) {
  return _jsonwebtoken["default"].sign({
    userId: userId
  }, SECRET, {
    expiresIn: '2 days'
  });
};

exports.generateToken = generateToken;