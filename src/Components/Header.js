import { Navbar, NavbarBrand,Nav, NavbarToggler, NavItem, Collapse, Modal, ModalBody, ModalHeader, Button, Form, FormGroup, Label,Input } from 'reactstrap';
import {  NavLink } from 'react-router-dom';
import { useState } from 'react';
export default function Header (){
    const[formData, setFormData]=useState({
        username:'',
        password:'',
        remeber:false
    })
    const[open, setOpen] =useState(false)
    function toggleNav(){
        setOpen(prevState => !prevState)
    }
    
    const[ModalOpen,  setModalOpen]=useState(false)
    function toggleModal(){
        setModalOpen(prevState => !prevState)
    }
    function handleLogin(event){
        toggleModal()
        alert('username: ' + formData.usename.value + "password: " + formData.password.value + "Remember :" + formData.remember.checked)
        Event.preventDefault()

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
                    <Form onSubmit={handleLogin}>
                        <FormGroup>
                            <Label htmlFor='username'>Username</Label>
                            <Input name='username' 
                            type='text' 
                            id='username'
                            innerRef={input=> formData.username = input}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='password'>Password</Label>
                            <Input name='password' 
                            type='password' 
                            id='password'
                            innerRef={input=> formData.password = input}/>
                        </FormGroup>
                        <FormGroup check>
                            <Label check >
                                <Input  type='checkbox' 
                                name='remember'
                                innerRef={input=> formData.remember = input} />Remember me
                            </Label>
                        </FormGroup>
                        <Button  className='primary' type='submit' onClick={toggleModal}>LOGIN</Button>
                    </Form>

                </ModalBody>
            </Modal>
        </>
    )
}