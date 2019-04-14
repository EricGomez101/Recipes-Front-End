import React, {Component} from 'react';

class Recipe extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: null,
        };
      }
    componentDidMount() {
        const {id} = this.props.match.params;
        this.setState({id: id});
    }
    render() {

        return (
            <div>
                Recipe Page.

                Recipe id = {this.state.id}
            </div>
        )
    }
}

export default Recipe;