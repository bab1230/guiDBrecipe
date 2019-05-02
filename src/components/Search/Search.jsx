import React, { Component } from 'react';
import { RecipeRepo } from '../../api/recipeRepo';
import { Link } from 'react-router-dom'
import { Alert } from 'react-bootstrap';
class Search extends Component {
    recipeRepo = new RecipeRepo();
    constructor(props) {
        super(props);
        this.state = {  
            recipes: []
        }
    }
    componentDidMount() {
        this.recipeRepo.search(this.props.match.params.search).then(res => {
            this.setState({recipes: res})
        }).catch(err => alert(err))
    }
    componentWillReceiveProps(newProps){
        this.recipeRepo.search(newProps.match.params.search).then(res => {
            this.setState({recipes: res})
        }).catch(err => alert(err))
    }
    render() { 
        if(this.state.recipes.length === 0) {
            return <Alert variant="info">No recipes found</Alert>
        }
        else
        return (  
            <>
                <table className="table table-striped table-dark">
                    <tbody>
                    {
                        this.state.recipes.map((r, i) => (
                            <tr key={i}>
                                <td><Link style={{color: 'white'}}to={`/recipes/${r.recipe_id}`}>{r.recipe_name}</Link></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </>
        );
    }
}
 
export default Search;