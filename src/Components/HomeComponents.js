import { Card, CardBody,CardImg, CardText, CardTitle, CardSubtitle } from "reactstrap"

function RenderCard(props){
    console.log(props.item.name)


        return(
            <Card>
                <CardImg src={props.item.image} alt={props.item.name}/>
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
                        <RenderCard item={props.dishes}/>
                    </div>
                    <div className="col-12 col-md m-1">
                        <RenderCard item={props.Promotions}/>
                    </div>
                    <div className="col-12 col-md m-1">
                        <RenderCard item={props.Leaders}/>
                    </div>

                </div>

            </div>
        </>
    )
}