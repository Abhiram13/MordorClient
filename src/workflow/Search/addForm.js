import React from 'react';

class Form extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         itemName: '',
         description: '',
         category: '',
         imageURL: '',
         rating: 0,
      }
      this.changeValue = this.changeValue.bind(this);
   }

   /**
    * @param {object} event - returns the element by id which triggered the Event
    */
   changeValue = event => {
      switch (event.target.id) {
         case 'ItemName':
            this.setState({
               itemName: event.target.value,
            });
            break;
         case 'Category':
            this.setState({
               category: event.target.value,
            });
            break;
         case 'ImageURL':
            this.setState({
               imageURL: event.target.value,
            });
            break;
         case 'Rating':
            this.setState({
               rating: Number(event.target.value),
            });
            break;
         case 'Description':
            this.setState({
               description: event.target.value,
            });
            break;         
         default:
            return null;
      }
   }

   addData() {
      let XHTTP = new XMLHttpRequest();
      XHTTP.open('post', '/item.js', true);
      XHTTP.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      XHTTP.onreadystatechange = () => {
         if (XHTTP.readyState === 4 && XHTTP.status === 200) {
            //
         }
      }
      XHTTP.send(JSON.stringify(this.state));
   }

   render() {
      return (
         <React.Fragment>
            <section className="container p-0 mx-auto mt-5">
               <div className="col-sm-9 p-0 mx-auto shadow p-3">
                  <div className="d-flex justify-content-between">
                     <input
                        className="d-block col-sm p-0 rounded border p-2 mb-3"
                        id="ItemName"
                        placeholder="Name of the Item"
                        onChange={this.changeValue}
                        value={this.state.itemName}
                     />
                     <input
                        className="d-block col-sm p-0 rounded border p-2 mb-3"
                        id="Category"
                        placeholder="Item Category"
                        onChange={this.changeValue}
                        value={this.state.category}
                     />
                  </div>
                  <div className="d-flex justify-content-between">
                     <input
                        className="d-block col-sm p-0 rounded border p-2 mb-3"
                        id="ImageURL"
                        placeholder="URL of the Item"
                        onChange={this.changeValue}
                        value={this.state.imageURL}
                     />
                     <input
                        className="d-block col-sm p-0 rounded border p-2 mb-3"
                        id="Rating"
                        placeholder="Item Rating"
                        onChange={this.changeValue}
                        value={this.state.rating}
                     />
                  </div>
                  <textarea
                     className="d-block col-sm p-0 rounded border p-2 mb-3"
                     id="Description"
                     placeholder="Description"
                     onChange={this.changeValue}
                     value={this.state.description}
                  >
                  </textarea>
                  <button className="btn btn-info mx-auto" onClick={() => this.addData()}>Submit</button>
               </div>
            </section>
         </React.Fragment>
      )
   }
}

export default Form;