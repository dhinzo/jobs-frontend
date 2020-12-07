import React from 'react'
import Button from 'react-bootstrap/Button'

export default function DeleteButton(props) {
        
    return (
        <React.Fragment>
            <Button
                onClick={() => props.deleteJob(props.viewJob.id)}
                variant='outline-danger'>Delete Job</Button>
        </React.Fragment>
    )
}
