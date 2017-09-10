import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import auth from '../../auth';
import users from '../../users';
import nav from '../../nav';
import create from '../../create';
import home from '../../home';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

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
            return () => <home.components.Home />
                
        }
        return () => <auth.components.LandingPage navActions={nav.actions}/>
    }

    render() {
        const { MainContent, TopNav, BottomNav, Options } = nav.components;
        return (
            <BrowserRouter>
                <Wrapper>
                    <TopNav />
                    <MainContent>
                        <Route path='/' exact component={this.renderIndexRoute()} />
                        <Route path='/create/post' exact component={create.components.Create} />
                    </MainContent>
                    <BottomNav />
                </Wrapper>
            </BrowserRouter>
        );
    }
}

/* Styled Components*/
const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export default connect(
    createStructuredSelector({
        hasToken: auth.selectors.selectHasToken
    }),
    {
        fetchUserWithToken: users.actions.fetchUserWithToken
    }
)(App);