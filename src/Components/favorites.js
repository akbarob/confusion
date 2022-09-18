import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Loading } from "./Loading"
import { Row, Col, Button, Card, CardImg, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, } from "reactstrap"
import { useEffect } from "react"
import { fetchFavorites } from "../redux/ActionCreators"
import { useDispatch } from "react-redux"

function RenderFavoritesItems(props){
    const favId = props.dish._id
    const itemId = props.id // all dish id (collection id)

    // console.log(props.dish, itemId)
    
    function handleDeleteALL(){
        let _id=itemId
        console.log(_id)
        props.deleteAllFavorites(_id)
    }
    const favorites = props.dish.map(dish =>{
        function handleDeleteFavorites(){
            let _id=dish._id
            console.log(_id)
            props.deleteFavorites(_id)
        }
        console.log(dish._id)
        return(
            <Card className="mb-5 border-0 shadow-sm" key={dish._id}>
         <Row>
            <Col xs={3}>
                <CardImg className= 'img-fluid' src={dish.image} alt={dish.name} style={{ width:"10rem"}}/>
            </Col>
            <Col xs={7}>
                <CardBody >
                    <CardTitle>
                    <h3>{dish.name}</h3>
                    <h4><span className="naira">N</span> {dish.price}</h4>
                    </CardTitle>
                </CardBody>
            </Col>
            <Col xs={2}>
                <Button  type='submit'  className ='text-center' size='sm' outline color='danger' onClick={handleDeleteFavorites}>
                    <span className="fa fa-times "></span>
                </Button>
            </Col>
         </Row>
            
        </Card>

        )
    })
    return(
        <div>
            <Row className="mb-3">
                <Col className="col-10">
                    {favorites.length <= 1? <h6>You currently have {favorites.length} Favorite</h6>: <h6>You currently have {favorites.length} Favorites</h6>}
                    
                </Col>
                <Col className="ml-2">
                    {favorites.length >1 ? <Button outline color="danger" onClick={handleDeleteALL}>Delete All</Button>
                    :
                    null
                    }
                    
                </Col>
            </Row>

            {favorites}
        </div>
    )
}

export default function Favorites(props){
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchFavorites())
    },[fetchFavorites])
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
        let me = props.Favorites.Favorites.dishId
        console.log(me)

     const favor =props.Favorites.Favorites.dishId.map( (dishId) => {

        let dish = props.dishes.dishes.filter(dish => {
            return dishId.dishId.some(f => {
                return f === dish._id
            })
        })
        let fav = dishId.dishId

        // console.log(dish)
        // console.log(dishId._id)
        const itemId = dishId._id

        
        return(
            <RenderFavoritesItems  dish={dish} key={dishId._id} id={itemId} 
            deleteFavorites={props.deleteFavorites}
            deleteAllFavorites={props.deleteAllFavorites}/>
        )
     })
     console.log(favor)

    return(
        
        <motion.div className="container"
          initial={{opacity:0, width:0}}
          animate={{opacity:1, width:"100%"}}
          exit={{opacity:0, x:window.innerWidth, transition:{duration:0.5}}}
          style={{minHeight: "70vh"}}
          >
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
                {favor.length <1 ? 
                <div className="container text-center ">
                    <div className="row">
                        <h4>You have no favorites</h4>
                    </div>
                </div> 
                :
                favor}
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