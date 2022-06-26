import { Breadcrumb, BreadcrumbItem,  FormGroup, Input, Label,Col, Row, Button, FormFeedback } from "reactstrap" 
import { Link } from "react-router-dom"
import { useState } from "react"
import { Control, Form, Errors, actions } from "react-redux-form"


const required =(val)=> val && val.length
const maxLength =(len) => (val) =>!(val) || (val.length <= len)
const minLength =(len) => (val) => (val) && (val.length >= len)
const isNumber =(val) => !isNaN(Number(val))
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

export default function Contact(props){
  
  function handleSubmit(values){
    
    console.log("current State is" + JSON.stringify(values));
    alert("current State is" + JSON.stringify(values));
    props.resetFeedbackForm()
  }
  
    return(
         <div className="container">
          <div className="row">
                <Breadcrumb>
                  <BreadcrumbItem>
                    <Link to='/home'>HOME</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem active>
                    Contact Us
                  </BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                  <h3>Contact Us</h3>
                  <hr />
                </div>

              </div>
              <div className="row row-content">
                  <div className="col-12">
                  <h3>Location Information</h3>
                  </div>
                  <div className="col-12 col-sm-4 offset-sm-1">
                          <h5>Our Address</h5>
                          <address>
                          121, Clear Water Bay Road<br />
                          Clear Water Bay, Kowloon<br />
                          HONG KONG<br />
                          <i className="fa fa-phone"></i>: +852 1234 5678<br />
                          <i className="fa fa-fax"></i>: +852 8765 4321<br />
                          <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                          </address>
                  </div>
                  <div className="col-12 col-sm-6 offset-sm-1">
                      <h5>Map of our Location</h5>
                  </div>
                  <div className="col-12 col-sm-11 offset-sm-1">
                      <div className="btn-group" role="group">
                          <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                          <a role="button" className="btn btn-info" href="jd"><i className="fa fa-skype"></i> Skype</a>
                          <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                      </div>
                  </div>
              </div>
              <div className="row row-content">
            <div className="col-12">
              <h3>Send  Us Your Feedback</h3>
            </div>
            <div className="col-12 col-md-9">
              <Form model='feedback' onSubmit={(values) => handleSubmit(values)}>
                <Row  className="form-group my-3" >
                  <Label for="firstName" md='2'>First Name</Label>
                  <Col md={10}>
                                    <Control.text model=".firstname" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                      <Errors
                        className="text-danger"                                  model=".firstname"
                        show="touched"
                      messages={{
                                     required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                  </Col>
                  </Row>
                <Row  className="form-group my-3" >
                  <Label for="lastName" md='2'>Last Name</Label>
                  <Col md='10'>
                    <Control.text  model=".lastname"
                    className="form-control"
                    id='lastname' 
                    name='lastname' 
                    placeholder="last Name" 
                    validators={{required,
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                    />
                    <Errors
                    model='.lastname'
                    className="text-danger"
                    show='touched'
                    messages={{
                      required: 'Required',
                      minLength: ' Must be greater than 2 characters',
                      maxLength: ' Must be 15 characters or less'
                  }}
                    
                    />

                  </Col>
                  </Row>
                <Row  className="form-group my-3" >
                  <Label for="telnum" md='2'>Tel no.</Label>
                  <Col md='10'>
                    <Control.text 
                    model=".telnum"
                    className="form-control"
                    id='telnum' 
                    name='telnum' 
                    placeholder="e.g 08095481372" 
                    validators={{required,
                      minLength: minLength(10),
                      maxLength: maxLength(15),
                      isNumber
                    }}
                    />
                    <Errors
                    model=".telnum"
                    className="text-danger"
                    show='touched'
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 numbers',
                      maxLength: 'Must be 15 numbers or less',
                      isNumber: 'Must be a number'
                  }}
                    
                    />

                  </Col>
                  </Row>
                <Row  className="form-group my-3" >
                <Label for="email" md='2'> email</Label>
                <Col md={10}>
                  <Control.text model=".email" id="email" name="email"
                     placeholder="Email"
                     className="form-control"
                     validators={{
                               required, validEmail
                    }}
                  />
                  <Errors
                  className="text-danger"
                  model=".email"
                  show="touched"
                  messages={{
                    required: 'Required',
                    validEmail: ' Invalid Email Address'
                  }}
                                     />
                                </Col>
                  </Row>
                <Row  className="form-group my-3" >
                  <Col md={{size: 6, offset:2}}>
                    <div className="form-check">
                      <Label check>
                        <Control.checkbox 
                        model=".agree"
                        className="form-check-input"
                        name='agree' 
                        /> <strong>May we Contact you? </strong>
                      </Label>
                    </div>
                  </Col>
                  <Col xs={{size: 3, offset:1}}>
                        <Control.select model=".contactType" 
                        className="form-select"
                        name='contactType'> 
                        <option>Tel.</option>
                        <option>email</option>
                        </Control.select>
                  </Col>
                </Row>
                <Row  className="form-group my-3" >
                <Label htmlFor="textarea" md='2'>Your Feedback</Label>
                  <Col md='10'>
                    <Control.textarea 
                    model=".message"
                    className="form-control"
                     id='message' 
                     name='message' 
                     rows='12' 
                     placeholder="comment here" 
                     />
                  </Col>
                  </Row>
                <Row  className="form-radio" >
                  <legend className="legend">Satisfactory level</legend>
                    <div  className="form-radio" >
                  
                      <Control.radio 
                      model='.min'
                      className="form-radio-input"
                      id="min" name="satisfactory"  /> 
                      <Label htmlFor="min">4 - 7(Min)</Label>
                    
                    </div>
                    <div  className="form-radio" >
                      <Control.radio 
                      model='.min'
                      className="form-radio-input"
                      id="mid" name="satisfactory" 
                      /> 
                      <Label htmlFor="mid">4 - 7(Mid)</Label>
                    </div>
                    
                    <div  className="form-radio" >
                       <Control.radio 
                       model='.max'
                       className="form-radio-input"
                        id="max" 
                        name="satisfactory" 
                        />
                      <Label htmlFor="max">8 - 10(Max)</Label>

                    </div>

                </Row>
                <Row  className="form-group my-3" >
                  <Col md={{size:10, offset:2}}>
                    <Button type="submit" color="primary">Send Feedback</Button>
                  </Col>
               
                </Row>
              </Form>

            </div>

          </div>
          </div>
      
    )
}