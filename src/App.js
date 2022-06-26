
import { Provider } from 'react-redux'; 
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MainClass from './Components/MainClass';


export default function App (){
    return (
      <Provider store ={store}>
        <BrowserRouter>
        <div>
          <MainClass/>
        </div>
        </BrowserRouter>
      </Provider>
      
    )
}

