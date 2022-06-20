
import { Provider } from 'react-redux'; 
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './Components/Main';


export default function App (){
    return (
      <Provider store ={store}>
        <BrowserRouter>
        <div>
          <Main/>
        </div>
        </BrowserRouter>
      </Provider>
      
    )
}

