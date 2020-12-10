import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'

export default function Login(props) {
    // console.log("here are the props in Login", props)
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // const handleInputChange = (e) => {
    //   setEachEntry({ ...eachEntry, [e.target.name]: e.target.value})
    // }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = async (username, password) => {
      const url = process.env.REACT_APP_API_URL + "/trackr/users/login"
      try {         
          const res = await axios.post(url, {
              username: username,
              password: password
          }, { withCredentials: true })
          if (res.status === 200) {   
              setUsername(username)
              setPassword(password)              
              //console.log(res)
              props.setUser(res.data.data.username)
              props.clearJobs()
              props.getJobs()
              // console.log("here are the props after login: ", state)
          }     
      } catch(err) {
          console.log("there was an error logging in: ", err)
      }
  }


    const handleLoginSubmit = (e) => {
      e.preventDefault()
        //lifting up state
      login(username, password)      
      handleClose()
    }

 
    
    return (
        <div>
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
                        onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        name={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
              <Button
              variant="primary"
              type='submit'
              onClick={handleLoginSubmit}>
                Login
              </Button>
            
            </Form>
            </Modal.Body>            
          </Modal>
          
          
        </div>
    )
}
