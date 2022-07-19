import { Navbar, NavbarBrand,Nav, NavbarToggler, NavItem, Collapse, Modal, ModalBody, ModalHeader, Button,  Row,Col, Label, } from 'reactstrap';
import { Control,  Form,} from "react-redux-form";
import {  NavLink } from 'react-router-dom';
import { useState } from 'react';
export default function Header (){
    
    const[open, setOpen] =useState(false)
    function toggleNav(){
        setOpen(prevState => !prevState)
    }
    
    const[ModalOpen,  setModalOpen]=useState(false)
    function toggleModal(){
        setModalOpen(prevState => !prevState)
    }
    function handleSubmit(values){
        toggleModal()
        alert("Login Succesfully" + JSON.stringify(values));
        console.log("THANK YOU FOR YOUR FEEDBACK" + JSON.stringify(values));
        //props.loginDetails(
         //   values.username,
          //  values.password,
          //  values.remember
       // )

    }
    
    return(
        <>
            <Navbar dark expand="lg">
                    
                    <NavbarBrand  className='' href="/" >
                        <img src='assets/images/logo.png' width='41'height='30'alt="Ristorante Con Fusion"/>
                    </NavbarBrand>
                    <NavbarToggler onClick={toggleNav} className='col-2 '/>
                    <Collapse isOpen={open} navbar className=' ml-auto'>
                    <Nav navbar className='ml-auto'>
                           <NavItem>
                               <NavLink className="nav-link" to='/home'>
                                   <span className='fa fa-home fa-lg'></span> Home
                               </NavLink>
                           </NavItem>
                           <NavItem>
                               <NavLink className="nav-link" to='/about'>
                                   <span className='fa fa-info fa-lg'></span> About
                               </NavLink>
                           </NavItem>
                           <NavItem>
                               <NavLink className="nav-link" to='/menu'>
                                   <span className='fa fa-list fa-lg'></span> Menu
                               </NavLink>
                           </NavItem>
                           <NavItem>
                               <NavLink className="nav-link" to='/contact'>
                                   <span className='fa fa-address-card fa-lg'></span> Contact
                               </NavLink>
                           </NavItem>
                    </Nav>
                    
                    <Nav className='ms-auto'>
                        <NavItem>
                            <Button outline onClick={toggleModal}>
                                <span className='fa fa-sign-in fa-lg'> LOGIN</span>
                            </Button>
                        </NavItem>

                    </Nav>
                    </Collapse>
            </Navbar>
            <div className=" jumbotron ">
                <div className='container'>
                    <div className='row row-header'>
                        <div className='col-12 c0l-sm-6'>
                            <h1>Ristorante Con Fusion</h1>
                            <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={ModalOpen} toggle={toggleModal} >
                <ModalHeader >LOGIN
                    <Button close className='m-auto' onClick={toggleModal}></Button>
                </ModalHeader>
                <ModalBody>
                    <Form model='feedback' onSubmit={(values) => handleSubmit(values)}>
                        <Row className="form-group my-3">
                            <Label htmlFor='username'>Username</Label>
                            <Col md={12}>
                            <Control.text 
                            className='col-12 form-input'
                            model='.username'
                            name='username' 
                            type='text' 
                            id='username'
                            />
                            </Col>
                        </Row>
                        <Row className="form-group my-3">
                            <Label htmlFor='password'>Password</Label>
                            <Col md={12}>
                            <Control.text
                            className='col-12 form-input'
                            model=".password"
                            name='password' 
                            type='password' 
                            id='password'
                            />
                            </Col>
                        </Row>
                        <Row className="form-group my-3">
                            <Col md={10}>
                            <div className='form-check'> 
                            <Label check  className='col-12'>
                                <Control.checkbox
                                model=".remember"
                                className='form-check-input'
                                name='remember'
                                /><strong>Remember me</strong>
                            </Label>
                            </div>
                             </Col>
                        </Row>
                        <Row  className="form-group my-3" >
                                <Button className=' offset-1  col-4' type="submit" color="primary">Login</Button>
                                <Button className= " offset-2 col-4" color='danger'onClick={toggleModal}>Cancel</Button>
                        </Row>                    
                </Form>

                </ModalBody>
            </Modal>
        </>
    )
}