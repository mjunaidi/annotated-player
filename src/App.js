import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import parseQuery from './helpers/query';
import { requestFullScreen, toggleFullScreen } from './helpers/fullscreen';

import Background from './components/background/Background';
import Menu from './components/menu/Menu';
import HomePage from './components/views/homePage/HomePage';
import ContactPage from './components/views/contactPage/ContactPage';
import PlayerPage from './components/views/playerPage/PlayerPage';

import './icons/PeIcon7/PeIconFont.css';

import './App.css';
import './css/GlobalCSS.css';

class App extends Component {

    constructor( props ) {

        super( props );

        this.requestFullScreen = requestFullScreen.bind( this );
        this.toggleFullScreen = toggleFullScreen.bind( this );

        this.queryObject = parseQuery.bind( this );

    }

    clearTitle () {

        let title = document.getElementById( 'landing_h1' );

        if ( typeof title !== 'undefined' && title !== null ) {

            title.className = 'landing-h1';

        }

    }

    componentDidMount() {

        setTimeout( () => { this.clearTitle(); }, 3000 );

    }

    renderMenu ( query ) {

        return (

            <Menu
                toggleFullScreen={this.toggleFullScreen}
                query={query}
            />

        );

    }

    render () {

        let query = this.queryObject( window.location.search );

        return (

            <div className="App">
                <Background />
                <BrowserRouter>
                    {this.renderMenu( query )}
                    <Route render={( { location } ) => {

                        //const { pathname, key } = location;

                        return (
                            <Switch location={window.location}>
                                <Route exact path="/" component={HomePage} />
                                <Route exact path="/contact" component={ContactPage} />
                                <Route exact path="/video" component={PlayerPage} />
                            </Switch>
                        );

                    }} />
                </BrowserRouter>
            </div>

        );

    }

}

export default App;
