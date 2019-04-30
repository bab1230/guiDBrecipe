import React from 'react';
import axios from 'axios';

class RecipeRepository extends React.Component {

  url = "http://ec2-18-222-255-36.us-east-2.compute.amazonaws.com:4000";

    
    
  getRecipes() {
    return new Promise((resolve, reject) => {
      return axios.get(this.url + "/all_recipes")
          .then(resp => resolve(resp.data))
          .catch(resp => alert(resp));
    });
  }

}

export default RecipeRepository;