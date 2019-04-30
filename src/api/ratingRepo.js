import axios from 'axios';

export class ratingRepo {
    url = "http://ec2-18-222-255-36.us-east-2.compute.amazonaws.com:4000/rating";

    getRatings() {
        return new Promise((resolve, reject) => {
            axios.get(this.url, this.config)
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));
        });
    }

    getRating(recipe_id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/${recipe_id}`, this.config)
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));
        });
    }

    addRating(recipe_id, review) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/${recipe_id}`, review, this.config)
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));
        });
    }
}

export default recipeRepo;