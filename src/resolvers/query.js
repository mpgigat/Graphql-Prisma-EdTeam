import {getUserId} from '../utils'
const Query={
    hello(parent,args,ctx,info){
        const {name}=args
        return `Holla ${name || 'Mundo'}`
    },
    cantidad:() => 1,
    //user:(parente,args,ctx,info)=>{
    user:(parent,{id},{request,prisma},info)=>{ //otra forma colocar el argumento directamente
        //la siguiente linea es para obtener el token de jwt
        //puede simplemente ejecutar la funcion o asignarla a una varia
        const userId=getUserId(request)
        //if(!args.id){
        if(!id){
            return prisma.users.findMany()
        }
        return prisma.users.findOne({
            where:{
                id:Number(id)
            }
        })
    },
    author: (parent,{id,first,skip,orderBy},{request,prisma},info)=>{
        const userId=getUserId(request)
        if(!id){
            return prisma.authors.findMany({
                first,
                skip,
                orderBy
            })
        }
        return prisma.authors.findOne({
            where:{
                id:Number(id)
            }
        })
    },
    book: (parent,{id,first,skip,orderBy},{prisma,request},info)=>{
        const userId=getUserId(request)
        if(!id){
            return prisma.books.findMany(
                {
                    first,
                    skip,
                    orderBy
                }
            )
        }
        return prisma.books.findOne({
            where:{
                id
            }
        })
    }
    
}
export default Query