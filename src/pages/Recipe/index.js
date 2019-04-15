import React, {Component} from 'react';
import Nav from '../../components/Nav';
import css from './styles.module.scss';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

class Recipe extends Component {
    constructor(props){
        super(props);
        this.state = {
            recipe: null,
        };
      }
    componentDidMount() {
        const {id} = this.props.match.params;
        axios.get(`${API_URL}/api/v1/recipes/${id}/`)
        .then(res => {
            this.setState({recipe: res.data});
        })
    }
    render() {
        let header = null;
        let content = null;

        if (this.state.recipe !== null) {
            const bgimage = {
                backgroundImage: `url(${URL.createObjectURL(new Blob([new Uint8Array(this.state.recipe.image)]))})`,
            }
            if (this.state.recipe.image != null) {
                header = (
                    <div className={css.HeaderContainer} style={bgimage}>
                        <h1>{this.state.recipe.description}</h1>
                    </div>
                );
            }
            
            content = (
                <div className={css.ColumnContainer}>
                    <div className={css.Left}>
                        <div className={css.RecipeDescriptionContainer}>
                            <h1>{this.state.recipe.description}</h1>
                            <div >
                                <p>Source: <a href={this.state.recipe.url}>{this.state.recipe.source}</a></p>
                                <p>Difficulty: {this.state.recipe.difficulty}</p>
                            </div>
                            <div>
                                <p>Categories:</p>
                                {this.state.recipe.categories.map(category => (
                                    <p className={css.RecipeTag}>{category.description}</p>
                                ))}
                            </div>
                        </div>
                        <div className={css.Notes}>
                            {this.state.recipe.notes.recipeNotes.split('\n').map(line => (
                                <p>{line}<br/></p>
                            ))}
                        </div>
                        <div className={css.Directions}>
                            <h2 className={css.Directions__Header}>Directions</h2>
                            {this.state.recipe.directions
                            .match(/\*{1}[\w\s\,\:\.\(\)\'\!\\\/\#]+/g)
                            .map((line, i) => (
                                <div className={css.Directions__Line} key={`${line.slice(1)}${i}`}>
                                    <h2>{i + 1}</h2> 
                                    <p>{line.slice(1).split('\n').map(line => (
                                        <React.Fragment>
                                            {line}
                                            <br/>
                                        </React.Fragment>
                                    ))}</p>
                                </div>
                            ))}
                        </div>
                        <div className={css.Ingredients}>
                            <h2>Ingredients</h2>
                            {this.state.recipe.ingredients.map(ingredient => (
                                <p><span>{ingredient.amount}</span> {ingredient.uom.description} - {ingredient.description}</p>
                            ))}
                        </div>
                    </div>
                    <div className={css.Right}>
                        <div className={css.StatsContainer}>
                                <div className={css.Stat}>
                                    <p>Servings</p>
                                    <h2>{this.state.recipe.servings != null? this.state.recipe.servings : 0}</h2>
                                </div>
                                <div className={css.Stat}>
                                    <p>Prep Time</p>
                                    <h2>
                                        {this.state.recipe.prepTime !== 0 ? ~~(this.state.recipe.prepTime / 60) : 0}
                                        <span>Hrs -</span> 
                                        {this.state.recipe.prepTime !== 0 ? this.state.recipe.prepTime % 60 : 0}
                                        <span>Mins</span>
                                    </h2>
                                </div>
                                <div className={css.Stat}>
                                    <p>Cook Time</p>
                                    <h2>
                                        {this.state.recipe.cookTime !== 0 ? ~~(this.state.recipe.cookTime / 60) : 0}
                                        <span>Hrs -</span>
                                        {this.state.recipe.cookTime !== 0 ? this.state.recipe.cookTime % 60 : 0}
                                        <span>Mins</span>
                                    </h2>
                                </div>
                        </div>
                    </div>
                </div>
                
            )
        }
        // https?:\/\/www\.\w+\.com(?:\/[a-zA-Z0-9\#\_]+)+ matches URL's
        // |([0-9]{1,2}[a-zA-Z \,\\\:\.\(\'\!\)]+) regex for parsing the directions.
        // TODO replace the starting of a direction from a number to a special character 
        // TODO and automatically increment the direction number itself.
        return (
            <div className={css.Container}>
                {header}
                <div className={css.Content}>
                    <Nav/>
                    {content}
                </div>
            </div>
        )
    }
}

export default Recipe;