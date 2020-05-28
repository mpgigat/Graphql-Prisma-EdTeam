"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _index = require("../utils/index");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Mutation = {
  //cambiamos arg por data, segun cambio a input del esquema, 
  //en createbook, esta la otra forma
  signUp: function () {
    var _signUp = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, _ref, _ref2, info) {
      var data, prisma, password, user;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              data = _ref.data;
              prisma = _ref2.prisma;
              _context.next = 4;
              return (0, _index.hashPassword)(data.password);

            case 4:
              password = _context.sent;
              _context.next = 7;
              return prisma.users.create({
                // ESTO SOBREESCRIBE EN DATA EL PASWORD YA HASHEADO
                data: _objectSpread(_objectSpread({}, data), {}, {
                  password: password
                })
              });

            case 7:
              user = _context.sent;
              return _context.abrupt("return", {
                user: user,
                token: (0, _index.generateToken)(user.id)
              });

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function signUp(_x, _x2, _x3, _x4) {
      return _signUp.apply(this, arguments);
    }

    return signUp;
  }(),
  logIn: function () {
    var _logIn = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(parent, _ref3, _ref4, info) {
      var data, prisma, user, isValid;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              data = _ref3.data;
              prisma = _ref4.prisma;
              _context2.next = 4;
              return prisma.users.findOne({
                where: {
                  email: data.email
                }
              });

            case 4:
              user = _context2.sent;
              _context2.next = 7;
              return (0, _index.validatePassWord)(data.password, user.password);

            case 7:
              isValid = _context2.sent;

              if (isValid) {
                _context2.next = 10;
                break;
              }

              throw new Error('Contraseña incorrecta');

            case 10:
              return _context2.abrupt("return", {
                user: user,
                token: (0, _index.generateToken)(user.id)
              });

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function logIn(_x5, _x6, _x7, _x8) {
      return _logIn.apply(this, arguments);
    }

    return logIn;
  }(),
  //cambiamos arg por data, segun cambio a input del esquema
  updateUser: function () {
    var _updateUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(parent, _ref5, _ref6, info) {
      var id, data, prisma, request, userId, password;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              id = _ref5.id, data = _ref5.data;
              prisma = _ref6.prisma, request = _ref6.request;
              //ya no necesimatos la siguiente linea porque data ya esta arriba
              //const{id,...data}=args
              userId = (0, _index.getUserId)(request);
              password = data.password;

              if (!password) {
                _context3.next = 8;
                break;
              }

              _context3.next = 7;
              return (0, _index.hashPassword)(data.password);

            case 7:
              data.password = _context3.sent;

            case 8:
              return _context3.abrupt("return", prisma.users.update({
                where: {
                  id: Number(id)
                },
                data: data
              }));

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function updateUser(_x9, _x10, _x11, _x12) {
      return _updateUser.apply(this, arguments);
    }

    return updateUser;
  }(),
  //Codigo original sin suscripcion
  // createAuthor:(parent,{data},{db},info)=>{        
  //     const author={
  //         id:uuidv4(),
  //         ...data
  //     }
  //     db.authors.push(author)               
  //     return author   
  // },
  //AHORA CODIGO AL AGREGAR LA SUBSCRIPCION
  createAuthor: function () {
    var _createAuthor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(parent, _ref7, _ref8, info) {
      var data, prisma, pubSub, request, userId, register_by, rest, newAuthor;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              data = _ref7.data;
              prisma = _ref8.prisma, pubSub = _ref8.pubSub, request = _ref8.request;
              userId = (0, _index.getUserId)(request);
              register_by = data.register_by, rest = (0, _objectWithoutProperties2["default"])(data, ["register_by"]);
              _context4.next = 6;
              return prisma.authors.create({
                data: _objectSpread(_objectSpread({}, rest), {}, {
                  users: {
                    connect: {
                      id: Number(register_by)
                    }
                  }
                })
              });

            case 6:
              newAuthor = _context4.sent;
              pubSub.publish('author', {
                author: {
                  mutation: 'CREATED',
                  data: newAuthor
                }
              });
              return _context4.abrupt("return", newAuthor);

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function createAuthor(_x13, _x14, _x15, _x16) {
      return _createAuthor.apply(this, arguments);
    }

    return createAuthor;
  }(),
  // CODIGO ANTES DE SUBSCRIPCION
  // updateAuthor:(parent,args,{db},info)=>{
  //     const {id,...data}=args
  //     const authorExist=db.authors.find(author=>author.id===id)
  //     if (!authorExist){
  //         throw new Error ("Author no existe")
  //     }
  //     db.authors=db.authors.map(author=>{
  //         if (author.id===id){
  //             author={...author,...data}
  //             return author
  //         }
  //         return author
  //     })
  //     return {
  //         ...authorExist,...data
  //     }
  // },
  //CODIGO DESPUES DE SUBRCRIPCION y tipos
  updateAuthor: function () {
    var _updateAuthor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(parent, _ref9, _ref10, info) {
      var id, data, prisma, pubSub, request, userId, register_by, rest, authorUpdate;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = _ref9.id, data = _ref9.data;
              prisma = _ref10.prisma, pubSub = _ref10.pubSub, request = _ref10.request;
              userId = (0, _index.getUserId)(request);
              register_by = data.register_by, rest = (0, _objectWithoutProperties2["default"])(data, ["register_by"]);

              if (register_by) {
                rest.users = {
                  connect: {
                    id: Number(register_by)
                  }
                };
              }

              _context5.next = 7;
              return prisma.authors.update({
                where: {
                  id: Number(id)
                },
                data: _objectSpread({}, rest)
              });

            case 7:
              authorUpdate = _context5.sent;
              pubSub.publish('author', {
                author: {
                  mutation: 'UPDATED',
                  data: authorUpdate
                }
              });
              return _context5.abrupt("return", authorUpdate);

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function updateAuthor(_x17, _x18, _x19, _x20) {
      return _updateAuthor.apply(this, arguments);
    }

    return updateAuthor;
  }(),
  // CODIGO CON ARG INICIAL
  // createBook:(parent,args,{prisma,pubSub},info)=>{
  //     const isAuhtorExist=db.authors.some(author=>author.id===args.writted_by)
  //     if(!isAuhtorExist){
  //         throw new Error('Libro no existe')
  //     }
  //     const book={
  //         id:uuidv4(),
  //         ...args
  //     }
  //     db.books.push(book)      
  //     pubSub.publish(`book-${book.writted_by}`,{
  //     //pubSub.publish('book',{
  //         book:{
  //             mutation:'CREATED',
  //             ...book
  //         }
  //     })
  //     return book
  // },
  createBook: function () {
    var _createBook = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(parent, args, _ref11, info) {
      var prisma, pubSub, request, userId, writted_by, register_by, rest, newBook;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              prisma = _ref11.prisma, pubSub = _ref11.pubSub, request = _ref11.request;
              userId = (0, _index.getUserId)(request);
              writted_by = args.writted_by, register_by = args.register_by, rest = (0, _objectWithoutProperties2["default"])(args, ["writted_by", "register_by"]); //     const {id,...data}=args

              _context6.next = 5;
              return prisma.books.create({
                data: _objectSpread(_objectSpread({}, rest), {}, {
                  authors: {
                    connect: {
                      id: Number(writted_by)
                    }
                  },
                  users: {
                    connect: {
                      id: Number(register_by)
                    }
                  }
                })
              });

            case 5:
              newBook = _context6.sent;
              pubSub.publish("book-".concat(newBook.writted_by), {
                book: _objectSpread({
                  mutation: 'CREATED'
                }, newBook)
              });
              return _context6.abrupt("return", newBook);

            case 8:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function createBook(_x21, _x22, _x23, _x24) {
      return _createBook.apply(this, arguments);
    }

    return createBook;
  }(),
  //CODIGO UPDATE CON ARG INICIAL
  // updateBook:(parent,args,{db,pubSub},info)=>{
  //     const {id,...data}=args
  //     const bookExist=db.books.find(book=>book.id===id)
  //     if (!bookExist){
  //         throw new Error ("Libro no existe")
  //     }
  //     const authorExist=db.authors.some(author=>author.id===args.writted_by)
  //     if(args.writted_by && !authorExist) throw new Error ("Autor no existe")
  //     db.books=db.books.map(book=>{
  //         if(book.id===id){
  //             book={...book,...data}
  //             return book
  //         }
  //         return book
  //     })
  //     const bookUpdate={...bookExist,...data}
  //     pubSub.publish(`book-${bookUpdate.writted_by}`,{
  //         book:{
  //             mutation:'UPDATED',
  //             ...bookUpdate
  //         }
  //     })
  //     return bookUpdate
  // },
  updateBook: function () {
    var _updateBook = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(parent, args, _ref12, info) {
      var prisma, pubSub, request, userId, writted_by, register_by, id, rest, bookUpdate;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              prisma = _ref12.prisma, pubSub = _ref12.pubSub, request = _ref12.request;
              userId = (0, _index.getUserId)(request);
              console.log("El xxxx que viene es ".concat(args.register_by));
              writted_by = args.writted_by, register_by = args.register_by, id = args.id, rest = (0, _objectWithoutProperties2["default"])(args, ["writted_by", "register_by", "id"]);

              if (writted_by) {
                rest.authors = {
                  connect: {
                    id: Number(writted_by)
                  }
                };
              }

              if (register_by) {
                rest.users = {
                  connect: {
                    id: Number(register_by)
                  }
                };
              }

              _context7.next = 8;
              return prisma.books.update({
                where: {
                  id: Number(id)
                },
                data: _objectSpread({}, rest)
              });

            case 8:
              bookUpdate = _context7.sent;
              pubSub.publish("book-".concat(bookUpdate.writted_by), {
                book: _objectSpread({
                  mutation: 'UPDATED'
                }, bookUpdate)
              });
              return _context7.abrupt("return", bookUpdate);

            case 11:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    function updateBook(_x25, _x26, _x27, _x28) {
      return _updateBook.apply(this, arguments);
    }

    return updateBook;
  }(),
  deleteBook: function () {
    var _deleteBook = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(parent, _ref13, _ref14, info) {
      var id, prisma, pubSub, request, userId, bookDeleted;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              id = _ref13.id;
              prisma = _ref14.prisma, pubSub = _ref14.pubSub, request = _ref14.request;
              userId = (0, _index.getUserId)(request);
              _context8.next = 5;
              return prisma.books["delete"]({
                where: {
                  id: Number(id)
                }
              });

            case 5:
              bookDeleted = _context8.sent;
              pubSub.publish("book-".concat(bookDeleted.writted_by), {
                book: _objectSpread({
                  mutation: 'DELETED'
                }, bookDeleted)
              });
              return _context8.abrupt("return", bookDeleted);

            case 8:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    function deleteBook(_x29, _x30, _x31, _x32) {
      return _deleteBook.apply(this, arguments);
    }

    return deleteBook;
  }()
};
var _default = Mutation;
exports["default"] = _default;