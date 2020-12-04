import React from 'react'
import Button from 'react-bootstrap/Button'

export default function PageOne(props) {
    console.log("Here are the props in PageOne: ", props)
    return (
        <div>
            <h4>Company:</h4>
           <h5>{props.viewJob.company}</h5>
           <h4>Position:</h4>
           <h5>{props.viewJob.position}</h5>
           <p>Location: {props.viewJob.location}</p>
           <Button
                onClick= {() => props.backToJobs()}>Back to Jobs</Button>
            
        </div>
    )
}
