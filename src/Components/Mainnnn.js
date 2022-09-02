import Header from './Header';
import Footer from './Footer';


import { useSelector, useDispatch} from 'react-redux';
import DishDetails from "./DishDetails";
import Home from './HomeComponents';
import { Navigate, Route, Routes,useParams} from 'react-router-dom'
import { addComment } from '../redux/ActionCreators';
import { useEffect} from 'react';
import { postComment,fetchDishes,fetchComments,fetchPromos, fetchLeaders,postFeedback, deleteComment, loginUser, googleLogin, logoutUser, signupUser, observer} from '../redux/ActionCreators';
import { actions} from "react-redux-form";
import AnimatedRoutes from './AnimatedRoutes';





function Main (){
const dispatch = useDispatch()

const dishes = useSelector(state => state.Dishes)
const Promotions  = useSelector(state => state.Promotions)
const Comments = useSelector(state => state.Comments)
const Leaders = useSelector(state => state.Leaders)
const auth = useSelector(state => state.auth)

useEffect(()=>{
  dispatch(fetchDishes())
  dispatch(fetchPromos())
  dispatch(fetchLeaders())
},[])


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
          <div className='container'>
          
           Comments total {Comments.length}
       <p>
        Comments on this dish
        {Comments.filter(c => c.dishId === 0).length}
      </p>

          </div>
          <DishDetails 
            dish={dishes.dishes.filter(dish => dish._id === dishId)[0]}
            isLoading={dishes.isLoading}
            errMess={dishes.errMess}
            comments={Comments.Comments.filter(comment => comment.dishId === dishId)}
            commentsErrMess={Comments.errMess}
            postComment={postComment}
          
          
          /> 
          </>
          
          )
          
        
      }

    return (
      <div >
        <Header
          // auth={props.auth}
          // loginUser={props.loginUser} 
          // logoutUser={props.logoutUser}
          // googleLogin={props.googleLogin}
          // signupUser={props.signupUser}
          />
            <AnimatedRoutes 
              HomePage={HomePage}
              DishWithId={DishWithId}
              dish={dishes}
              Leaders={Leaders.Leaders}

            />
        <Footer/>
      </div>
    );

  

    
}

export default Main;