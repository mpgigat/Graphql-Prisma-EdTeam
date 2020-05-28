
//import { PubSub } from 'graphql-yoga'
import {generateToken,hashPassword,validatePassWord,getUserId} from '../utils/index'

const Mutation={
    //cambiamos arg por data, segun cambio a input del esquema, 
    //en createbook, esta la otra forma

    signUp:async (parent,{data},{prisma},info)=>{
        const password=await hashPassword(data.password)
        const user= await prisma.users.create({  // ESTO SOBREESCRIBE EN DATA EL PASWORD YA HASHEADO
            data:{
                ...data,
                password
            }
        })
        return {
            user,
            token:generateToken(user.id)
        }
    },
    logIn:async (parent,{data},{prisma},info)=>{
        const user =await prisma.users.findOne({
            where:{
                email:data.email
            }
        })

        const isValid=await validatePassWord(data.password,user.password)
        if(!isValid){
            throw new Error ('Contraseña incorrecta')
        }

        return{
            user,
            token:generateToken(user.id)
        }
    },
     //cambiamos arg por data, segun cambio a input del esquema
    updateUser:async (parent,{id,data},{prisma,request},info)=>{
        //ya no necesimatos la siguiente linea porque data ya esta arriba
       //const{id,...data}=args
       const userId=getUserId(request)
       const{password}=data
       if(password){
           data.password=await hashPassword(data.password)
       }

       return prisma.users.update({
        where:{
            id:Number(id)
        },
        data
    })
    },
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
    createAuthor:async(parent,{data},{prisma,pubSub,request},info)=>{   
        const userId=getUserId(request)
        const {register_by,...rest}=data
        const newAuthor=await prisma.authors.create({
            data:{
                ...rest,
                users:{
                    connect:{
                        id:Number(register_by)
                    }
                }
            }
        })
        pubSub.publish('author',{
            author:{
                mutation:'CREATED',
                data:newAuthor
            }
        })
        return newAuthor
    },

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
    updateAuthor:async (parent,{id,data},{prisma,pubSub,request},info)=>{      
        const userId=getUserId(request)  
        const {register_by,...rest}=data
        if (register_by){
            rest.users={
                connect:{
                    id:Number(register_by)
                }
            }
        }
        
        const authorUpdate=await prisma.authors.update({
            where:{
                id:Number(id)
            },
            data:{
                ...rest
            }
        })

        pubSub.publish('author',{
            author:{
                mutation:'UPDATED',
                data:authorUpdate
            }
        }) 
        return authorUpdate
    },
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
    createBook:async(parent,args,{prisma,pubSub,request},info)=>{
        const userId=getUserId(request)
       const{writted_by,register_by,...rest}=args
//     const {id,...data}=args
       const newBook= await prisma.books.create({
           data:{
                ...rest,
                authors:{
                    connect:{
                        id:Number(writted_by)
                    }
                },
                users:{
                    connect:{
                        id:Number(register_by)
                    }
                }
            }
       })
        
        pubSub.publish(`book-${newBook.writted_by}`,{
            book:{
                mutation:'CREATED',
                ...newBook                
            }
        })
        return newBook
    },
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
    updateBook:async(parent,args,{prisma,pubSub,request},info)=>{
        const userId=getUserId(request)
        console.log(`El xxxx que viene es ${args.register_by}`)
        const {writted_by,register_by,id,...rest}=args
        if(writted_by){
            rest.authors={
                connect:{
                    id:Number(writted_by)
                }
            }
        }

        if (register_by){
            rest.users={
                connect:{
                    id:Number(register_by)
                }
            }
        }
 
        const bookUpdate=await prisma.books.update({
            where:{
                id:Number(id),
            },            
            data:{
                ...rest,
            }
        
        })

        pubSub.publish(`book-${bookUpdate.writted_by}`,{
            book:{
                mutation:'UPDATED',
                ...bookUpdate
            }
        })
        return bookUpdate
    },
    deleteBook: async(parent,{id},{prisma,pubSub,request},info)=>{
        const userId=getUserId(request)
        const bookDeleted= await prisma.books.delete({
            where:{
                id:Number(id)
            }
        })
        pubSub.publish(`book-${bookDeleted.writted_by}`,{
            book:{
                mutation:'DELETED',
                ...bookDeleted
            }
        })

        return bookDeleted
    }
}

export default Mutation


