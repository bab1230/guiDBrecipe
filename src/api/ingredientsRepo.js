import React from 'react';
import axios from 'axios';

class IngredientsRepo extends React.Component {
  url = "http://ec2-13-59-82-51.us-east-2.compute.amazonaws.com:4000";

  getIngredients() {
    return new Promise((resolve, reject) => {
      return axios.get(this.url + `/users/pantry?user_id=${localStorage.getItem('token')}`)
          .then(resp => resolve(resp.data))
          .catch(resp => alert("Could not load your ingredients"));
    });

  }

  deleteIngredient( ingredient ){
    return new Promise((resolve, reject) => {
      axios.post(`${this.url}/users/pantry/delete?user_id=${localStorage.getItem('token')}`, { ingredient_name: ingredient.ingredient_name })
          .then(resp => resolve(resp.data))
          .catch(resp => alert("Could not delete ingredient"));
  });
  }

  addIngredient(ingredient){
    return new Promise((resolve, reject) => {
      axios.post(`${this.url}/users/pantry/add?user_id=${localStorage.getItem('token')}`, { ingredient_name: ingredient.ingredient_name , amount: ingredient.amount, unit: ingredient.unit})
          .then(resp => resolve(resp.data))
          .catch(resp => alert("Invalid Ingredient"));
  });
  }
}

export default IngredientsRepo;
