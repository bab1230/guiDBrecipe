import React from 'react';
import { Container, Jumbotron, Badge, Col} from 'react-bootstrap';
import { Redirect, Link} from 'react-router-dom';
import { ReviewForm } from './reviewForm';
import { ReviewList } from './reviewList';
import { recipeRepo } from '../../api/recipeRepo';
import { favoriteRepository } from '../../api/favoriteRepository';

export class RecipeDetails extends React.Component{
    recipeRepo=new recipeRepo();
    favoriteRepository=new favoriteRepository();

    state={
        recipe_id: 0,
        recipe_name: '',
        how_to_cook: '',
        cuisine_type: '',
        image: '',
        featured_date: '',
        ratings: [],
        rating: 0
    };

    onNewRating(rating){
        this.setState(state=>{
          state.ratings.push(rating);
          return state;
        });
      }

    render(){
        if(this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <>
            <Container style={{marginBottom:20}}>
            {this.renderJumbo()}
            <ReviewList ratings={this.state.ratings}/>
            <ReviewForm onNewRating={a=>this.onNewRating(a)}/>
            </Container>
            </>
        );
    }
    renderJumbo(){
        return(
            <>
            <Jumbotron bg="dark">
                <img src = { this.state.image } align="center" alt="Product Pic"/>
                <h1>{this.state.recipe_name}</h1>
                <h3><Badge variant="primary">{this.state.cuisine_type}</Badge></h3>
                <h6>{this.state.how_to_cook}</h6>
                <div style={{clear:'left'}}/>
                <Col md={{offset:10}}><Link className="btn btn-warning" style={{margin:10}} onClick={() => this.favoriteRepository.addFavorite(this.state)}>Favorite</Link></Col>
            </Jumbotron>;
            </>
        )
    }
}

export default RecipeDetails;