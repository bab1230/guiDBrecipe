export class Recipe{
    constructor(recipe_id, recipe_name, how_to_cook, cuisine_type, image, featured_date, ratings, rating){
        this.recipe_id=recipe_id;
        this.recipe_name=recipe_name;
        this.how_to_cook=how_to_cook;
        this.cuisine_type=cuisine_type
        this.image=image;
        this.featured_date=featured_date;
        this.ratings=ratings;
        this.rating=rating;
    }
}
export default Recipe;