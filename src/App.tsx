import React from 'react';
import { createStore } from 'redux';
import appReducer from './store/reducer';
import { Provider } from 'react-redux';
import Home from './components/Home';

const App = () => {

  const store = createStore(appReducer);

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
