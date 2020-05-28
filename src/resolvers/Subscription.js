import {getUserId} from '../utils'
const Subscription ={    
    count:{
        subscribe(parent,args,{pubSub},info){
            let count=0

            setInterval(()=>{
                count++
                pubSub.publish('count',{
                    count
                })
            },1000)
            return pubSub.asyncIterator('count')
        }
    },
    author:{
        subscribe(parent,args,{pubSub,Request},info){
            const userId=getUserId(Request)
            return pubSub.asyncIterator('author')
        }
    },
    book:{
        subscribe(parent,{authorId},{pubSub,Request},info){ 
        //subscribe(parent,args,{db,pubSub},info){ 
            //la subscripcion la hacemos para la creacion de 
            //un libro de un autor en particular
            //el nombre del canal es unico, y por cada author habra
            //un canal           
            const userId=getUserId(Request)
            return pubSub.asyncIterator(`book-${authorId}`)
            //return pubSub.asyncIterator('book')
        }
    },
}

export default Subscription