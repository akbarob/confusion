import React from "react";
import { Card, CardBody, CardImg,  CardText, CardTitle,  Breadcrumb, BreadcrumbItem, Button } from "reactstrap";
import { Link } from "react-router-dom";
import RenderCommentForm from "./CommentForm";
import { Loading } from "./Loading";
import {motion} from 'framer-motion'


function RenderDish(props){
  console.log('sjow dish')

  const dish = props.dish
  console.log("function working")
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
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
              </Card>
            </div>
          </motion.div>
        )
      }
      else{
        return(<div></div>)
      }
}

function RenderComments (props){
  console.log('sjow comment')

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
                const itemId = item.id
                console.log(itemId)
                return (
                    <motion.li key={item.id}
                    variants={child}
                    >
                    <p>{item.comment}</p>
                      <p>--{item.author}, {" "}
                        {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit"
                        }).format(new Date(Date.parse(item.date)))}
                      </p>
                       <Button className=" btn-warning" >
                        <span className="fa fa-trash"></span> Remove Comment</Button>
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
  console.log('sjow DIsh Details')

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
            <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments} 
            postComment={props.postComment}
            dishId={props.dish.id}
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

