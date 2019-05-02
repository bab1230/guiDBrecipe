import React, { Component } from 'react';
import { RecipeRepo } from '../../api/recipeRepo';
import { Link } from 'react-router-dom'
class Search extends Component {
    recipeRepo = new RecipeRepo();
    constructor(props) {
        super(props);
        this.state = {  
            search: '',
            recipes: []
        }
    }
    componentWillMount() {
        this.setState({search: this.props.match.params.search}) 
    }
    componentDidMount() {
        //this.setState({search: this.props.match.params.search}) 
        this.recipeRepo.search(this.state.search).then(res => {
            console.log(res)
            this.setState({recipes: res})
        }).catch(err => alert(err))
    }
    render() { 
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