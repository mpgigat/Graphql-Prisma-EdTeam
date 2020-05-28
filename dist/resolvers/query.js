"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("../utils");

var Query = {
  hello: function hello(parent, args, ctx, info) {
    var name = args.name;
    return "Holla ".concat(name || 'Mundo');
  },
  cantidad: function cantidad() {
    return 1;
  },
  //user:(parente,args,ctx,info)=>{
  user: function user(parent, _ref, _ref2, info) {
    var id = _ref.id;
    var request = _ref2.request,
        prisma = _ref2.prisma;
    //otra forma colocar el argumento directamente
    //la siguiente linea es para obtener el token de jwt
    //puede simplemente ejecutar la funcion o asignarla a una varia
    var userId = (0, _utils.getUserId)(request); //if(!args.id){

    if (!id) {
      return prisma.users.findMany();
    }

    return prisma.users.findOne({
      where: {
        id: Number(id)
      }
    });
  },
  author: function author(parent, _ref3, _ref4, info) {
    var id = _ref3.id,
        first = _ref3.first,
        skip = _ref3.skip,
        orderBy = _ref3.orderBy;
    var request = _ref4.request,
        prisma = _ref4.prisma;
    var userId = (0, _utils.getUserId)(request);

    if (!id) {
      return prisma.authors.findMany({
        first: first,
        skip: skip,
        orderBy: orderBy
      });
    }

    return prisma.authors.findOne({
      where: {
        id: Number(id)
      }
    });
  },
  book: function book(parent, _ref5, _ref6, info) {
    var id = _ref5.id,
        first = _ref5.first,
        skip = _ref5.skip,
        orderBy = _ref5.orderBy;
    var prisma = _ref6.prisma,
        request = _ref6.request;
    var userId = (0, _utils.getUserId)(request);

    if (!id) {
      return prisma.books.findMany({
        first: first,
        skip: skip,
        orderBy: orderBy
      });
    }

    return prisma.books.findOne({
      where: {
        id: id
      }
    });
  }
};
var _default = Query;
exports["default"] = _default;