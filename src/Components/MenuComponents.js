import React from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./Loading";
import {motion} from 'framer-motion'


 function RenderMenuItem (props) {
   
  return(
      <div key={props.dish.id} className="col-12 col-md-5 mx-auto mt-5">
        <div>
          <Card >
            <Link to ={`/menu/${props.dish.id}`} >
            <CardImg width="100%"src={ baseUrl + props.dish.image}/>
            <CardImgOverlay>
              <CardTitle>{props.dish.name}</CardTitle>
            </CardImgOverlay>
            </Link>
          </Card>
        </div>
      </div>
    )
  
  } 
  export default function Menu (props){
    
      const menu = props.dishes.dishes.map( (dish) => {
        return(
          <RenderMenuItem key= {dish.id} dish={dish} />
        )

      })
      if(props.dishes.isLoading){
        return(
          <div className="container">
            <div className="row">
              <Loading/>
            </div>
          </div>
        )
      }
      else if(props.dishes.errMess){
        return(
          <div className="container">
            <div className="row">
              <h4>{props.dishes.errMess}</h4>
            </div>
          </div>
        )
      }
      else
    
      
      return(
          <motion.div className="container"
          initial={{opacity:0, width:0}}
          animate={{opacity:1, width:"100%"}}
          exit={{opacity:0, x:window.innerWidth, transition:{duration:0.3}}}
            
          >
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to='/home'>HOME</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  Menu
                </BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                <h3>Menu</h3>
                <hr />
              </div>

            </div>
            <div className="row">
              {menu}
            </div>
          </motion.div>
      )
 }   

