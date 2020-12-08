import React from 'react'
import Card from 'react-bootstrap/Card'
//import Button from 'react-bootstrap/Button'
// import EditJobForm from '../EditJobForm'

// create conditional (ternary) 
// if job.user.id === current_user.id && 
// then show the card
// else don't show

// DragAndDropContext


// Draggable

export default function GetJobPosts(props) {
    console.log("these are the props in getJobs: ", props)
    const allJobs = props.jobs.map(job => {
        return (
            <Card
                key={job.id}
                bg='dark'
                text={'bg' === 'light' ? 'dark' : 'white'}
                style={{ width: '15rem', marginLeft: '2px', marginRight: '2px', marginTop: '5px'}}
                className="mb-2 row d-flex"
                

                >
                <Card.Header
                    
                    onClick={ () => props.viewJob(job.id)}>{job.company}</Card.Header>
                <Card.Body>
                    <Card.Title>
                    {job.position}
                    </Card.Title>
                    <Card.Text>
                    {job.location}
                    </Card.Text>
                </Card.Body>            
            <Card.Footer>
                
            </Card.Footer>
            </Card>
        )
    })
    return (
        <div className='container' style={{ border: '1px solid black' }}>
            <div className='row'>{allJobs}</div>
        
        </div>
    )
}
