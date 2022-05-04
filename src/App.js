import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import Menu from './Components/MenuComponents';
import MenuData from './Components/MenuData';

function App() {
  const MenuElement = MenuData.map(dish=>{
    return <Menu
      key={dish.id}
      dish={dish}
    />
  })

  
  return (
    <div className="App">
      <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        
        {MenuElement}

        
    </div>
  );
}

export default App;
