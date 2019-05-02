import axios from 'axios';

export class favoriteRepository {
    url = "http://ec2-18-222-255-36.us-east-2.compute.amazonaws.com:4000";

    getFavorites() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/users/favorite?user_id=${localStorage.getItem('token')}`)
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));
        });
    }

    addFavorite(recipeId) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/users/favorite/add?user_id=${localStorage.getItem('token')}`, {recipe_id: recipeId})
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));
        });
    }

    deleteFavorite(recipeId) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/users/favorite/delete?user_id=${localStorage.getItem('token')}`, {recipe_id: recipeId})
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));
        });
    }
}

export default favoriteRepository;