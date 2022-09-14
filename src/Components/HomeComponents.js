import { Card, CardBody,CardImg, CardText, CardTitle, CardSubtitle } from "reactstrap"
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
                <Card className="border-0 shadow">
                <CardImg src={ props.item.image } alt={props.item.name} />
                <CardBody >
                    <CardTitle>
                        <h4>{props.item.name}</h4>
                    </CardTitle>
                    {props.item.designation ? <CardSubtitle><em>{props.item.designation}</em></CardSubtitle> :null}
                   <CardText style={{maxheight: '3rem'}} >{props.item.description}</CardText> 
                </CardBody>
                
                
            </Card>

            
        )
    }
export default function Home(props){
    console.log(props.dishes)
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
            <motion.div className="container mt-5"
             initial={{opacity:0, width:0}}
             animate={{opacity:1, width:"100%"}}
             exit={{opacity:0, x:window.innerWidth, transition:{duration:.5}}}>
                <motion.div className="row align-items-start"
                variants={container}
                initial="hidden"
                animate="show">
                    <motion.div className="col-10 col-md-4 m-1 mx-auto"
                    variants={item} >
                        <RenderCard item={props.dishes} 
                        isLoading={props.dishesLoading}
                        errMess={props.dishesErrMess}
                        />
                    </motion.div>
                    <motion.div className="col-10 col-md-4 m-1 mx-auto"
                    variants={item} >
                        <RenderCard item={props.Promotions}
                        isLoading={props.promosLoading}
                        errMess={props.promosErrMess}/>
                    </motion.div>
                    <motion.div className="col-10 col-md-4 m-1 mx-auto"
                    variants={item} >
                        <RenderCard item={props.Leaders}
                        isLoading={props.leadersLoading}
                        errMess={props.leadersErrMess}
                        />
                    </motion.div>

                </motion.div>

            </motion.div>
        </>
    )
}