import React from 'react';
import axios from 'axios';

class IngredientsRepo extends React.Component {

  url = "http://ec2-18-222-255-36.us-east-2.compute.amazonaws.com:4000";

    body = {
      user_id: "1"
    }
    
    
  getIngredients() {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/users/pantry`, {
        user_id: '1'
      })
          .then(resp => resolve(resp.data))
          .catch(resp => alert(resp));
    });
  }

  deleteIngredient(data){
    return new Promise((resolve, reject) => {
      axios.post(`${this.url}/users/pantry/delete`, data)
          .then(resp => resolve(resp.data))
          .catch(resp => alert(resp));
  });
  }
}

export default IngredientsRepo;
