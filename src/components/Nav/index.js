import React, {Component} from 'react';
import css from './styles.module.scss';
import {Link} from 'react-router-dom';

class Nav extends Component{
    constructor() {
        super();
        this.state = {
            search: '',
            category: '',
        };
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleCategory = (e) => {
        console.log(e.target.value);
    }
    render() {
        return (
            <div className={css.Container}>
                <h1>Foodie</h1>
                <div className={css.LinkContainer}>
                    <p><Link to="/">Home</Link></p>
                    <p><Link to="/">Lunch</Link></p>
                    <p><Link to="/">Dinner</Link></p>
                    <p><Link to="/">Breakfast</Link></p>
                </div>
                <div className={css.DropDownContainer}>
                    <p>Search by category: </p>
                    <select onChange={this.handleCategory}>
                        <option value={''}>Select One</option>
                        <option>American</option>
                        <option>Mexican</option>
                        <option>Italian</option>
                        <option>FastFood</option>
                    </select>
                </div>
                <div className={css.SearchBarContainer}>
                    <input
                        name="search"
                        value={this.state.search}
                        onChange={this.handleInput}
                        placeholder="Search by title"
                    />
                </div>
            </div>
        );
    }
}

export default Nav;