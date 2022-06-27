import { Card, CardBody,CardImg, CardText, CardTitle, CardSubtitle } from "reactstrap"
import { baseUrl } from "../shared/baseUrl"
import { Loading } from "./Loading"
import {motion} from 'framer-motion'


function RenderCard(props){
   // console.log(props.item.name)
    if(props.isLoading){
        return(
            <Loading/>
        )
    }
    else if(props.errMess){
        return(
            <h4>{props.errMess}</h4>
        )
    }
    else

        return(
            <Card>
                <CardImg src={baseUrl + props.item.image } alt={props.item.name}/>
                <CardBody>
                    <CardTitle>
                        {props.item.name}
                    </CardTitle>
                    {props.item.designation ? <CardSubtitle>{props.item.designation}</CardSubtitle> :null}
                   <CardText>{props.item.description}</CardText> 
                </CardBody>
                
                
            </Card>
        )
    }
export default function Home(props){
    
    return(
        <>
            <motion.div className="container"
             initial={{opacity:0, width:0}}
             animate={{opacity:1, width:"100%"}}
             exit={{opacity:0, x:window.innerWidth, transition:{duration:0.3}}}>
                <div className="row align-items-start">
                    <div className="col-12 col-md m-1">
                        <RenderCard item={props.dishes} 
                        isLoading={props.dishesLoading}
                        errMess={props.dishesErrMess}
                        />
                    </div>
                    <div className="col-12 col-md m-1">
                        <RenderCard item={props.Promotions}
                        isLoading={props.promosLoading}
                        errMess={props.promosErrMess}/>
                    </div>
                    <div className="col-12 col-md m-1">
                        <RenderCard item={props.Leaders}
                        />
                    </div>

                </div>

            </motion.div>
        </>
    )
}