import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import './bootstrap.min.css';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

Sentry.init({ dsn: 'https://0a85fbf874574032928118f63ab01625@sentry.io/1497576' });

if (process.env.NODE_ENV !== 'development') {
	console.log = () => {}
  }

ReactDOM.render(<BrowserRouter>
		<App />
	</BrowserRouter>,document.getElementById('root')
)