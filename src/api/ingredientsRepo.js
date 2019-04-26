import React from 'react';

class IngredientsRepo extends React.Component {


    
  render() {
    return <p>{this.state.someKey}</p>;
  }


  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default IngredientsRepo;
