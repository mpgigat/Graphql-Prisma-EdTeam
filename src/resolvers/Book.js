import {getUserId} from '../utils'
const Book={
    writted_by:(parent,args,{prisma,request},info)=>{
        const userId=getUserId(request)
        return prisma.books.findOne({
            where:{
                id:parent.id
            }
        }).authors()
    },
    register_by:(parent,args,{prisma,request},info)=>{
        const userId=getUserId(request)
        return prisma.books.findOne({
            where:{
                id:parent.id
            }
        }).users()
    }
}
export default Book

