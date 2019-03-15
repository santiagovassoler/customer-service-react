import Base from '../base';


const Customer = `

input SearchCustomersInput{
  status: String
}

extend type Query {
  	customers: [Customer]
  	filterByStatus(status: String): [Customer]
  	searchCustomers(input: SearchCustomersInput): [Customer!]!
}
type Customer {
    id: ID!
    first_name: String
    last_name: String
    email: String
    status: String
    phone_number: String
}
`;

export default () => [Customer, Base];
