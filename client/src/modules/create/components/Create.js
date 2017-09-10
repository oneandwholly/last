import React, { Component } from 'react';
import nav from '../../nav';
import { connect } from 'react-redux';

class Create extends Component {
    componentWillMount() {
        this.props.setActive('create')
    }

    render() {
        return <div>Create</div>
    }
}

export default connect(null, {setActive: nav.actions.setActive})(Create);
