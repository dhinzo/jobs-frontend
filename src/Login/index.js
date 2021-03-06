import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'

export default function Login(props) {
    // console.log("here are the props in Login", props)
    const [show, setShow] = useState(false);
    const [errMessage, setErrMessage] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const handleClose = () => {
      setShow(false)
      setErrMessage('')
      setUsername('')
      setPassword('')
    };
    const handleShow = () => setShow(true);


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
            // console.log(err)
            handleClose()
            setUsername('')
            setPassword('')
            setErrMessage('Invalid credentials. Please try again')
            handleShow()
      }
  }


    const handleLoginSubmit = (e) => {
      e.preventDefault()
      login(username, password)      
      handleClose()
    }

 
    
    return (
        <div>
          <Button
            className='LoginBtn'
            variant="info"
            onClick={handleShow}>
            LOGIN
          </Button>
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>LOGIN</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{
              backgroundColor: '#f8d7da',
              color: '#721c24',
              textAlign: 'center',
              borderRadius: '5px',
              marginBottom: '5px'}}>
              {errMessage}
              </div>
            <Form>
                <Form.Group>
                    <Form.Label>USERNAME</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Username"
                        name={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>PASSWORD</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        name={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
              <Button
              className='LoginBtn'
              type='submit'
              onClick={handleLoginSubmit}>
                LOGIN
              </Button>
            
            </Form>
            </Modal.Body>            
          </Modal>
          
          
        </div>
    )
}
