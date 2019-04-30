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
        ingredient_name: "",
        amount: "",
        unit: ""
      }
    ],
    currentname: "",
    currentquantity: 0,
    currentunit: ""
  }

  amountunits = [
    "piece",
    "cup",
    "qt",
    "gal",
    "fl. oz",
    "pt",
    "tbsp",
    "tsp",
    "drop",
    "dash",

  ]

  RenderIngredientList() {
    return (
      <div>
        <table className="table table-striped table-condensed">
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
                  <td>{a.amount} {a.unit}{(a.amount > 1 && a.unit != 0) ? "s" : ""}</td>
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
      this.state.ingredients.push(new ingredient(this.state.currentname, this.state.currentquantity, this.state.currentunit));
      this.setState({
        currentname: "",
        currentquantity: 0,
        currentunit: "",
      });
    }
  }

  onDelete(name) {
    let index = this.state.ingredients.map(e => e.name).indexOf(name);
    let newstate = this.state.ingredients;
    newstate.splice(index, 1);
    this.setState({ ingredients: newstate});
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
          <form className="input-form form-inline" onSubmit={() => this.onSubmit()}>
            <div className="form-group font-weight-bold">
              <label htmlFor="ingredient-name" className="mr-2">Name</label>
              <input type="text"
                id="ingredient-name"
                name="ingredient-name"
                className="form-control mr-3"
                style={{backgroundColor: "#E8E8EE"}}
                value={this.state.currentname}
                onChange={e => this.setState({ currentname: e.target.value })} />
            </div>

            <div className="form-group mr-2 font-weight-bold">
              <label htmlFor="quantity">Quantity</label>
              <select
                id="quantity"
                name="quantity"
                className="form-control ml-3"
                style={{backgroundColor: "#E8E8EE"}}
                value={this.state.currentquantity}
                onChange={e => this.setState({ currentquantity: e.target.value })} >
                <option></option>
                {
                  [1, 2, 3, 4, 5, 6, 7, 8, 9].map(q => <option key={q} value={q}>{q}</option>)
                }
              </select>
            </div>

            <div className="form-group mr-2 font-weight-bold">
              <label htmlFor="unit">Unit</label>
              <select
                id="unit"
                name="unit"
                className="form-control ml-3"
                style={{backgroundColor: "#E8E8EE"}}
                value={this.state.currentunit}
                onChange={e => this.setState({ currentunit: e.target.value })} >
                <option></option>
                {
                  this.amountunits.map((q, i) => <option key={i} value={q}>{q}</option>)
                }
              </select>
            </div>


          </form>
          <div className="d-flex flex-column" style={{maxWidth:"200px", width: "80%"}}>
          <button style={{ marginTop: "1rem" }} onClick={e => this.onSubmit()} className="btn btn-primary">
            Add
          </button>
          <button style={{ marginTop: "1rem" }} onClick={e => this.onSave()} className="btn btn-warning">
            Save
          </button>
          </div>
        </div>

      </div>
    );

  }

  async componentDidMount() {
    let ingredients = await this.ingredientsRepo.getIngredients(1);
    this.setState({ ingredients });
  }
}

export default IngredientsPage;
