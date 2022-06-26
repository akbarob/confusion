import React from "react";
import { Card, CardBody, CardImg,  CardText, CardTitle,  Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import { Button } from "bootstrap";
import RenderCommentForm from "./CommentForm";
import { Loading } from "./Loading";
import { baseUrl } from "../shared/baseUrl";


function RenderDish(props){
  const dish = props.dish
  if(dish !=null){
      return(
        <div className="container" >
          
          <div className="row">
            <Card>
                <CardImg width="100%"src={baseUrl + dish.image}/>
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
              </Card>
              
            </div>
          </div>
        )
      }
      else{
        return(<div></div>)
      }
}

function RenderComments (props){
  const comments= props.comments

  if(comments !=null){
      return(
        <div className="container" >
            <h4>COMMENTS</h4> 
            <ul className="list-unstyled">
              <div>{ comments.map((item) => {
                return (
                  <div key={item.id}>
                  <li>{item.comment}</li>
                  <li>
                    --{item.author}{" "}
                    {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit"
                    }).format(new Date(Date.parse(item.date)))}
                  </li>
                  <br/>
                  </div>)})}
              </div>
            </ul>
            <RenderCommentForm  
            dishId={props.dishId}
            addComment={props.addComment}
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
  else if(props.dish !=null)
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
            addComment={props.addComment}
            dishId={props.dish.id}/>
            
        </div>
    </div>
    </div>
);
  
    
    
}

