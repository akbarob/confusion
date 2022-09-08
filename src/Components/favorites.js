import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Loading } from "./Loading"
import { Row, Col, Button, Card, CardImg, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, } from "reactstrap"

function RenderFavoritesItems(props){
    console.log(props.dish)
    return(
        <Card className="mb-5 border-0 shadow-sm" >
         <Row>
            <Col xs={3}>
                <CardImg className= 'img-fluid' src={props.dish.image} alt={props.dish.name} style={{ width:"10rem"}}/>
            </Col>
            <Col xs={7}>
                <CardBody >
                    <CardTitle>
                    {props.dish.name}
                    <p>{props.dish.price}</p>
                    </CardTitle>
                </CardBody>
            </Col>
            <Col xs={2}>
                <Button className ='text-center' size='sm' outline color='danger'>
                    <span className="fa fa-times "></span>
                </Button>
            </Col>
         </Row>
            
        </Card>
    )
}


export default function Favorites(props){
    if (props.Favorites.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.Favorites.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.Favorites.errMess}</h4>
                </div>
            </div>
        )
    }
    else if(props.Favorites.Favorites){
        console.log(props.Favorites.Favorites.dishes)
     const favor =props.Favorites.Favorites.dishes.map( (dishId) => {
        let dish = props.dishes.dishes.filter(dish => dish._id === dishId.dishId)[0]
        
        
        return(
            <RenderFavoritesItems key={dishId._id} dish={dish}/>
        )
     })
    return(
        
        <motion.div className="container"
          initial={{opacity:0, width:0}}
          animate={{opacity:1, width:"100%"}}
          exit={{opacity:0, x:window.innerWidth, transition:{duration:0.3}}}
          >
            <h4>Favprites</h4>
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to='/home'>Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                My Favorites
                </BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                <h3>My Favorites</h3>
                <hr />
              </div>

            </div>
            <div className="">
                <h6>You currently have {favor.length} Favorites</h6>
                {favor}
            </div>
          </motion.div>
    )
    }
    else{
        return(
            <div className="container">
            <div className="row">
                <h4>You have no favorites</h4>
            </div>
        </div>
        )
    }
    
}