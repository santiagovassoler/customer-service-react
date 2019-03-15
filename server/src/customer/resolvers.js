import DataLoader from 'dataloader';

export const Query = {

    customers: (_, __, context) => 
        Promise.resolve(context.datastore.customers),
    
    filterByStatus: (_, { status }, context) =>
        Promise.resolve(context.datastore.customers.filter(customer => customer.status === status)),

    searchCustomers: (_, {input: {status} }, context) =>
    Promise.resolve(context.datastore.customers.filter(customer => customer.status === status || status === "all")),
        
};

export const Customer = {
    first_name: customer =>
        Promise.resolve(`${customer.first_name}`),
};

export const getCustomersById = datastore => ids =>
    Promise.resolve(
        ids.map(id => datastore.customers.find(customer => customer.id == id)),
        datastore.customers.filter(customer => ids.includes(customer.id)),
    );
export const dataloaders = datastore => ({
    customerById: new DataLoader(getCustomersById(datastore)),
});
