import Header from './Header';
import Footer from './Footer';


import DishDetails from "./DishDetails";
import Home from './HomeComponents';
import { useParams} from 'react-router-dom'
import { postComment,fetchDishes,fetchComments,fetchPromos, fetchLeaders,postFeedback, deleteComment, loginUser, googleLogin, logoutUser, signupUser, observer} from '../redux/ActionCreators';
import { Component } from 'react';
import { connect } from 'react-redux';
import { actions} from "react-redux-form";

import AnimatedRoutes from './AnimatedRoutes'

const mapStateToProps = state => {
    return {
      dishes: state.Dishes,
      Leaders: state.Leaders,
      Comments: state.Comments,
      Promotions: state.Promotions,
      auth: state.auth
    };
  };
  
  const mapDispatchToProps = dispatch => ({
    postComment: (dishId, rating, author, comment) =>
      dispatch(postComment(dishId, rating, author, comment)),
      fetchDishes:() => {dispatch(fetchDishes())},
      resetFeedbackForm: ()=> {dispatch(actions.reset('feedback'))},
      fetchComments:() => {dispatch(fetchComments())},
      fetchPromos:() => {dispatch(fetchPromos())},
      fetchLeaders:() => {dispatch(fetchLeaders())},
      resetFeedbackForm:()=> { dispatch(actions.reset("feedback"))},
      postFeedback:(firstname, lastname,telnum, email, agree, contactType, message) => 
      dispatch(postFeedback(firstname, lastname,telnum, email, agree, contactType, message)),
      googleLogin: () => dispatch(googleLogin()),
      loginUser: (values) => dispatch(loginUser(values)),
      logoutUser:()=> dispatch(logoutUser()),
      signupUser:(values) => dispatch(signupUser(values)),
      //observer:()=> dispatch(observer())
  });
  class MainClass extends Component{
   
    componentDidMount(){
      this.props.fetchDishes()
      this.props.fetchComments()
      this.props.fetchPromos()
      this.props.fetchLeaders()
      const user = localStorage.getItem('user') 
      
    }

    

    
    render(){
      const HomePage = () => {
    return (
      <Home
        dishes={this.props.dishes.dishes.filter(dish => dish.featured === true )[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishesErrMess={this.props.dishes.errMess}

        Promotions={this.props.Promotions.Promotions.filter(promo => promo.featured === true )[0]}
        promosLoading={this.props.Promotions.isLoading}
        promosErrMess={this.props.Promotions.errMess}

        Leaders={this.props.Leaders.Leaders.filter(leader => leader.featured === true )[0]}
        leadersLoading={this.props.Leaders.isLoading}
        leadersErrMess={this.props.Leaders.errMess}


      />
    );
  };

  const DishWithId = () =>{
    const {dishId} = useParams();
    

    return (
      <>
        Comments total {this.props.Comments.Comments.length}
        <p>
          Comments on this dish
          {this.props.Comments.Comments.filter(c => c.dishId === 0).length}
        </p>
        <DishDetails
            dish={this.props.dishes.dishes.filter(dish => dish._id === dishId)[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.Comments.Comments.filter(comment => comment.dishId === dishId)}
            commentsErrMess={this.props.Comments.errMess}
            postComment={this.props.postComment}
            deleteComment={this.props.deleteComment}
        />
      </>
    );
  };

        return(
            <div >
        <Header
          auth={this.props.auth}
          loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser}
          googleLogin={this.props.googleLogin}
          signupUser={this.props.signupUser}
          />
            <AnimatedRoutes 
              HomePage={HomePage}
              DishWithId={DishWithId}
              dish={this.props.dishes}
              reset={this.props.resetFeedbackForm}
              Leaders={this.props.Leaders.Leaders}
              postFeedback={this.props.postFeedback}

            />
        <Footer/>
      </div>
        )
    }
    

}


export default connect( mapStateToProps,mapDispatchToProps)(MainClass)