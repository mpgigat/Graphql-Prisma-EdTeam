import {GraphQLServer,PubSub} from 'graphql-yoga'
import Query from './resolvers/query'
import db from './db'
import Author from './resolvers/Author'
import Book from './resolvers/Book'
import Mutation from './resolvers/mutation'
import Subscription from './resolvers/Subscription'
import {PrismaClient} from '@prisma/client'

const pubSub= new PubSub()
const prisma= new PrismaClient()
const context ={
    pubSub,
    prisma
}
const resolvers={
    Query,
    Author,
    Book,
    Mutation,
    Subscription
}
const server = new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers,
    context: request => {
        return{
            ...request,
            ...context
        }
    }
})
server.start(()=>console.log('Server Running en http://localhost:4000'))


