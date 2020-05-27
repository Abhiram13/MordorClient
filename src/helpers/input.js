import React from 'react';

export default class Input extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         [this.props.id]: '',
      }
   }

   eventHandler = (event) => {
      this.setState({
         [this.props.id]: event.target.value,
      }, () => this.props.value(this.state[this.props.id]));
   }

   renderInput() {
      switch (this.props.type) {
         case 'text':
            return <input type="text" className={this.props.class} placeholder={this.props.placeholder} id={this.props.id} value={this.state[this.props.id]} onChange={this.eventHandler} />
         case 'number':
            return <input type="text" className={this.props.class} placeholder={this.props.placeholder} id={this.props.id} value={this.state[this.props.id]} onChange={this.eventHandler} />
         default:
            return <input type="password" className={this.props.class} placeholder={this.props.placeholder} id={this.props.id} value={this.state[this.props.id]} onChange={this.eventHandler} />
      }
   }

   render() {
      return this.renderInput();
   }
}