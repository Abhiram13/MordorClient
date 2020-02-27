/* eslint-disable no-lone-blocks */
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: '',
      secondNameValue: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  async callBackendAPI() {
    const response = await fetch('/get');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  componentWillMount() {
    let XHTTP = new XMLHttpRequest();
    XHTTP.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        console.log('DATA SENT');
        console.log(XHTTP);
      } else {
        console.log('FAILED FROM CLIENT SIDE');
        console.log(XHTTP);
      }
    }
    XHTTP.open('POST', '/app.js', true)
    XHTTP.send({value: 'HEllo from React'});
  }

  componentDidMount() {
    console.log('MOUNTED');
    this.callBackendAPI()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }  

  handleChange = event => {
    if (event.target.id === 'name') {
      this.setState({ nameValue: event.target.value })
    } else {
      this.setState({ secondNameValue: event.target.value })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container pt-5">
          <div className="d-flex col-sm-5 p-0 justify-content-between">
            <input type="text" id="name" value={this.state.nameValue} onChange={this.handleChange} />
            <input type="text" id="secondName" value={this.state.secondNameValue} onChange={this.handleChange} />
            <button type="button" className="btn btn-info">Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
