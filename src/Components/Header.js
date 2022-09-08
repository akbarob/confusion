import { Navbar, NavbarBrand,Nav, NavbarToggler, NavItem, Collapse, Modal, ModalBody, ModalHeader, Button,  Row,Col, Label, } from 'reactstrap';
import { Control,  Form,} from "react-redux-form";
import {  NavLink } from 'react-router-dom';
import { useState, useEffect, } from 'react';
import Reservation from './Resevation';
import { receiveLogin } from '../redux/ActionCreators';
export default function Header (props){
   
    // useEffect(()=>{
    //     let user 
    //     // props.fetchFavorites()
    //     user = localStorage.getItem('user')
    
    //     console.log(user)
    //     receiveLogin(user)
    
    // })
    
    const[open, setOpen] =useState(false)
    function toggleNav(){
        setOpen(prevState => !prevState)
    }
    
    const[ModalOpen,  setModalOpen]=useState(false)
    function toggleModal(){
        setModalOpen(prevState => !prevState)
    }
    function handleLogin(values){
        props.loginUser(values)
        toggleModal()
        //alert("Login Succesfully" + JSON.stringify(values));
        //console.log("THANK YOU FOR YOUR FEEDBACK" + JSON.stringify(values));
        setSignupModalOpen(false)
        setModalOpen(false)
        setOpen(false)
        

    }


    const[SignupModalOpen,  setSignupModalOpen]=useState(false)
    function toggleSignupModal(){
        toggleModal()
        setSignupModalOpen(prevState => !prevState)
        
    }
    function handleSignup(values){
        props.signupUser(values)
        setSignupModalOpen(false)
        setModalOpen(false)
        setOpen(false)
        
        //alert("account created Succesfully" + JSON.stringify(values));
        //alert("THANK YOU FOR YOUR FEEDBACK" + JSON.stringify(values));
       

    }
    function GoogleLogin(){
        props.googleLogin()
        setModalOpen(false)

    }
    function handleLogout(){
        props.logoutUser()

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
                               <NavLink className="nav-link" to='/menu'>
                                   <span className='fa fa-list fa-lg'></span> Menu
                               </NavLink>
                           </NavItem>
                            {props.auth.isAuthenticated ?
                            <NavItem>
                                <NavLink className="nav-link" to="/favorites">
                                    <span className="fa fa-heart fa-lg"></span> My Favorites
                                </NavLink>
                            </NavItem>
                            :
                                null
                            }
                           
                            
                           <NavItem>
                               <NavLink className="nav-link" to='/about'>
                                   <span className='fa fa-info fa-lg'></span> About
                               </NavLink>
                           </NavItem>
                           <NavItem>
                               <NavLink className="nav-link" to='/contact'>
                                   <span className='fa fa-address-card fa-lg'></span> Contact
                               </NavLink>
                           </NavItem>
                    </Nav>
                    
                    <Nav className="ms-auto" navbar>
                                <NavItem>
                                    { !props.auth.isAuthenticated ?
                                        <Button outline color='light' onClick={toggleModal}>
                                            <span className="fa fa-sign-in fa-lg"></span> Login
                                            {props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        :
                                        <Row>
                                            <Col sm='12' lg='auto'>
                                                <h6 className="navbar-text"> <small>{props.auth.user.email}</small></h6>
                                            </Col>
                                            <Col sm='12' lg='auto'>
                                                <Button outline color='light' onClick={handleLogout}>
                                                <span className="fa fa-sign-out fa-lg"></span> Logout
                                                {props.auth.isFetching ?
                                                    <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                    : null
                                                }
                                                </Button>
                                            </Col>
                                        </Row>
                                        
                                        
                                    }

                                </NavItem>
                            </Nav>
                    </Collapse>
            </Navbar>
            <div className=" jumbotron">
                <div className='container'>
                    <div className='row row-header'>

                        <div className='col-12 col-sm-9'>
                            <h1>Ristorante Con Fusion</h1>
                            <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                        </div>
                        <div className='col-12 col-sm-3'>
                            <Reservation/>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={ModalOpen} toggle={toggleModal} >
                <ModalHeader >LOGIN
                    <Button close className='m-auto' onClick={toggleModal}></Button>
                </ModalHeader>
                <ModalBody>
                    <Form model='login' onSubmit={(values) => handleLogin(values)}>
                        <Row className="form-group my-3">
                            <Label htmlFor='email'>email</Label>
                            <Col md={12}>
                            <Control.text 
                            className='col-12 form-control'
                            model='.email'
                            name='email' 
                            type='email' 
                            id='email'
                            autoComplete="on"
                            />
                            </Col>
                        </Row>
                        <Row className="form-group my-3">
                            <Label htmlFor='password'>Password</Label>
                            <Col md={12}>
                            <Control.text
                            className='col-12 form-control form-input'
                            model=".password"
                            name='password' 
                            type='password' 
                            id='password'
                            autoComplete="on"
                            />
                            </Col>
                        </Row>
                        
                        <Row  className="form-group my-3" >
                                <Button className=' offset-1  col-4' type="submit" color="primary" onClick={handleLogin}>Login</Button>
                                <Button className= " offset-2 col-4" color='danger'onClick={toggleModal}>Cancel</Button>
                        </Row>
                        <Row className='my-3 col-10 mx-auto'>
                            <Button color='outline-danger' onClick={GoogleLogin}><span className="fa fa-google fa-lg"></span> Login with Google</Button>    
                        </Row>      
                        <Row className='my-3 col-10 mx-auto'>
                            <Button color='outline-warning' onClick={toggleSignupModal}><span className="fa fa-envelope fa-lg"></span> SIGN UP WITH EMAIL</Button>    
                        </Row>                  
                </Form>

                </ModalBody>
            </Modal>
            <div>
            <Modal isOpen={SignupModalOpen} toggle={toggleSignupModal} >
                <ModalHeader >SIGN UP
                    <Button close className='m-auto' onClick={toggleSignupModal}></Button>
                </ModalHeader>
            <ModalBody>
                    <Form model='signup' onSubmit={(values) => handleSignup(values)}>
                        <Row className="form-group my-3">
                            <Label htmlFor='email'>email</Label>
                            <Col md={12}>
                            <Control.text 
                            className='col-12 form-control'
                            model='.email'
                            name='email' 
                            type='email' 
                            id='email'
                            autoComplete="on"
                            />
                            </Col>
                        </Row>
                        <Row className="form-group my-3">
                            <Label htmlFor='password'>Password</Label>
                            <Col md={12}>
                            <Control.text
                            className='col-12 form-control'
                            model=".password"
                            name='password' 
                            type='password' 
                            id='password'
                            autoComplete="on"
                            />
                            </Col>
                        </Row>
                        <Row className="form-group my-3">
                            <Label htmlFor='password'>displayName</Label>
                            <Col md={12}>
                            <Control.text
                            className='col-12 form-control'
                            model=".displayName"
                            name='displayName' 
                            type='text' 
                            id='displayName'
                            autoComplete="on"
                            />
                            </Col>
                        </Row>
                        
                        <Row  className="form-group my-3 mx-auto text-center" >
                            <Button type = 'submit' color='outline-warning' onClick={handleSignup}>SignUp</Button>
                        </Row> 
                                       
                </Form>

                </ModalBody>
            </Modal>
            </div>
        </>
    )
}