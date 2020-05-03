/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
// @ts-nocheck
import React, { Fragment, Component } from 'react';
import Aside from './Aside/aside'
import { ItemProvider } from '../../context/context'
import { withRouter } from 'react-router-dom';

class Home extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: '',
         char: '',
         backup: '',
         user: '',
         loggedIn: false,
      }
      this.backUpData = this.state.data;
   }

   async callBackendAPI() {
      const response = await fetch('/getItem');
      const body = await response.json();

      if (response.status !== 200) throw Error(body.message);
      return body;
   }

   async componentWillMount() {
      const userId = await fetch(`/${window.location.pathname.split('/')[1]}`);
      const userResponse = await userId.json();

      console.log(userResponse);

      this.setState({
         user: userResponse.user[0],
         loggedIn: userResponse.user[0].loggedIn,
      })
   }

   componentDidMount() {
      this.callBackendAPI().then((response) =>
         this.setState({ 
            data: response.documents,
            backup: response.documents,
         })
      )
   }

   pushDetails(data) {
      this.props.history.push(`/details?${data._id}`);
      window.location.reload();
   }

   logout() {
      let XHTTP = new XMLHttpRequest();
      XHTTP.open('POST', '/login.js', true);
      XHTTP.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      XHTTP.onreadystatechange = () => {
         if (XHTTP.readyState === 4 && XHTTP.status === 200) {
            let response = JSON.parse(XHTTP.responseText);
            console.log(response);
         }
      }
      XHTTP.send({login_username: this.state.user.username, loggedIn: this.state.user.loggedIn});          
   }

   renderErrorMessage() {
      return (
         <Fragment>
            <h3>Please Login</h3>
         </Fragment>
      )
   }

   changeCharacter(character) {
      let array = this.state.backup;
      let anotherArray = [];

      if (character === '') {
         this.setState({ data: this.state.backup });
         return;
      }

      switch(character.substring(0, 1)) {         
         case '#':
            if (character.length > 1) {
               let str = character.slice(1, character.length);
               array.filter(function (item) {
                  if ((item.category.substring(0, character.length - 1)).toUpperCase() === str.toUpperCase()) {
                     anotherArray.push(item);
                  }
               });
            } else return;  
            break;
         default:
            array.filter(function (item) {
               if ((item.itemName.substring(0, character.length)).toUpperCase() === character.toUpperCase()) {
                  anotherArray.push(item);
               }
            });
            break;
      }      

      this.setState({ data: anotherArray });
      return;
   }

   renderHome() {
      const { firstname, lastname } = this.state.user;
      const { data } = this.state;

      return (
         <Fragment>
            <header className="col-sm p-0">
               <h3 className="m-0 p-0 py-3 text-center">{`Welcome, ${firstname} ${lastname}`}</h3>
               <small onClick={() => this.logout()}>Logout</small>
            </header>

            <div className="container p-0 mx-auto mt-5">

               <ItemProvider value={{ total: data.length, data: data }}>
                  <Aside getValueForSearch={this.changeCharacter.bind(this)} />
               </ItemProvider>

               <hr />

               <div className="border rounded d-flex flex-wrap position-relative">
                  {(data !== '') &&
                     data.map((item, i) => {
                        console.log(item);
                        return (
                           <Fragment key={item._id}>
                              <div
                                 className="p-0 position-relative mr-3 d-flex justify-content-between mb-4 shadow-sm pointer"
                                 title={`${item.itemName} | ${item.category}`}
                                 onClick={() => this.pushDetails(item)}
                                 style={{ height: '200px', width: '48%' }}>
                                 <div className="rounded" style={{ width: '35%' }}>
                                    {
                                       (item.imageURL === "")
                                          ? <div className="w-100 h-100 bg-white shadow-sm">
                                             <img
                                                src="https://images.vexels.com/media/users/3/130737/isolated/preview/eda05fc56dfe940a821c06439bb7d49b-growing-plant-icon-by-vexels.png"
                                                className="w-100 h-100"
                                                alt="" 
                                             />
                                          </div>
                                          : <img src={item.imageURL} className="w-100 h-100" alt={item.itemName} />
                                    }
                                 </div>
                                 <div className="" style={{ width: '65%', backgroundColor: '#FFF5F5' }}>
                                    <div className="p-3">
                                       <div className="d-flex justify-content-between">
                                          <h4 className="m-0 p-0">{item.itemName}</h4>
                                          <img src='https://simpleicon.com/wp-content/uploads/pencil-256x256.png' width='20' height='20' className="align-self-center" alt="" />
                                       </div>
                                       <p className="p-0 m-0 mt-3" style={{ fontSize: 'small', overflow: 'hidden', height: '118px' }}>{item.description}</p>
                                    </div>
                                 </div>
                              </div>
                           </Fragment>
                        )
                     })
                  }
               </div>

            </div>
            <button onClick={() => this.props.history.push('/add')}>Add</button>
         </Fragment>
      )
   }

   render() {
      return this.state.loggedIn ? this.renderHome() : this.renderErrorMessage();
   }
}

export default withRouter(Home);