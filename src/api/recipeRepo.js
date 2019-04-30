import axios from 'axios';

export class recipeRepo {
    url = "http://ec2-18-222-255-36.us-east-2.compute.amazonaws.com:4000/all_recipes";

    getRecipes() {
        return new Promise((resolve, reject) => {
            axios.get(this.url, this.config)
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));
        });
    }

    getRecipe(recipe_id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/${recipe_id}`, {params: { recipe_id: 1 }})
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));
        });
    }

    addReview(recipe_id, review) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/${recipe_id}`, review, this.config)
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));
        });
    }
}

export default recipeRepo;