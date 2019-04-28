import React from 'react';
import ingredient from './Ingredient.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import IngredientsRepo from './../../api/ingredientsRepo';

class IngredientsPage extends React.Component {

  ingredientsRepo = new IngredientsRepo;



  state = {
    ingredients: [
      {
        ingredient_name: "salt",
        amount: "1",
        unit: "pile"
      }
    ],
    currentname: "",
    currentquantity: 0,

  }

  RenderIngredientList() {
    return (
      <div>
        <table className="table table-striped table-condensed table-info">
          <thead className="thead-dark">
            <tr>
              <th>Ingredient</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.ingredients.map((a, i) =>
                <tr key={i}>
                  <td>{a.ingredient_name}</td>
                  <td>{a.amount} {a.unit}</td>
                  <td>
                    <button className="btn btn-sm btn-danger"
                      onClick={e => this.onDelete(a.name)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    );
  }

  onSubmit() {
    if (this.state.currentname !== "" && this.state.currentquantity !== 0) {
      // this.state.ingredients.push(new ingredient(this.state.currentname, this.state.currentquantity));
      this.setState({
        currentname: "",
        currentquantity: 0
      });
    }
  }

  onDelete(name) {
    var index = this.state.ingredients.map(e => e.name).indexOf(name);
    console.log(index)

    this.setState({ ingredients: this.state.ingredients.splice(this.index, 1) });
  }

  onSave() {
    this.ingredientsRepo.updateIngredients(this.state.ingredients);
    this.componentDidMount();
  }


  render() {

    return (
      <div className="ml-3 mr-3 mt-3">
        {this.RenderIngredientList()}
        <div className="mt-5 w-100 d-flex flex-column align-items-center">
          <form className=" form-inline " onSubmit={() => this.onSubmit()}>
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

          <button style={{ marginTop: "1rem" }} onClick={e => this.onSubmit()} className="btn btn-primary">
            Add
            </button>
        </div>

      </div>
    );

  }

  componentDidMount() {
    let ingredients = this.ingredientsRepo.getIngredients();
    console.log(ingredients);
    this.setState({ ingredients });
  }
}

export default IngredientsPage;
