import { Media } from "reactstrap"


export default function Menu(props){
    
    return(
        <div className="container mt-5">
            
                <Media list className="row">
                    <Media left middle className="col-2">
                        <Media src={props.dish.image} alt={props.dish.name}/>
                    </Media>
                    <Media body className=" col-9">
                        <Media heading>{props.dish.name}</Media>
                        <p>{props.dish.description}</p>

                    </Media>

                </Media>
                
            
            <hr/>

        </div>

    )
}