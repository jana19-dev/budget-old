import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { store, persistor } from './config/store'
import { PersistGate } from 'redux-persist/integration/react'
import registerServiceWorker from './registerServiceWorker';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import Loading from './components/common/Loading';
import App from './App';


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