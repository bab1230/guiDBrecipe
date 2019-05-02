import React from 'react';
import { FavoriteList } from './FavoriteList';
import { favoriteRepository } from '../../api/favoriteRepository';
import { Link } from 'react-router-dom';
import './Favorite.css';

export class Favorite extends React.Component{
    favoriteRepository = new favoriteRepository;

    state={
        favorites: []
    };

    onDelete(recipeid){
        if(window.confirm("Are you sure?")){
            this.favoriteRepository.deleteFavorite(recipeid)
                .then(() => {
                    this.setState(state => ({
                        favorites: state.favorites.filter(x => x.id !== recipeid)
                    }))
                });
        }
    }
    render(){
        return(
            <>
                {!!this.state.favorites.length &&
                <FavoriteList favorites={this.state.favorites} onDelete={x => this.onDelete(x)}/>}
            </>
        )
    }

    async componentDidMount(){
        let favorites = await this.favoriteRepository.getFavorites()

        this.setState({favorites});
    }
}

export default Favorite;