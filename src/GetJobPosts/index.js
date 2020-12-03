import React from 'react'
import Card from 'react-bootstrap/Card'

export default function GetJobPosts(props) {
    const allJobs = props.jobs.map(job => {
        return (
            <Card
                key={job.id}
                bg='dark'
                text={'bg' === 'light' ? 'dark' : 'white'}
                style={{ width: '15rem' }}
                className="mb-2"
                >
                <Card.Header>{job.company}</Card.Header>
                <Card.Body>
                    <Card.Title>
                    {job.position}
                    </Card.Title>
                    <Card.Text>
                    {job.location}
                    </Card.Text>
                </Card.Body>            
            </Card>
        )
    })
    return (
        <Card>{allJobs}</Card>
    )
}
