import React from 'react';
import { Container, Jumbotron, Badge, Col} from 'react-bootstrap';
import { Redirect, Link} from 'react-router-dom';
import { Rating  } from './rating';
import { ReviewForm } from './reviewForm';
import { RatingList } from './ratingList';
import { recipeRepo } from '../../api/recipeRepo';
import { favoriteRepository } from '../../api/favoriteRepository';

import './RecipeDetails.css'

export class RecipeDetails extends React.Component{
    recipeRepo=new recipeRepo();
    favoriteRepository=new favoriteRepository();

    state={

        recipe: {
            recipe_id: 0,
            recipe_name: '',
            how_to_cook: '',
            cuisine_type: '',
            image: '',
            rating_diff: 0,
            rating_taste: 0
        },
        rating: 0,

        ingredients: [],
        
    };

    onNewRating(rating){
        this.recipeRepo.addReview(this.state.recipe.recipe_id, rating);
      }

    
    
    render(){
        if(this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <>
            <Container style={{marginBottom:20}}>
            {this.renderJumbo()}
            <ReviewForm onNewRating={a=>this.onNewRating(a)} />
            </Container>
            </>
        );
    }

    averageRating() {
        let sum = this.state.ratings.reduce((a, b) => a + b);
        return Math.ceil(sum/this.state.ratings.length);
    }

    capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

    renderJumbo(){
        return(
            <>
            <Jumbotron bg="dark" className="text-center">
                <div className="d-flex mb-3 justify-content-center" style={{width:"100%"}}>
                    <img className="recipe-pic" src = { this.state.recipe.image } alt="Product Pic"/>
                </div>
                <div className="d-flex align-items-center flex-column">
                    <h3><Badge variant="primary">{this.state.recipe.cuisine_type}</Badge></h3>
                    <h1 className="font-weight-bold" >{this.state.recipe.recipe_name}</h1>
                </div>
                <div className="d-flex ratings justify-content-between align-items-center mb-3">
                    <div className="font-weight-bold">Taste:<Rating value={this.state.recipe.rating_taste} /></div>
                    <div className="font-weight-bold">Difficulty:<Rating value={this.state.recipe.rating_diff} /></div>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <h2>Ingredients:</h2>
                    {/* <div className="w-75"> */}
                        <ul className="ingredients">
                            {
                                this.state.ingredients.map((a, i) => (
                                    <li className="d w-75-flex justify-content-between m-1">
                                        <div  className="font-weight-bold">{`${this.capitalize(a.ingredient_name)} ${a.notes === "null" ? "" : "(" + a.notes + ")"}`}</div>
                                        <div>{`${a.amount === "null" ? "" : a.amount} ${a.unit === "null" ? "" : a.unit}${(a.amount > 1 && a.unit !== "null") ? "s" : ""}`}</div>
                                    </li>
                                ))
                            }
                        </ul>
                    {/* </div> */}
                    <h2>Recipe:</h2>
                    <p>{this.state.recipe.how_to_cook}</p>
                </div>
                <div style={{clear:'left'}}/>
                <Col md={{offset:5}}>
                    <Link className="btn btn-warning" onClick={() => this.favoriteRepository.addFavorite(this.state.recipe.recipe_id)}>
                        Add to Favorites
                    </Link>
                </Col>
            </Jumbotron>;
            </>
        )
    }

    async componentDidMount() {
        let recipe = await this.recipeRepo.getRecipe(this.props.match.params.recipe_id);
        this.setState ({ recipe: recipe[0] });
        
        let ingredients = await this.recipeRepo.getRecipeIngredients(this.props.match.params.recipe_id);
        this.setState ({ingredients});

    }
}

export default RecipeDetails;