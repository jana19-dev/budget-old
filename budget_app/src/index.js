import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { store, persistor } from './config/store'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Loading from './components/common/Loading';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <App />
      </MuiPickersUtilsProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker()