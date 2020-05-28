"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("../utils");

var Subscription = {
  count: {
    subscribe: function subscribe(parent, args, _ref, info) {
      var pubSub = _ref.pubSub;
      var count = 0;
      setInterval(function () {
        count++;
        pubSub.publish('count', {
          count: count
        });
      }, 1000);
      return pubSub.asyncIterator('count');
    }
  },
  author: {
    subscribe: function subscribe(parent, args, _ref2, info) {
      var pubSub = _ref2.pubSub,
          Request = _ref2.Request;
      var userId = (0, _utils.getUserId)(Request);
      return pubSub.asyncIterator('author');
    }
  },
  book: {
    subscribe: function subscribe(parent, _ref3, _ref4, info) {
      var authorId = _ref3.authorId;
      var pubSub = _ref4.pubSub,
          Request = _ref4.Request;
      //subscribe(parent,args,{db,pubSub},info){ 
      //la subscripcion la hacemos para la creacion de 
      //un libro de un autor en particular
      //el nombre del canal es unico, y por cada author habra
      //un canal           
      var userId = (0, _utils.getUserId)(Request);
      return pubSub.asyncIterator("book-".concat(authorId)); //return pubSub.asyncIterator('book')
    }
  }
};
var _default = Subscription;
exports["default"] = _default;