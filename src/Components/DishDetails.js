import React from "react";
import { Card, CardBody, CardImg,  CardText, CardTitle,  Breadcrumb, BreadcrumbItem, Button, CardImgOverlay } from "reactstrap";
import { Link,  } from "react-router-dom";
import RenderCommentForm from "./CommentForm";
import { Loading } from "./Loading";
import {motion} from 'framer-motion'


function RenderDish(props){

  const dish = props.dish
  const itemId = props.dish._id
  function handleAddFavorites(id){
    const post= id.target.id
    // alert(post)
    props.postFavorites(post)
  console.log(post)  
}

  
  console.log(itemId)
  if(dish !=null){
      return(
        <motion.div className="container" 
        initial={{opacity: 0}}
          animate={{opacity:1}}
          exit={{opacity:0}}
          transition={{duration:0.5}} >
          <div className="row">
            <Card>
                <CardImg width="100%"src={ dish.image}/>
                <CardImgOverlay>
                
                </CardImgOverlay>
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
              </Card>
              <Button size="sm" type='submit' className=" btn-warning" onClick={ props.favorite ? console.log('Already favorite') : handleAddFavorites} id={itemId}>
                  {props.favorite ?
                  <span className="fa fa-heart"></span>
                 :
                  <span className="fa fa-heart-o"></span>
                  }
              </Button>
            </div>
          </motion.div>
        )
      }
      else{
        return(<div></div>)
      }
}

function RenderComments (props){
  function handleDelete(id){
    const del= id.target.id
    // console.log(del)
    props.deleteComment(del)
   
  }
  
  console.log(props.comments, "commets")
    

  const comments= props.comments
  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        staggerDirection: 1
      }
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren"
      }
    }
  };

  const child= {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 }
  };


  if(comments !=null){
    
      return(
        <div className="container">
            <h4>COMMENTS</h4> 
            <ul className="list-unstyled">
              <motion.div
              initial="hidden" animate="visible" variants={list}
              >{ comments.map((item) => {
                const itemId = item._id
                console.log(itemId)
                // console.log(item.author._id)
                // console.log(props.auth.user)
                
                return (
                    <motion.li key={item._id}
                    variants={child}
                    >
                    <p>{item.comment}</p>
                    <p>{item.rating} <span className="fa fa-star"></span></p>
                      <p>--{item.author.firstname}, {item.author.lastname}, {' '}
                        {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit"
                        }).format(new Date(Date.parse(item.updatedAT.toDate())))}
                      </p>
                      
                      {!props.auth.isAuthenticated ?
                      null
                         :
                         item.author._id == props.auth.user.uid?
                        <Button size="sm" type='submit' className=" btn-warning" 
                        onClick={handleDelete} id={itemId}>
                        
                         <span className="fa fa-trash"></span> Delete Comment</Button> 
                        :
                        null}
                                              
                        
                      <hr />
                    </motion.li>
                  
                  )})}
              </motion.div>
            </ul>
            <RenderCommentForm  
            dishId={props.dishId}
            postComment={props.postComment}
            
           />
        </div>
      )
  }
}  

export default function DishDetails (props){
  
  

  if(props.isLoading){
    return(
      <div className="container">
        <div className="row">
          <Loading/>
        </div>
      </div>
    )
  }
  else if(props.errMess){
    return(
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    )
  }
  else if(props.dish !=null){
    console.log(props.dish.name)
  return (
    <div className="container">
    <div className="row">
        <Breadcrumb>
            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
        </div>                
    </div>
    <div className="row">
        <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} 
            postFavorites={props.postFavorites}
            favorite={props.favorite}/>
        </div>
        <div className="col-12 col-md-5 m-1">
            <RenderComments 
            comments={props.comments} 
            postComment={props.postComment}
            dishId={props.dish._id}
            deleteComment={props.deleteComment}
            auth={props.auth}
            />
            
        </div>
    </div>
    </div>
  )

  }
  
  
  else 
  return(
    <div>emoty div</div>
  )
  
    
    
}

