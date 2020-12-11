import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'


export default function Register(props) {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')




    const register = async (username, password) => {
        const url = process.env.REACT_APP_API_URL + "/trackr/users/register"
        try {
            const res = await axios.post(url, {
                username: username,
                password: password
            }, { withCredentials: true })
            if (res.status === 200) {
                setUsername(username)
                setPassword(password)
                props.setUser(res.data.data.username)
            }
        } catch (err) {
            console.log("There was an error registering: " ,err)
        }
    }
    const handleSubmit = (e) => {
    e.preventDefault()
    register(username, password)  
    handleClose()
    }
    
    return (
        <>
          <Button
            className='RegisterBtn'
            variant="info"
            onClick={handleShow}>
            REGISTER
          </Button>
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>REGISTER</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>CREATE YOUR USERNAME</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter a Username"
                        name={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>CREATE A PASSWORD</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Create a Password"
                        name={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
              <Button
              className='RegisterBtn'
              type='submit'
              onClick={handleSubmit}>
                REGISTER
              </Button>
            
            </Form>
            </Modal.Body>
            
          </Modal>
        </>
    )
}
