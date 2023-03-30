import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Content from './Main.jsx';
import store from '../../Store/Store';
import { history } from '../../Helper/history.js';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '../../Config/theme';
import CssBaseline from '@material-ui/core/CssBaseline';

const Main = () => {
    return (
        <Provider store={store}>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <Router history={history}>
                    <Content />
                </Router>
            </ThemeProvider>
        </Provider>
    );
};
export default Main;
