import axios from 'axios';

export class RecipeRepo {
    url = "http://ec2-18-188-0-10.us-east-2.compute.amazonaws.com:4000";

    getRecipes() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/all_recipes`)
                .then(resp => resolve(resp.data))
                .catch(resp => alert("Could not get recipes"));
        });
    }


    getRecipe(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/recipe/`, {params: { recipe_id: id }})
                .then(resp => resolve(resp.data))
                .catch(resp => alert("Could not get recipe"));
        });
    }


    getRecipeIngredients(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/recipe/ingredients`, {params: { recipe_id: id }})
                .then(resp => resolve(resp.data))
                .catch(resp => alert("Could not get ingredients"));
        });
    }

    getRating(recipe_id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/rating/${recipe_id}`)
                .then(resp => resolve(resp.data))
        });
    }


    addReview(recipe_id, diff_rating, taste_rating) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/rating/add`, { recipe_id: recipe_id, rating_diff: diff_rating, rating_taste: taste_rating })
                .then(resp => resolve(resp.data))
                .catch(resp => alert("Could not add review"));
        });
    }

    search(search) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/search`, { params: { recipe_name: search }})
                .then(resp => resolve(resp.data))
                .catch(resp => alert("Could not search for query"));
        })
    }
}

export default RecipeRepo;