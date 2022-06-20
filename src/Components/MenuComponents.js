import React from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";

 function RenderMenuItem (props) {
   
  return(
      <div key={props.dish.id} className="col-12 col-md-5 mx-auto mt-5">
        <div>
          <Card >
            <Link to ={`/menu/${props.dish.id}`} >
            <CardImg width="100%"src={props.dish.image}/>
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
    
      const menu = props.dishes.map( (dish) => {
        return(
          <RenderMenuItem key= {dish.id} dish={dish} />
        )

      })
    
      
      return(
          <div className="container">
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
          </div>
      )
 }   

