import * as React from 'react';
import { Provider } from 'react-redux';

import store from './redux/store';
import Home from './views/home/Home';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="container">
          <h1>Robot Market</h1>
        </div>
        <Home />
      </div>
    </Provider>
  );
}

export default App;
