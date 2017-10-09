import 'react-hot-loader/patch';
import React from 'react'
import ReactDOM from 'react-dom';
import root from './root'
import { AppContainer } from 'react-hot-loader';

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    );
};
render(root)


if (module.hot) {
    module.hot.accept('./root', () => {
        const RootContainer = require('./root').default;
        render(RootContainer)
    });
}