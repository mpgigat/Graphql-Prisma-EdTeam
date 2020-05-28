"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("../utils");

var Author = {
  register_by: function register_by(parent, args, _ref, info) {
    var prisma = _ref.prisma,
        request = _ref.request;
    var userId = (0, _utils.getUserId)(request);
    return prisma.authors.findOne({
      where: {
        id: parent.id
      }
    }).users();
  },
  books: function books(parent, args, _ref2, info) {
    var prisma = _ref2.prisma,
        request = _ref2.request;
    var userId = (0, _utils.getUserId)(request);
    return prisma.authors.findOne({
      where: {
        id: parent.id
      }
    }).books();
  }
};
var _default = Author;
exports["default"] = _default;