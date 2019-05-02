import axios from 'axios';

export class recipeRepo {
    url = "http://ec2-18-222-255-36.us-east-2.compute.amazonaws.com:4000";

    getRecipes() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/all_recipes`, this.config)
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));
        });
    }


    getRecipe(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/recipe/`, {params: { recipe_id: id }})
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));
        });
    }


    getRecipeIngredients(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/recipe/ingredients`, {params: { recipe_id: id }})
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));
        });
    }


    addReview(recipe_id, taste_rating, diff_rating) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/rating/add`, { body:{ recipe_id: recipe_id, rating_diff: diff_rating, rating_taste: taste_rating } })
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));
        });
    }
}

export default recipeRepo;