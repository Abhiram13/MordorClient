import React, { Fragment } from 'react';
import request from '../../helpers/helper';

export default class UserDashboard extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         users: '',
      }
   }

   componentDidMount() {
      request.get('getUsers').then((data) => {         
         this.setState({
            users: data,
         })
      })
   }

   render() {
      return (
         <Fragment>
            {
               (this.state.users) &&
               <table className="table table-striped">
                  <thead>
                     <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Admin</th>
                        <th scope="col">Likes</th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        this.state.users.map((item, index) => {
                           return (
                              <tr key={item.username}>
                                 <th scope="row">{index + 1}</th>
                                 <td>{item.username}</td>
                                 <td>{item.firstname}</td>
                                 <td>{item.lastname}</td>
                                 <td>{item.isAdmin ? 'True' : 'False'}</td>
                                 <td>{item.likes.length}</td>
                              </tr>
                           )
                        })
                     }
                  </tbody>
               </table>
            }
         </Fragment>
      )
   }
}