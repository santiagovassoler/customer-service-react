import { makeExecutableSchema } from 'graphql-tools';
import Base from './base';
import Customer from './customer/schema';
import resolvers from './resolvers';

export default makeExecutableSchema({
    typeDefs: [Base, Customer],
    resolvers,
    logger: { log: e => console.log(e) },
});