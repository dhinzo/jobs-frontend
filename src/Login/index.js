import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function Login(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const intialInputState = {username: '', password: ''}
    const [eachEntry, setEachEntry] = useState(intialInputState)
    const {username, password} = eachEntry
   
     const handleInputChange = (e) =>{
        setEachEntry({ ...eachEntry, [e.target.name]: e.target.value})
    }
     const handleSubmit = (e) =>{
        e.preventDefault()
        //lifting up state
        props.login(eachEntry)
        handleClose()
    }
    
    return (
        <>
          <Button variant="primary" onClick={handleShow}>
            Login
          </Button>
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Username"
                        name={username}
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Title of Position</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        name={password}
                        onChange={handleInputChange} />
                </Form.Group>
              <Button
              variant="primary"
              type='submit'
              onClick={handleSubmit}>
                Login
              </Button>
            
            </Form>
            </Modal.Body>
            
          </Modal>
        </>
    )
}
