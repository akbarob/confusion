import { useState } from "react";
import { Button, Modal, ModalBody,ModalHeader, Label, Row, Col } from "reactstrap";
import { Control,  Form, Errors} from "react-redux-form";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const required =(val)=> val && val.length
const maxLength =(len) => (val) =>!(val) || (val.length <= len)
const minLength =(len) => (val) => (val) && (val.length >= len)
const isNumber =(val) => !isNaN(Number(val))
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


export default function Reservation(){
    const [modal, showModal] = useState(false)
    function toggleReservation(){
        showModal(prevState => !prevState)
    }
    function handleReserve(values){
        toggleReservation()
        alert("Reservation Succesfully" + JSON.stringify(values));

    }

    return(
        <div className="text-center mt-3">
            <OverlayTrigger
            placement="right"
            overlay={<Tooltip id='reservation-tooltip'>Make A Reservation</Tooltip>}>
                <Button color="outline-warning" className="shadow-none text-center" onClick={toggleReservation}>Reservations</Button>
            </OverlayTrigger>

            <Modal isOpen={modal} toggle={toggleReservation} >
                <ModalHeader > Reserve Table
                    <h6 className="reserver-text">Please fill the form below accurately to enable us serve you better!.. welcome!</h6>
                </ModalHeader>
                <ModalBody>
                    <Form model='reserve' onSubmit={(values) => handleReserve(values)}>
                        <Row className="form-group my-3">
                            <Col className="col-12 col-md-6">
                                <Label htmlFor='firstname'>FirstName</Label>
                                <Col >
                                <Control.text 
                                className='col-12 form-input'
                                model='.firstname'
                                name='firstname' 
                                type='text' 
                                id='firstname'
                                placeholder="FirstName"
                                validators={{
                                    required, minLength: minLength(2), maxLength: maxLength(15)
                                }}
                                />
                                <Errors
                                className="text-danger" model=".firstname"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: ' Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}/>
                                </Col>
                            </Col>
                            <Col className="col-12 col-md-6">
                                <Label htmlFor='lastname'>LastName</Label>
                                <Col >
                                <Control.text 
                                className='col-12 form-input'
                                model='.lastname'
                                name='lastname' 
                                type='text' 
                                id='lastname'
                                placeholder="LastName"
                                validators={{
                                    required, minLength: minLength(2), maxLength: maxLength(15)
                                }}
                                />
                                <Errors
                                className="text-danger" model=".lastname"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: ' Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}/>
                                </Col>
                            </Col>
                            
                        </Row>
                        <Row>
                            <Label htmlFor="email">E-mail</Label>
                            <Col>
                                <Control.text
                                    className='col-12 form-input'
                                    model='.email'
                                    name='email' 
                                    type='text' 
                                    id='email'
                                    placeholder="email@.com"
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
                        <Row>
                            <Col>
                                <Label htmlFor="phone">Phone No</Label>
                                <Col>
                                    <Control.text
                                        className='col-12 form-input'
                                        model='.phone'
                                        name='phone' 
                                        type='text' 
                                        id='phone'
                                        placeholder="e.g 08137272091"
                                        validators={{
                                            required, isNumber, minLength: minLength(11),
                                            maxLength: maxLength(11),
                                        }}
                                    />
                                    <Errors
                                    model=".phone"
                                    className="text-danger"
                                    show="touched"
                                    messages={{
                                        required: "Rqquired",
                                        minLength: 'Must be 11 numbers',
                                        maxLength: 'Must be 11 numbers',
                                        isNumber: 'Must be a number'

                                    }}/>
                                </Col>
                            </Col>
                            <Col>
                                <Label htmlFor="guest">#of Guests</Label>
                                <Col>
                                    <Control.text
                                        className='col-12 form-input'
                                        model='.guest'
                                        name='guest' 
                                        type='number' 
                                        id='guest'
                                        placeholder="1"
                                        validators={{required, isNumber}}
                                    />
                                    <Errors
                                    model=".guest"
                                    className="text-danger"
                                    show="touched"
                                    messages={{
                                        required: "Required",
                                        isNumber: 'Must be a number'}}/>
                                </Col>
                            </Col>
                        </Row>
                       
                        <Row>
                            <Label htmlFor="reservationType">Reservation Type</Label>
                            <Col>
                                <Control.select
                                className="form-select"
                                model='.reservationType'
                                name="reservationType"
                                id="reservationType"
                                >
                                    <option>Dinner</option>
                                    <option>VIP/Mezzanine</option>
                                    <option>Birthday/ Anniversary</option>
                                    <option>Nightlife</option>
                                    <option>Private</option>
                                    <option>Corporate</option>
                                    <option>Other</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <Label htmlFor="specialRequest"> Any special requests? (optional)</Label>
                            <Control.textarea
                            model=".specialRequest"
                            className="form-control"
                            name="specialRequest"/> 

                            </Col>
                        </Row>
                        <Row  className="form-group my-3 text-center" >
                            <Col >
                                <Button type="submit" color="warning">Reserve</Button>
                            </Col>
                        </Row>
                    </Form>


                </ModalBody>

            </Modal>
        </div>
    )
}

