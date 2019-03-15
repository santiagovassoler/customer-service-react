import data from './data';
import { dataloaders as customerDataloaders } from './customer/resolvers';


export default request => ({
    id: data,
    datastore: data,
    dataloaders: {
        ...customerDataloaders(data),
    },
});