import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import './styles/styles.css';
// import './styles/resizable.css';
// import 'bootstrap/dist/css/bootstrap.css';  
// // import { store, persistor } from './app/store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
          <App />
    </React.StrictMode>,
    document.getElementById('root')
  );

serviceWorker.unregister();

reportWebVitals();
