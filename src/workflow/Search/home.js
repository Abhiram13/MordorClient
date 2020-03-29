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
      }
      this.backUpData = this.state.data;
   }

   async callBackendAPI() {
      const response = await fetch('/getItem');
      const body = await response.json();

      if (response.status !== 200) throw Error(body.message);
      return body;
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
      localStorage.clear();
      this.props.history.push('/');
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
      const { username, firstname, lastname } = JSON.parse(localStorage.getItem('user'));
      const { data } = this.state;
      console.log(data);

      return (
         <Fragment>
            <header className="col-sm p-0">
               <h3 className="m-0 p-0 py-3 text-center">{`Welcome, ${firstname} ${lastname}`}</h3>
               <small onClick={() => this.logout()}>Logout</small>
            </header>

            <div className="container p-0 mx-auto d-flex justify-content-between mt-5">

               <ItemProvider value={{ total: data.length, data: data }}>
                  <Aside getValueForSearch={this.changeCharacter.bind(this)} />
               </ItemProvider>

               <div className="widthAuto border rounded d-flex flex-wrap" style={{ width: '75%' }}>
                  {(data !== '') &&
                     data.map((item, i) => {
                        return (
                           <Fragment key={item._id}>
                              <div
                                 className="col-sm-3 p-0 rounded border mr-5 mb-4 pointer effect position-relative"
                                 title={`${item.itemName} | ${item.category}`}
                                 onClick={() => this.pushDetails(item)}
                                 style={{ height: '200px' }}>
                                 <div className="rounded w-100 h-100">
                                    {
                                       (item.imageURL === "")
                                          ? <div className="w-100 h-100" style={{ backgroundColor: 'aliceblue' }}></div>
                                          : <img src={item.imageURL} className="w-100 h-100" alt={item.itemName} />
                                    }
                                 </div>
                                 <div className="d-flex justify-content-between position-absolute bg-white px-2 py-1 shadow" style={{ bottom: '10%', marginLeft: '25%', borderRadius: '20px' }}>
                                    <h5 className="m-0 p-0" style={{ fontSize: 'medium' }}>{item.itemName}</h5>
                                    <img src={item.categoryLogo} width="15" height="15" alt={item.category} className="align-self-center" />
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
      return (
         <Fragment>
            {
               (Boolean(JSON.parse(localStorage.getItem('user'))))
                  ? this.renderHome()
                  : this.renderErrorMessage()
            }
         </Fragment>
      )
   }
}

export default withRouter(Home);