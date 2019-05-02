import React from 'react';
import { Carousel, Card, CardDeck } from 'react-bootstrap';
import RecipeRepo from './../../api/recipeRepo';
import { Link } from 'react-router-dom';
import './Home.css';

export class Home extends React.Component {

    recipeRepo = new RecipeRepo();

    state = {
        recipes: [],
    }

    render() {
        return (
            <>
                {this.renderCarousel()}
                {/* {this.renderCard()} */}
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
                        <Card style={{maxHeight: "700px"}}>
                            <Card.Img className="rounded" variant="top" src='http://johnlawrimore.com/smu/101.png' />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This is a wider card with supporting text below as a natural lead-in to
                                        additional content. This content is a little bit longer.
                                    </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-xl-4 col-md-4 col-xs-12 align-items-center">
                    <Carousel className="phone-trending fix-carousel" style={{ maxHeight: "700px", maxWidth: "700px"}}>
                    {
                        this.state.recipes.map((a, i) => (
                            /*<Carousel.Item key={i}>
                                <Link to={`/recipes/${a.recipe_id}`}  >
                                    <Card className="border-0 ">
                                        <Card.Img src={a.image}/>
                                    </Card>
                                    <Carousel.Caption>
                                        <h3 style={{color: "white", fontWeight: "bold", textShadow: "black 0px 0px 10px"}}>{a.recipe_name}</h3>
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>*/
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
                        <Card className="" >
                            <Card.Img className="rounded" variant="top" src='http://johnlawrimore.com/smu/101.png' />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This is a wider card with supporting text below as a natural lead-in to
                                        additional content. This content is a little bit longer.
                                    </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    renderCard() {
        return (
            <>
                <CardDeck style={{ margin: 20 }}>
                    <Card>
                        <Card.Img variant="top" src='' />
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This card has supporting text below as a natural lead-in to additional
                            content.{' '}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src='' />
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a wider card with supporting text below as a natural lead-in to
                                additional content. This card has even longer content than the first to
                                show that equal height action.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src='' />
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a wider card with supporting text below as a natural lead-in to
                                additional content. This card has even longer content than the first to
                                show that equal height action.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </CardDeck>;
            </>
        );
    }
    renderCarouselCard() {
        return (
            <>
                <h4 style={{ margin: 20 }}>Favorites</h4>
                <Carousel style={{ margin: 20 }}>
                    <Carousel.Item>
                        <CardDeck>
                            <Card>
                                <Card.Img variant="top" src='http://johnlawrimore.com/smu/101.png' />
                                <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This is a wider card with supporting text below as a natural lead-in to
                                        additional content. This content is a little bit longer.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src='http://johnlawrimore.com/smu/101.png' />
                                <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This card has supporting text below as a natural lead-in to additional
                            content.{' '}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src='http://johnlawrimore.com/smu/101.png' />
                                <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This is a wider card with supporting text below as a natural lead-in to
                                        additional content. This card has even longer content than the first to
                                        show that equal height action.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </CardDeck>
                    </Carousel.Item>
                    <Carousel.Item>
                        <CardDeck>
                            <Card>
                                <Card.Img variant="top" src='http://johnlawrimore.com/smu/101.png' />
                                <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This is a wider card with supporting text below as a natural lead-in to
                                        additional content. This content is a little bit longer.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src='http://johnlawrimore.com/smu/101.png' />
                                <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This card has supporting text below as a natural lead-in to additional
                            content.{' '}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src='http://johnlawrimore.com/smu/101.png' />
                                <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This is a wider card with supporting text below as a natural lead-in to
                                        additional content. This card has even longer content than the first to
                                        show that equal height action.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </CardDeck>
                    </Carousel.Item>
                    <Carousel.Item>
                        <CardDeck>
                            <Card>
                                <Card.Img variant="top" src='http://johnlawrimore.com/smu/101.png' />
                                <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This is a wider card with supporting text below as a natural lead-in to
                                        additional content. This content is a little bit longer.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src='http://johnlawrimore.com/smu/101.png' />
                                <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This card has supporting text below as a natural lead-in to additional
                            content.{' '}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src='http://johnlawrimore.com/smu/101.png' />
                                <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This is a wider card with supporting text below as a natural lead-in to
                                        additional content. This card has even longer content than the first to
                                        show that equal height action.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </CardDeck>
                    </Carousel.Item>
                </Carousel>
            </>
        );
    }
}

export default Home