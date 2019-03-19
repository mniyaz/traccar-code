import React, {Component, Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import MultiTrack from './MultiTrack';
import Drivers from './Drivers';

class App extends Component {
    render() {
        return (
            <Fragment>
                <CssBaseline/>
                <Switch>
                    <Route exact path='/' component={MainPage}/>
                    <Route exact path='/multiTrack' component={MultiTrack}/>
                    <Route exact path='/drivers' component={Drivers}/>
                    <Route exact path='/login' component={LoginPage}/>
                </Switch>
            </Fragment>
        );
    }
}

export default App;
