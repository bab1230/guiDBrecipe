import React from 'react';
import ingredient from './Ingredient.js';

class IngredientsPage extends React.Component {


  state = {
    ingredients: [new ingredient("Chicken", 2)],
    currentname: "",
    currentquantity: 0,

  }

  RenderIngredientList() {
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.ingredients.map((a, i) =>
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
  }

  onSubmit() {
    if (this.state.currentname != "" && this.state.currentquantity != 0) {
      this.state.ingredients.push(new ingredient(this.state.currentname, this.state.currentquantity));
      this.setState({
        currentname: "",
        currentquantity: 0
      });
    }
  }


  render() {

    return (
      <div className="ml-2 mr-2">
        {this.RenderIngredientList()}
        <form className="form-inline" onSubmit={() => this.onSubmit()}>
          <div className="form-group">
            <label htmlFor="ingredient-name" className="mr-2">Name</label>
            <input type="text"
              id="ingredient-name"
              name="ingredient-name"
              className="form-control mr-2"
              value={this.state.currentname}
              onChange={e => this.setState({ currentname: e.target.value })} />
          </div>

          <div className="form-group mr-2">
            <label htmlFor="quantity">Quantity</label>
            <select
              id="quantity"
              name="quantity"
              className="form-control ml-3"
              value={this.state.currentquantity}
              onChange={e => this.setState({ currentquantity: e.target.value })} >
              <option></option>
              {
                [1, 2, 3, 4, 5, 6, 7, 8, 9].map(q => <option key={q} value={q}>{q}</option>)
              }
            </select>
          </div>

        </form>

        <div className="mt-3">
          <button onClick={e => this.onSubmit()} className="btn btn-primary">
            Submit
            </button>
        </div>

      </div>
    );

  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default IngredientsPage;
