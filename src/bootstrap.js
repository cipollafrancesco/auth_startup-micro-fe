import ReactDOM from 'react-dom'
import React from 'react'
import App from './App'
import {createBrowserHistory, createMemoryHistory} from 'history'

console.info('>>> Auth works!')


// Mount func to start up the application
const mount = (el, {onNavigate, defaultHistory, initialPath, onSignIn}) => {

    // Create MEMORY HISTORY that all the children must have
    const history = defaultHistory || createMemoryHistory({initialEntries: [initialPath]})

    onNavigate &&
    history.listen(onNavigate) // Navigation listener

    ReactDOM.render(<App history={history} onSignIn={onSignIn}/>, el)

    return ({
        onParentNavigate: ({pathname: nextPathname}) => {
            // console.log('[Container] UPDATING PATHNAME', nextPathname)
            history.location.pathname !== nextPathname &&
            history.push(nextPathname)
        }
    })
}

// If we are in dev and in isolation call mount immediately
if (process.env.NODE_ENV === 'development') {
    // root element to attach application
    const devRoot = document.querySelector('#_auth-dev-root')

    // If present calls mount functions
    devRoot && mount(devRoot, {defaultHistory: createBrowserHistory()}) // In DEV I'll use BrowserHistory
}

// EXPORTING MOUNT FUNCTION
export {mount}