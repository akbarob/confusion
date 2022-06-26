import Header from './Header';
import Footer from './Footer';
import Contact from './Contact';
import About from './About';
import Menu from './MenuComponents';

import DishDetails from "./DishDetails";
import Home from './HomeComponents';
import { Navigate, Route, Routes,useParams} from 'react-router-dom'
import { addComment,fetchDishes } from '../redux/ActionCreators';
import { Component } from 'react';
import { connect } from 'react-redux';
import { actions} from "react-redux-form";

const mapStateToProps = state => {
    return {
      dishes: state.Dishes,
      Leaders: state.Leaders,
      Comments: state.Comments,
      Promotions: state.Promotions
    };
  };
  
  const mapDispatchToProps = dispatch => ({
    addComment: (dishId, rating, author, comment) =>
      dispatch(addComment(dishId, rating, author, comment)),
      fetchDishes:() => {dispatch(fetchDishes())},
      resetFeedbackForm: ()=> {dispatch(actions.reset('feedback'))}
  });
  class MainClass extends Component{
    constructor(props){
       super(props) 
    }

    componentDidMount(){
      this.props.fetchDishes()
    }
    render(){
        const HomePage = () => {
    return (
      <Home
        dishes={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishesErrMess={this.props.dishes.errMess}
        Leaders={this.props.Leaders.filter(leader => leader.featured)[0]}
        Promotions={this.props.Promotions.filter(promo => promo.featured)[0]}
      />
    );
  };

  const DishWithId = () =>{
    const {dishId} = useParams();

    return (
      <>
        Comments total {this.props.Comments.length}
        <p>
          Comments on this dish
          {this.props.Comments.filter(c => c.dishId === 0).length}
        </p>
        <DishDetails
            dish={this.props.dishes.dishes.filter(dish => dish.id === parseInt(dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.Comments.filter(
            comment => comment.dishId === parseInt(dishId, 10)
          )}
          addComment={this.props.addComment}
        />
      </>
    );
  };


        return(
            <div >
        <Header/>
        
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/home' element={<HomePage/>}/>
            <Route path='/menu' element={<Menu dishes={this.props.dishes} />} />
            <Route path='menu/:dishId' element={<DishWithId/>}/>
            <Route path='/contact' element={<Contact resetFeedbackForm={this.props.resetFeedbackForm}/>} />
            <Route path='/about' element={<About Leaders={this.props.Leaders} />}/>
            <Route path='*' element={<Navigate to='/'/>}/>
          
          </Routes>
          
        
        <Footer/>
      </div>
        )
    }
    

}


export default connect( mapStateToProps,mapDispatchToProps)(MainClass)