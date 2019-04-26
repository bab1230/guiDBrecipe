import React from 'react';
import { FavoriteList } from './FavoriteList';
import { favoriteRepository } from '../../api/favoriteRepository';
import { Link } from 'react-router-dom';
import './Favorite.css';

export class Favorite extends React.Component{
    FavoriteRepository = new favoriteRepository;

    state={
        favorites: []
    };

    onDelete(favoriteId){
        if(window.confirm("Are you sure?")){
            this.FavoriteRepository.deleteFavorite(favoriteId)
                .then(() => {
                    this.setState(state => ({
                        favorites: state.favorites.filter(x => x.id !== favoriteId)
                    }))
                });
        }
    }
    render(){
        return(
            <>
                <Link to="/new" className="btn btn-success float-right">
                    <i className="fa fa-edit"></i>
                    Add to Favorites
                </Link>
                {!!this.state.favorites.length &&
                <FavoriteList favorites={this.state.favorites} onDelete={x => this.onDelete(x)}/>}
            </>
        )
    }

    componentDidMount(){
        this.FavoriteRepository.getFavorites()
        .then(favorites => this.setState({favorites}));
    }
}

export default Favorite;