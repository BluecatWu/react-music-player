import 'react-hot-loader/patch';
import React from 'react'
import ReactDOM from 'react-dom';
import Hello from './components/hello'
import { AppContainer } from 'react-hot-loader';

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    );
};
render(Hello)


if (module.hot) {
    module.hot.accept('./components/hello.js', () => {
        const RootContainer = require('./components/hello').default;
        render(RootContainer)
    });
}