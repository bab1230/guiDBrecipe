import axios from 'axios';

class UserRepository {
  URL = "http://ec2-13-59-82-51.us-east-2.compute.amazonaws.com:4000";

    login(user){
        return new Promise((resolve, reject) => {
            return axios.post(this.URL + '/users/login', user)
                .then(resp => resolve(resp.data))
                .catch(resp => reject(resp));
        })
    }

    signUp(newUser) {
        return new Promise((resolve, reject) => {
            return axios.post(this.URL + '/users/register', newUser)
                .then(resp => resolve(resp.data))
                .catch(resp => reject(resp));
        })
    }

    updateUser(user, userId) {
        return new Promise((resolve, reject) => {
            return axios.post(this.URL + '/users/info/update', user, {params :{
                user_id: userId
            }}).then(resp => resolve(resp.data))
                .catch(resp => reject(resp));
        })
    }
    getUser(userId) {
        return new Promise((resolve, reject) => {
            return axios.get(this.URL + '/users/info', {
                params: {
                    user_id: userId
                }
            }).then(resp => resolve(resp.data))
                .catch(resp => reject(resp));
        })
    }
}

export default UserRepository;
