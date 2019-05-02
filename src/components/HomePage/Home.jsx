import React from 'react';
import { Carousel, Card, CardDeck } from 'react-bootstrap';
import RecipeRepo from './../../api/recipeRepo';
import { Link } from 'react-router-dom';
import './Home.css';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

export class Home extends React.Component {

    recipeRepo = new RecipeRepo();

    state = {
        recipes: [],
    }

    render() {
        return (
            <>
                {this.renderCarousel()}
                {this.renderCarouselCard()}
            </>
        );
    }

    async componentDidMount(){
        let recipes = await this.recipeRepo.getRecipes();
        this.setState({ recipes });
    }


    renderCarousel() {
        return (
            <div className="d-flex h-50 flex-column align-items-center">
                <h4 style={{ margin: 20 }}>Trending</h4>
                <div className="d-flex" style={{}} >
                    <div className="hide-card offset-1 col-3">
                    {
                        this.state.recipes.slice(9,10).map((b,j)=> (
                        <Card bg="dark" style={{maxHeight: "700px"}} key={j}>
                        <Link to={`/recipes/${b.recipe_id}`}  >
                            <Card.Img className="rounded" variant="top" src={b.image} />
                            <Card.Body>
                                <Card.Title style={{color: "white", fontWeight: "bold", textShadow: "black 0px 0px 10px"}}>{b.recipe_name}</Card.Title>
                            </Card.Body>
                        </Link>
                        </Card>
                        ))
                    }
                    </div>
                    <div className="col-xl-4 col-md-4 col-xs-12 align-items-center">
                    <Carousel className="phone-trending fix-carousel" style={{ maxHeight: "700px", maxWidth: "700px"}}>
                    {
                        this.state.recipes.map((a, i) => (
                            <Carousel.Item key={i}>
                                <Link to={`/recipes/${a.recipe_id}`}  >
                                    <img 
                                        className="rounded trim d-block"
                                        src={a.image}
                                        />
                                    <Carousel.Caption>
                                        <h3 style={{color: "white", fontWeight: "bold", textShadow: "black 0px 0px 10px"}}>{a.recipe_name}</h3>
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                        ))
                    }
                    </Carousel>
                    </div>
                    <div className="hide-card col-3">
                    {
                        this.state.recipes.slice(7,8).map((b,j)=> (
                        <Card bg="dark" className="" key={j}>
                        <Link to={`/recipes/${b.recipe_id}`}  >
                            <Card.Img className="rounded" variant="top" src={b.image} />
                            <Card.Body>
                                <Card.Title bg="dark" style={{color: "white", fontWeight: "bold", textShadow: "black 0px 0px 10px"}}>{b.recipe_name}</Card.Title>
                            </Card.Body>
                        </Link>
                        </Card>
                        ))
                    }    
                    </div>
                </div>
            </div>
        );
    }
    renderCarouselCard() {
        return (
            <>
                <h4 style={{ margin: 20 }}>Favorites</h4>
                <Carousel className="phone-trending fix-carousel" style={{ maxHeight: "700px", margin: 20}}>
                    <Carousel.Item>
                        <CardDeck>
                        {
                            this.state.recipes.slice(0,5).map((a,i)=>(
                            <Card bg="dark" key={i}>
                            <Link to={`/recipes/${a.recipe_id}`}  >
                                <Card.Img variant="top" src={a.image} />
                                <Card.Body>
                                    <Card.Title bg="dark" style={{color: "white", fontWeight: "bold", textShadow: "black 0px 0px 10px"}}>{a.recipe_name}</Card.Title>
                                </Card.Body>
                            </Link>
                            </Card>
                            ))
                        }
                        </CardDeck>
                    </Carousel.Item>
                    <Carousel.Item>
                        <CardDeck>
                        {
                            this.state.recipes.slice(5,10).map((a,i)=>(
                            <Card bg="dark" key={i}>
                            <Link to={`/recipes/${a.recipe_id}`}  >
                                <Card.Img variant="top" src={a.image} />
                                <Card.Body>
                                    <Card.Title bg="dark" style={{color: "white", fontWeight: "bold", textShadow: "black 0px 0px 10px"}}>{a.recipe_name}</Card.Title>
                                </Card.Body>
                            </Link>
                            </Card>
                            ))
                        }
                        </CardDeck>
                    </Carousel.Item>
                    <Carousel.Item>
                        <CardDeck>
                        {
                            this.state.recipes.slice(10,15).map((a,i)=>(
                            <Card bg="dark" key={i}>
                            <Link to={`/recipes/${a.recipe_id}`}  >
                                <Card.Img variant="top" src={a.image} />
                                <Card.Body>
                                    <Card.Title bg="dark" style={{color: "white", fontWeight: "bold", textShadow: "black 0px 0px 10px"}}>{a.recipe_name}</Card.Title>
                                </Card.Body>
                            </Link>
                            </Card>
                            ))
                        }
                        </CardDeck>
                    </Carousel.Item>
                    <Carousel.Item>
                        <CardDeck>
                        {
                            this.state.recipes.slice(15,20).map((a,i)=>(
                            <Card bg="dark" key={i}>
                            <Link to={`/recipes/${a.recipe_id}`}  >
                                <Card.Img variant="top" src={a.image} />
                                <Card.Body>
                                    <Card.Title bg="dark" style={{color: "white", fontWeight: "bold", textShadow: "black 0px 0px 10px"}}>{a.recipe_name}</Card.Title>
                                </Card.Body>
                            </Link>
                            </Card>
                            ))
                        }
                        </CardDeck>
                    </Carousel.Item>
                </Carousel>
            </>
        );
    }
}

export default Home