import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

// optional configuration
const options = {
	// you can also just use 'bottom center'
	position: positions.BOTTOM_CENTER,
	timeout: 5000,
	offset: '30px',
	// you can also just use 'scale'
	transition: transitions.SCALE,
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<AlertProvider template={AlertTemplate} {...options}>
				<App />
			</AlertProvider>
		</BrowserRouter>
	</Provider>
);
