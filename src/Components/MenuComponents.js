import React from "react";
import { Link } from "react-router-dom";
import { Row, Col,Button,Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, Badge, CardBody } from "reactstrap";
import { Loading } from "./Loading";
import {motion} from 'framer-motion'


 function RenderMenuItem (props) {
   
  return(
      <div  className="col-12 col-md-6 mx-auto my-5 justify-content-center ">
          <Card  className="shadow-sm border-0" >
            <Link to ={`/menu/${props.dish._id}`}  className='menu-item'>
              <Row className="g-0">
                <Col xs={4}>
                  <CardImg width="100%"src={props.dish.image}/>
                  <CardImgOverlay className="position-relative"><Badge pill color="danger" className="position-absolute top-0 start-100 translate-middle">{props.dish.label}</Badge>
                  </CardImgOverlay>
                  </Col>
                <Col xs={8}>
                  <CardBody>
                    <CardTitle> <h3>{props.dish.name}</h3></CardTitle>
                    <CardTitle> <h4><span className="naira">N</span> {props.dish.price}</h4></CardTitle>
                  </CardBody>
                </Col>
              </Row>
            
           
            </Link>
          </Card>
      </div>
    )
  
  } 
  export default function Menu (props){
    
      const menu = props.dishes.dishes.map( (dish) => {
        return(
          <RenderMenuItem key= {dish._id} dish={dish} />
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
          exit={{opacity:0, x:window.innerWidth, transition:{duration:0.5}}}
            
          >
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to='/home'>Home</Link>
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
            <div className="row mx-auto text-center">
              {menu}
            </div>
          </motion.div>
      )
 }   

