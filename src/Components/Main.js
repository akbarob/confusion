import Header from './Header';
import Footer from './Footer';
import Contact from './Contact';
import About from './About';
import Menu from './MenuComponents';

import { useSelector, useDispatch} from 'react-redux';
import DishDetails from "./DishDetails";
import Home from './HomeComponents';
import { Navigate, Route, Routes,useParams} from 'react-router-dom'
import { addComment } from '../redux/ActionCreators';
import { useEffect} from 'react';




function Main (props){

const dishes = useSelector(state => state.Dishes)
const Promotions  = useSelector(state => state.Promotions)
const Comments = useSelector(state => state.Comments)
const Leaders = useSelector(state => state.Leaders)
const dispatch = useDispatch()

useEffect(() =>{
    dispatch(addComment())
  },[dispatch])

  function HomePage(){
      return(
        <Home dishes={dishes.filter(dish => dish.featured)[0]}
        Promotions={Promotions.filter(promo => promo.featured)[0]}
        Leaders={Leaders.filter(leaders => leaders.featured)[0]}
        />
      )
    }
    function DishWithId (){
      
        const {dishId} = useParams();
        return(
          <>
           Comments total {Comments.length}
      <p>
        Comments on this dish
        {Comments.filter(c => c.dishId === 0).length}
      </p>
          <DishDetails dish={dishes.filter(dish => dish.id === parseInt(dishId,10))[0]}
          comments={Comments.filter(comment => comment.dishId === parseInt(dishId,10))}
          addComment={addComment}
          /> 
          </>
          
          )
          
        
      }

    return (
      <div >
        <Header/>
        
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/home' element={<HomePage/>}/>
            <Route path='/menu' element={<Menu dishes={dishes} />} />
            <Route path='menu/:dishId' element={<DishWithId/>}/>
            <Route path='/contact' element={<Contact/>} />
            <Route path='/about' element={<About Leaders={Leaders} />}/>
            <Route path='*' element={<Navigate to='/'/>}/>
          
          </Routes>
          
        
        <Footer/>
      </div>
    );

  

    
}

export default Main;