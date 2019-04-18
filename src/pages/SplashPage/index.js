import React, {Component} from 'react';
import css from './styles.module.scss';
import Nav from '../../components/Nav';
import axios from 'axios';
import {Link} from 'react-router-dom';
const API_URL = process.env.REACT_APP_API_URL;


class SplashPage extends Component {
    constructor(){
        super();
        this.state = {
            recipes: [],
        };
    }
    componentDidMount() {
        axios.get(`${API_URL}/api/v1/recipes/`)
        .then((res) => {
            this.setState({recipes: res.data});
        })
    }
    render(){ 
        let recipeList = null;
        
        if (this.state.recipes.length > 0){
            recipeList = <React.Fragment>{this.state.recipes.map((recipe, i) => (
                <div className={css.Recipe} key={`recipe${recipe.description}${recipe.id}${i}`}>
                    <div className={css.Recipe__ContentContainer}>
                        <h1><Link to={`/recipe/${recipe.id}`}>{recipe.description}</Link></h1>
                        <p>Source: <a href={recipe.url}>{recipe.source}</a></p>
                        <p>Difficulty: {recipe.difficulty}</p>
                    </div>
                    <div className={css.Recipe__ImageContainer}>
                        {recipe.image != null ? <img src={`${API_URL}api/v1/recipe/${recipe.id}/image`}/> : null}
                    </div>
                </div>)
            )}</React.Fragment>
        }
        return (
            <div className={css.Container}>
                <div className={css.Container__Header}>
                    <header>
                        <h1>Foodie</h1>
                    </header>
                </div>
                <div className={css.Container__Content}>
                    <Nav/>
                    <div className={css.Content__Section}>
                        <h2>Recipes</h2>
                        <div className={css.RecipeList}>
                            {recipeList}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SplashPage;