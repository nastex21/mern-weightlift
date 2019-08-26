import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import * as Sentry from '@sentry/browser';
import './bootstrap.min.css';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

Sentry.init({
	dsn: 'https://0a85fbf874574032928118f63ab01625@sentry.io/1497576',
	integrations: integrations => {
		// integrations will be all default integrations
		return integrations.filter(integration => integration.name !== 'Breadcrumbs');
	}
});

if (process.env.NODE_ENV !== 'development') {
	console.log = () => { }
}

const store = configureStore();

ReactDOM.render(<BrowserRouter>
	<Provider store={store}>
		<App />
	</Provider>,
</BrowserRouter>, document.getElementById('root')
)