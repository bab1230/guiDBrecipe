import React from 'react';

class IngredientsRepo extends React.Component {

  url = "http://ec2-18-222-255-36.us-east-2.compute.amazonaws.com:4000";
    
  getIngredients() {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/users/pantry`)
          .then(resp => resolve(resp.data))
          .catch(resp => alert(resp));
  });
  }
}

export default IngredientsRepo;
