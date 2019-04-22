import React from 'react';
import ingredient from './Ingredient.js';

class IngredientsPage extends React.Component {
  

  state = {
    ingredients: [new ingredient("Chicken", 2)],
    currentname: "",
    currentquantity: 0,

  }

  IngredientList = () => (
    <div>
        <table className="table">
            <thead>
                <tr>
                    <th>Ingredient</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.ingredients.map((a,i) => 
                        <tr key={i}>
                            <td>{a.name}</td>
                            <td>{a.quantity}</td>
                        </tr>
                        )
                }
            </tbody>
        </table>
    </div>
  );

  

  render() {

    return(
    <>
      <IngredientList />
      <form onSubmit={() => this.onSubmit()}>
        <div className="form-group">
          <label htmlFor="ingredient-name">Name</label>
          <input type="text"
            id="ingredient-name"
            name="ingredient-name"
            className="form-control"
            value={this.state.name}
            onChange={e => this.setState({ currentname: e.target.value })} />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Department</label>
          <select
            id="quantity"
            name="quantity"
            className="form-control"
            value={this.state.currentquantity}
            onChange={e => this.setState({ currentquantity: e.target.value })} >
            <option></option>
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map(q => <option key={q} value={q}>{q}</option>)
            }
          </select>
        </div>

      </form>
      <div>
        <button onClick={e => this.onSubmit()} className="btn btn-primary">
          Submit
        </button>
      </div>
    </>
    );

  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default IngredientsPage;
