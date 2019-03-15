import { Query as CustomerQuery, Customer } from './customer/resolvers';

export default {
    Query: {
        ...CustomerQuery,
    },
    //Mutation: {
        //...CustomerMutation,
    //},
    Customer,
};