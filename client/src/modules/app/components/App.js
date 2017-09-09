import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import auth from '../../auth';
import users from '../../users';
import { createStructuredSelector } from 'reselect';

class App extends Component {
    componentWillMount() {
        if (this.props.hasToken) {
            this.props.fetchUserWithToken();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hasToken) {
            this.props.fetchUserWithToken();
        }
    }

    renderIndexRoute() {
        if (this.props.hasToken) {
            return () => <div>Home</div>
        }
        return auth.components.LandingPage;
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <div>topBar</div>
                    <div>
                        <Route path='/' component={this.renderIndexRoute()} />
                    </div>
                    <div>BottomNav</div>
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(
    createStructuredSelector({
        hasToken: auth.selectors.selectHasToken
    }),
    {
        fetchUserWithToken: users.actions.fetchUserWithToken
    }
)(App);