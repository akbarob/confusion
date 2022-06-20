import React from "react";


function RenderComment (props){
    const comment = props.comments
    console.log(comment)
    if(comment !=null){
        return(
            <div className="container">
                <ul className="unstyled">
                <h4>COMMENTS</h4> 
                <li>{comment.comments.map(comment=> {
                    return(
                        <div key={comment.id}>
                            <p> {comment.comment}</p>
                            <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US' , {year: "numeric", month:"long", day:"2-digit"}).format(new Date(Date.parse(comment.date)))}</p>
                        </div>
                    )
                })}</li>
            </ul>
            </div>
        )
    }
}  


export default function CommentDetails (props){
   return(
       <>
        <RenderComment comments={props.comments}/>
       </>
   )
}