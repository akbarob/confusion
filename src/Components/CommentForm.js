import { useState } from "react";
import React from "react";
import { Control, Errors, Form,} from "react-redux-form";

import { Modal, ModalBody, ModalHeader,Button, Label, Row,Col } from "reactstrap";



const required =(val)=> val && val.length
const maxLength =(len) => (val) =>!(val) || (val.length <= len)
const minLength =(len) => (val) => (val) && (val.length >= len)



export default function RenderCommentForm(props){
const[ModalOpen,  setModalOpen]=useState(false)
function toggleModal(){
    setModalOpen(prevState => !prevState)
}
function handleSubmit(values){
    toggleModal()
    
    //console.log("current State is" + JSON.stringify(values));
    //alert("current State is" + JSON.stringify(values));
    props.postComment(
        props.dishId, 
        values.rating, 
        values.author, 
        values.comment)
    
  }

    return(
        <div className="container">
            <Modal isOpen={ModalOpen} toggle={toggleModal} >
                <ModalHeader> Comment
                    <Button close className='m-auto' onClick={toggleModal}></Button>
                </ModalHeader>
                <ModalBody>
                    <Form model="form"onSubmit={(values => handleSubmit(values))}>
                        <Row className="form-group">
                            <Label htmlFor="rating" md="2"> Select Rating</Label>
                            <Col md="10">
                                <Control.select
                                model=".rating" 
                                className="form-select"
                                name='rating'
                                >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label for="author" md="2"> Your Name</Label>
                            <Col md={10}>
                                <Control.text
                                    model=".author"
                                    className="form-input col-12"
                                    id="author"
                                    name="author"
                                    placeholder="Your Name"
                                    validators={{required,
                                        minLength: minLength(2),
                                        maxLength: maxLength(15),
                                    }}
                                />
                                <Errors
                                model='.author'
                                className="text-danger"
                                show='touched'
                            messages={{
                            required: 'Required',
                            minLength: 'Must be greater than 2 numbers',
                            maxLength: 'Must be 15 numbers or less',
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label for="comment" md="2"> Comment</Label>
                            <Col md={10}>
                            <Control.textarea
                                    model=".comment"
                                    className="form-input col-12"
                                    id="comment"
                                    name="comment"
                                    placeholder="Comment here"
                                    rows={6}/>
                            </Col>
                        </Row>
                        <Button  color='primary' type="submit" >Submit</Button>
                    </Form>

                    
                </ModalBody>
            </Modal>
            <Button outline onClick={toggleModal} >
                <span className='fa fa-pencil fa-lg'> Submit Comment</span>
            </Button>
        </div>
    )
}
