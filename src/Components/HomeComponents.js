import { Card, CardBody,CardImg, CardText, CardTitle, CardSubtitle } from "reactstrap"
import { baseUrl } from "../shared/baseUrl"
import { Loading } from "./Loading"

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
            <div className="container">
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

            </div>
        </>
    )
}