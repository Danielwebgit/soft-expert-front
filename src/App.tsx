import { AppRoutes } from './Routes';
import { BrowserRouter } from 'react-router-dom';
import Layouts from  './layouts'
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Provider store={store}>
      <Layouts>
          <AppRoutes />
      </Layouts>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
