import React, {Component} from 'react';
import css from './styles.module.scss';
import {Link} from 'react-router-dom';

class Nav extends Component{
    constructor() {
        super();
        this.state = {
            search: "",
            category: null,
        };
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
        console.log(e.target.value);
    }
    render() {
        return (
            <div className={css.Container}>
                <h1>Foodie</h1>
                <div className={css.LinkContainer}>
                    <p><Link to="/">Home</Link></p>
                    <p><Link to="/">Home</Link></p>
                    <p><Link to="/">Home</Link></p>
                    <p><Link to="/">Home</Link></p>
                </div>
                <div className={css.DropDownContainer}>
                    <p>Search by category: </p>
                    <select>
                        <option value={null}>Select One</option>
                        <option>Foo</option>
                        <option>Bar</option>
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