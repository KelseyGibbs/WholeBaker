import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom';

// Main Reducer
import rootReducer from './store/reducers';

// Redux
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// redux-persist
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { PersistGate } from 'redux-persist/integration/react';

// set initial state
const initialState = {};

// history and middlewares
const middlewares = [thunk];

const persistConfig = {
  key: 'primary',
  storage
};

// persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store creation and persist
const store = createStore(persistedReducer, initialState,
  
  compose(
  applyMiddleware(...middlewares),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || compose 
  );
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={ store }>
      <PersistGate loading= { null } persistor={ persistor }>
        <BrowserRouter>
          <App />
        </BrowserRouter>  
      </PersistGate>
  </Provider>, 
  document.getElementById('root')
);