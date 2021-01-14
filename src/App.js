import React from 'react'
import {Route, Router, Switch} from 'react-router-dom'
import {createGenerateClassName, StylesProvider} from '@material-ui/core'

import Signin from './components/Signin'
import Signup from './components/Signup'

// Aggiunge un prefisso alle classi CSS-in-JS in prod (avoid classNames collision)
const generateClassName = createGenerateClassName({
    productionPrefix: 'auth'
})

export default ({history, onSignIn}) => {
    return (
        <div>
            <StylesProvider generateClassName={generateClassName}>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/auth/signup">
                            <Signup onSignIn={onSignIn}/>
                        </Route>

                        <Route exact path="/auth/signin">
                            <Signin onSignIn={onSignIn}/>
                        </Route>
                    </Switch>
                </Router>
            </StylesProvider>
        </div>
    )
}