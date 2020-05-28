"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("../utils");

var Book = {
  writted_by: function writted_by(parent, args, _ref, info) {
    var prisma = _ref.prisma,
        request = _ref.request;
    var userId = (0, _utils.getUserId)(request);
    return prisma.books.findOne({
      where: {
        id: parent.id
      }
    }).authors();
  },
  register_by: function register_by(parent, args, _ref2, info) {
    var prisma = _ref2.prisma,
        request = _ref2.request;
    var userId = (0, _utils.getUserId)(request);
    return prisma.books.findOne({
      where: {
        id: parent.id
      }
    }).users();
  }
};
var _default = Book;
exports["default"] = _default;