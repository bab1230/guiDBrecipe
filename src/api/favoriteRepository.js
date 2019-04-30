import axios from 'axios';

export class favoriteRepository {
    url = "http://ec2-18-222-255-36.us-east-2.compute.amazonaws.com:4000/all_recipes";
    /*config = {
        headers: {
            Authorization: 'Me'
        }
    };*/

    getFavorites() {
        return new Promise((resolve, reject) => {
            axios.get(this.url, this.config)
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));
        });
    }

    getFavorite(favoriteId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/${favoriteId}`, this.config)
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));
        });
    }

    updateFavorite(favoriteId, favorite) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/${favoriteId}`, favorite, this.config)
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));
        });
    }

    addFavorite(favorite) {
        return new Promise((resolve, reject) => {
            axios.post(this.url, favorite, this.config)
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));
        });
    }

    deleteFavorite(favoriteId) {
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/${favoriteId}`, this.config)
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));
        });
    }
}

export default favoriteRepository;