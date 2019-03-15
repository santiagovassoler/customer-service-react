  import React, {Fragment, Component} from 'react';
  import PropTypes from 'prop-types';
  import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
  import Table from '@material-ui/core/Table';
  import TableBody from '@material-ui/core/TableBody';
  import TableCell from '@material-ui/core/TableCell';
  import TableHead from '@material-ui/core/TableHead';
  import TableRow from '@material-ui/core/TableRow';
  import Paper from '@material-ui/core/Paper';
  import  gql  from 'graphql-tag';
  import { Query } from 'react-apollo';
  import NativeSelects from './NativeSelects'
  import Fab from '@material-ui/core/Fab';
  import { purple } from '@material-ui/core/colors'

  const styles = theme => ({
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    cssRoot: {
      '&:hover': {color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
      },
    },
    margin: {
      margin: theme.spacing.unit * 2,
    },
  });

  const redTheme = createMuiTheme({ 
    typography: {
        useNextVariants: true,
      }, 
    palette: { 
        primary: { 
          main:'#ef5350'
        }, 
      }
  })
  const blueTheme = createMuiTheme({ 
    typography: {
      useNextVariants: true,
    }, 
    palette: { 
      primary: { 
        main:'#5c6bc0'
      }, 
    }
  })
  const yellowTheme = createMuiTheme({ 
    typography: {
      useNextVariants: true,
    }, 
    palette: { 
      primary: { 
        main:'#ffca28'
      }, 
    }
  })

  const SEARCH_CUSTOMERS = gql`  
    query($search: String) {
    searchCustomers(input: {status: $search}) {
      id
      first_name
      last_name
      email
      status
      phone_number
    }
  }
  ` ;

  class CustomerList extends Component {

    constructor(props) {
        super(props)
        this.state = { keyword: 'all', filters: { status: 'all'} };
        this.setSearch = this.setSearch.bind(this);
        this.setFilters = this.setFilters.bind(this);
        }

      setSearch(e) {
          this.setState({
              keyword: e.target.value
          });
      }
      setFilters(e) {
          this.setState({
              filters: e.target.value
          })
      }

      render() {
      const { classes } = this.props;
      let text = this.state.keyword;


      return (
        
        <Query 
          query={SEARCH_CUSTOMERS} 
          variables={{ search: text, input: {status: '',}}}
        >
        {({ loading, error, data}) => {
           if(loading) return <h4>Loading</h4>;
           if(error) console.log(error);   
           return(    
            <Fragment>
            <Paper className={classes.root}>
             <Table className={classes.table}>
              <TableHead>
               <TableRow>
                 <TableCell>First name</TableCell>
                 <TableCell align="right">Last name</TableCell>
                 <TableCell align="right">Email</TableCell>
                 <TableCell align="right"><NativeSelects handleSearch={this.setSearch} search={ text } /></TableCell>
                 <TableCell align="right">Phone</TableCell>
               </TableRow>
               </TableHead>
               <TableBody>
               {data.searchCustomers.map(searchCustomers => {
               return(
                <TableRow hover key={searchCustomers.id}>
                  <TableCell component="th" scope="row">{searchCustomers.first_name}</TableCell>
                  <TableCell align="right">{searchCustomers.last_name}</TableCell>
                  <TableCell align="right">{searchCustomers.email}</TableCell>
                  <TableCell align="right">
                  <MuiThemeProvider 
                    theme={
                      (searchCustomers.status === 'Hot' )  ? redTheme  : 
                      (searchCustomers.status === 'Cold')  ? blueTheme :
                       yellowTheme
                      }
                     >
                     <Fab
                     size="medium" 
                     color="primary"
                     variant="extended" 
                     className={classes.margin}
                     >
                     {searchCustomers.status}                                            
                     </Fab>
                  </MuiThemeProvider>
                  </TableCell>
                  <TableCell align="right">{searchCustomers.phone_number}</TableCell>
                  </TableRow> 
                      );
                    }
                )}
              </TableBody>
             </Table>
            </Paper>
           </Fragment>
          );
         }
        }
        </Query>
      );
     }
    }

  CustomerList.propTypes = {
        classes: PropTypes.object.isRequired,
  };
  export default withStyles(styles)(CustomerList);      