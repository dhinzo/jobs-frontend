import React from 'react'
import Card from 'react-bootstrap/Card'
//import Button from 'react-bootstrap/Button'
// import EditJobForm from '../EditJobForm'

export default function GetJobPosts(props) {
    console.log("these are the props in getJobs: ", props)
    const allJobs = props.jobs.map(job => {
        return (
            <Card
                key={job.id}
                bg='dark'
                text={'bg' === 'light' ? 'dark' : 'white'}
                style={{ width: '15rem' }}
                className="mb-2"
                

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
        
        <Card>{allJobs}</Card>
      
    )
}
