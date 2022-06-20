
import Header from './Header';
import Footer from './Footer';
import Contact from './Contact';
import About from './About';
import Menu from './MenuComponents';

import { connect } from 'react-redux';

import DishDetails from "./DishDetails";
import Home from './HomeComponents';
import { Navigate, Route, Routes,useParams} from 'react-router-dom'
import { addComment } from '../redux/ActionCreators';


const mapStateToProps = state => {
  return{
    dishes: state.Dishes,
    Promotions: state.Promotions,
    Comments: state.Comments,
    Leaders: state.Leaders
  }
}

const mapDispatchToProps = dispatch => ({
  addComment: (dishId, rating, author, comment) =>
    dispatch(addComment(dishId, rating, author, comment))
});
 function Main (props){
    function HomePage(){
      return(
        <Home dishes={props.dishes.filter(dish => dish.featured)[0]}
        Promotions={props.Promotions.filter(promo => promo.featured)[0]}
        Leaders={props.Leaders.filter(leaders => leaders.featured)[0]}
        />
      )
    }
    function DishWIthId (){
        const {dishId} = useParams();
        return(
          <>
           Comments total {props.Comments.length}
      <p>
        Comments on this dish
        {props.Comments.filter(c => c.dishId === 0).length}
      </p>
          <DishDetails dish={props.dishes.filter(dish => dish.id === parseInt(dishId,10))[0]}
          comments={props.Comments.filter(comment => comment.dishId === parseInt(dishId,10))}
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
            <Route path='/menu' element={<Menu dishes={props.dishes} />} />
            <Route path='menu/:dishId' element={<DishWIthId/>}/>
            <Route path='/contact' element={<Contact/>} />
            <Route path='/about' element={<About Leaders={props.Leaders} />}/>
            <Route path='*' element={<Navigate to='/'/>}/>
          
          </Routes>
          
        
        <Footer/>
      </div>
    );

  

 
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);