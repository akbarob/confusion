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
    const container = {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.5
          }
        }
      }
      
      const item = {
        hidden: { opacity: 0 },
        show: { opacity: 1 }
      }
      
      
    
    return(
        <>
            <motion.div className="container"
             initial={{opacity:0, width:0}}
             animate={{opacity:1, width:"100%"}}
             exit={{opacity:0, x:window.innerWidth, transition:{duration:0.3}}}>
                <motion.div className="row align-items-start"
                variants={container}
                initial="hidden"
                animate="show">
                    <motion.div className="col-12 col-md m-1"
                    variants={item} >
                        <RenderCard item={props.dishes} 
                        isLoading={props.dishesLoading}
                        errMess={props.dishesErrMess}
                        />
                    </motion.div>
                    <motion.div className="col-12 col-md m-1"
                    variants={item} >
                        <RenderCard item={props.Promotions}
                        isLoading={props.promosLoading}
                        errMess={props.promosErrMess}/>
                    </motion.div>
                    <motion.div className="col-12 col-md m-1"
                    variants={item} >
                        <RenderCard item={props.Leaders}
                        />
                    </motion.div>

                </motion.div>

            </motion.div>
        </>
    )
}