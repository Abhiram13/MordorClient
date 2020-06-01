import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import request, { getUser } from '../../helpers/helper';
import { ItemProvider } from '../../context/context';
import Aside from './Aside/aside';
import Header from './Header/header';

/**
  * @typedef LikedbyUser
  * @property {string} [firstname]
  * @property {string} [lastname]
  * @property {string} [username]
  */

/**
 * @typedef Item
 * @property {string} [_id]
 * @property {string} [category]
 * @property {string} [categoryLogo]
 * @property {array} [comments]
 * @property {string} [description]
 * @property {string} [imageURL]
 * @property {string} [itemName]
 * @property {LikedbyUser[]} [likes]
 * @property {number} [rating]
 */

 /**
  * @typedef State
  * @property {Item[]} data
  * @property {string} char
  * @property {Item[]} backup
  * @property {User} user
  * @property {boolean} loggedIn
  */

  /**
   * @typedef User
   * @property {string} [_id]
   * @property {array} [comments]
   * @property {string} [firstname]
   * @property {boolean} [isAdmin]
   * @property {string} [lastname]
   * @property {string[]} [likes]
   * @property {boolean} [loggedIn]
   * @property {string} [password]
   * @property {string} [username]
   */

class Home extends React.Component {
   constructor(props) {
      super(props);
      /**
       * @type {State}
       */
      this.state = {
         data: [],
         char: '',
         backup: [],
         user: {},
         loggedIn: false,
      }
   }

   componentDidMount() {
      let userid = document.cookie.split('=')[1];

      if (userid === 'null' || document.cookie === '') {
         window.location.assign('/');
         return;
      }
      //this below function calls server to get the details of User through UserID      
      request.get(`${getUser()}/home`).then((response) => {         
         this.setState({
            user: response[0],
         })
      })

      //this below function calls server to get the list of all Items
      request.get('getItem').then((response) =>
         this.setState({
            data: response.documents,
            backup: response.documents,
         })
      )
   }

   /**    
    * @param {string} character 
    * @returns {void}
    */
   changeCharacter(character) {
      /**
       * @type {object}
       */
      let array = this.state.backup;

      /**
       * @type {Array}
       */
      let anotherArray = [];

      if (character === '') {
         this.setState({ data: this.state.backup });
         return;
      }

      switch (character.substring(0, 1)) {
         case '#':
            if (character.length > 1) {
               let str = character.slice(1, character.length);

               array.filter((item) => {
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

   /**
    * @param {Item} item
    * @returns {void}
    */
   like = (item) => {
      const obj = {
         item: item,
         user: this.state.user,
      }

      request.post('likeItemByUser.js', obj, (xhttp) => {
         const response = JSON.parse(xhttp.responseText);

         //this below function calls server to get the list of all Items
         if (response) {
            request.get('getItem').then((res) =>
               this.setState({
                  data: res.documents,
                  backup: res.documents,
                  user: response.user,
               })
            )
         }
      })
   }

   /**
    * @param {Item} item
    * @returns {void}
    */
   itemDetails = (item) => {
      const user = this.state.user;
      this.props.history.push(`/${user._id}_${item._id}/details`);
      return;
   }

   /**
    * @param {Item} item
    * @param {string} userId
    * @returns {boolean}
    */
   findLikedItem = (item, userId) => {
      for (let i = 0; i < item.likes.length; i++) {
         if (userId === item.likes[i].username) {
            return true;
         }
      }
      return false;
   }

   render() {
      const { data } = this.state;
      const contextObject = {
         total: data.length,
         data: data,
      }      

      /**
       * @type {string}
       */
      const userId = window.location.pathname.split('/')[1];

      return (
         <Fragment>
            <Header />
            <div className="container p-0 mx-auto mt-5">
               <ItemProvider value={contextObject}>
                  <Aside getValueForSearch={this.changeCharacter.bind(this)} />
               </ItemProvider>

               <hr />

               <div className="d-flex flex-wrap position-relative justify-content-between">
                  {
                     (data !== []) &&
                     data.map((item, i) => {
                        return (
                           <Fragment key={item._id}>
                              <section className="p-0 shadow mb-5 bg-white" style={{ width: '22%', borderRadius: '13px' }}>
                                 <section className="col-sm-9 p-0 box_shadow mx-auto mt-3" style={{ borderRadius: '13px' }}>
                                    {
                                       (item.imageURL === "")
                                          ? <img
                                             src="https://images.vexels.com/media/users/3/130737/isolated/preview/eda05fc56dfe940a821c06439bb7d49b-growing-plant-icon-by-vexels.png"
                                             className="w-100 h-100"
                                             alt=""
                                          />
                                          : <img src={item.imageURL} className="w-100 h-100" alt={item.itemName} />
                                    }
                                 </section>

                                 <section className="col-sm p-0 bg-white h-25 mt-3 radius">
                                    <section>
                                       <h5 className="text-center itemTitle pointer m-0 itemTitle" onClick={() => this.itemDetails(item)}>{item.itemName}</h5>
                                       <small className="d-block text-center lightGrey">{item.category}</small>
                                    </section>
                                    <section className="d-flex justify-content-between px-3 my-2">
                                       <small className="pointer" onClick={() => this.like(item)}>
                                          {
                                             this.findLikedItem(item, userId)
                                                ? <span style={{ color: '#FF1968' }}>Liked: {item.likes.length}</span>
                                                : <span>Like: {item.likes.length}</span>
                                          }
                                       </small>
                                       {/* <small>Comment</small> */}
                                    </section>
                                 </section>
                              </section>
                           </Fragment>
                        )
                     })
                  }
               </div>

            </div>
         </Fragment>
      )
   }
}

export default withRouter(Home);