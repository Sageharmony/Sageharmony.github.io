import 'bootstrap/dist/css/bootstrap.min.css';
import {React, useState, useEffect} from 'react';
import { Container, NavDropdown, Nav, Navbar, NavItem, Button, Modal, Form} from 'react-bootstrap';
import axios from 'axios';

const NavbarFunction = () => {

  const [signIn, setSignIn] = useState(false);
  const [logIn, setLogIn] =useState(false)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);


  const handleShow = () => {
    setSignIn(!signIn);
    setLogIn(false)
    setShow(true) }
  
  const handleShow2 = () => {
    setLogIn(!logIn);
    setSignIn(false)
    setShow(true) }

    const [user, setUser] = useState([])
    const [UserName, setUserName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    
      const addNewUser = (event) =>{
          event.preventDefault()
          axios.post(
            'http://localhost:8080/signup', {
              UserName: UserName,
              email: email,
              password: password
          
            }
          ).then(() =>{
            axios.get('http://localhost:8080/signup').then( (response) =>{
              setUser(response.data)
            })
          })
        }
        useEffect(()=>{
          axios
              .get('http://localhost:8080/signup')
              .then((response)=>{
                setUser(response.data);
              })
        },[])

  return (
    <>
 <Navbar bg="white" expand="white"variant="light" id="navbar">
  <Container>
          <Navbar.Brand href="#home">
          <img src="https://i.imgur.com/8dnEHQf.jpg" height='200' width='200' id='logo'/>
          </Navbar.Brand>
          <Nav.Link href="#home" id="homeLink">Home</Nav.Link>
    <Nav.Link href="#Link" id="aboutLink">About</Nav.Link>

    <div id='loginDiv'>
    <Button variant="success" id='signup' onClick={handleShow}>
          Sign Up
        </Button>
        <Button variant="success" id='login' onClick={handleShow2}>
          Login
        </Button>
        
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            { signIn ?
            <Modal.Title>Sign Up For Kelp.</Modal.Title> : 
            <Modal.Title>Welcome Back Friend!</Modal.Title>
            }
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={addNewUser}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Gandalf-The-Grey"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Super Secret Password</Form.Label>
                <Form.Control type="password" rows={1} 
                placeholder="YouShallNotPass123"/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {signIn ?
             <Button variant="success" id='login' onClick={handleShow2}>
             Login
           </Button> :
            <Button variant="success" id='signup' onClick={handleShow}>
            Sign Up
          </Button> }
            <Button variant="primary" onClick={handleClose}>
              Welcome!
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  </Container>
</Navbar>
    </>
)
}

export default NavbarFunction