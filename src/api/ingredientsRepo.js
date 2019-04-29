import React from 'react';
import axios from 'axios';

class IngredientsRepo extends React.Component {

  url = "http://ec2-18-222-255-36.us-east-2.compute.amazonaws.com:4000";

    
    
  getIngredients(userid) {
    return new Promise((resolve, reject) => {
      return axios.get(this.url + "/users/pantry/", {params: {user_id:userid}})
          .then(resp => resolve(resp.data))
          .catch(resp => alert(resp));
    });
    
  }

  deleteIngredient(userid, data){
    return new Promise((resolve, reject) => {
      axios.post(`${this.url}/users/pantry/delete`, {params: {user_id:userid}} , data)
          .then(resp => resolve(resp.data))
          .catch(resp => alert(resp));
  });
  }

  updateIngredients(userid, data){
    return new Promise((resolve, reject) => {
      axios.post(`${this.url}/users/pantry/update`, {params: {user_id:userid}}, data)
          .then(resp => resolve(resp.data))
          .catch(resp => alert(resp));
  });
  }
}

export default IngredientsRepo;
