import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function EditJobForm(props) {
    //console.log("props in edit modal: ", props)
    const [lgShow, setLgShow] = useState(false)
    
    
    
    const initialInputState = {
        company: props.viewJob.company, 
        position: props.viewJob.position, 
        location: props.viewJob.location, 
        materials_required: props.viewJob.materials_required, 
        link: props.viewJob.link, 
        notes: props.viewJob.notes
    }
    
    const [eachEntry, setEachEntry] = useState(initialInputState)
    const { company, position, location, materials_required, link, notes } = eachEntry 

    const handleInputChange = e => {
        setEachEntry({ ...eachEntry, [e.target.name]: e.target.value })
      }
    
    const handleSubmit = e => {
        e.preventDefault()
        props.updateJob(eachEntry)
        setLgShow(false)
        //props.onClick(props.onClick)
    }

    return (
        <>
        <Button
            variant='outline-warning'
            onClick={() => setLgShow(true)}>Edit</Button>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              EDIT THIS JOB
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>NAME OF COMPANY</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder={props.viewJob.company}
                        name="company"
                        value={company}
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>TITLE OF POSITION</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Title of Position"
                        name="position"
                        value={position}
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>JOB LOCATION</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder={props.viewJob.location}
                        name="location"
                        value={location}
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>REQUIRED MATERIALS</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder={props.viewJob.materials_required}
                        name="materials_required"
                        value={materials_required}
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>JOB POSTING LINK</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder={props.viewJob.link}
                        name="link"
                        value={link}
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>ADD NOTES ABOUT THIS JOB</Form.Label>
                    <Form.Control 
                        as="textarea"
                        rows={4} 
                        placeholder={props.viewJob.notes}
                        name="notes"
                        value={notes}
                        onChange={handleInputChange} />
                </Form.Group>
                <Button 
                    className='LoginBtn'
                    type="submit"
                    onClick={handleSubmit}
                    >
                    SUBMIT
                </Button>
            </Form>

          </Modal.Body>
        </Modal>
        </>
    )
}