import React from 'react';
import axios from 'axios';

class IngredientsRepo extends React.Component {

  url = "http://ec2-18-222-255-36.us-east-2.compute.amazonaws.com:4000";

    
    
  getIngredients(userid) {
    return new Promise((resolve, reject) => {
      return axios.get(this.url + `/users/pantry/?user_id=${localStorage.getItem('token')}`)
          .then(resp => resolve(resp.data))
          .catch(resp => alert(resp));
    });
    
  }

  deleteIngredient( ingredient ){
    return new Promise((resolve, reject) => {
      axios.post(`${this.url}/users/pantry/delete?user_id=${localStorage.getItem('token')}`, {body: {ingredient}})
          .then(resp => resolve(resp.data))
          .catch(resp => alert(resp));
  });
  }

  addIngredient(ingredient){
    return new Promise((resolve, reject) => {
      axios.post(`${this.url}/users/pantry/update?user_id=${localStorage.getItem('token')}`, {body: { ingredient_name: ingredient.ingredient_name , amount: ingredient.amount, unit: ingredient.unit}})
          .then(resp => resolve(resp.data))
          .catch(resp => alert(resp));
  });
  }
}

export default IngredientsRepo;
