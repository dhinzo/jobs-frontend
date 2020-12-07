import React from 'react'
// import Nav from 'react-bootstrap/Nav'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import PageOne from '../PageOne'
import PageTwo from '../PageTwo'

export default function ViewJob(props) {
    console.log("Here are the props in ViewJob: ", props)
    return (
          <Tabs defaultActiveKey='home'>
            <Tab eventKey='home' title='Job Info'>
                <PageOne
                    deleteJob={props.deleteJob}
                    findJobToEdit={props.jobToEdit}
                    updateJob={props.updateJob}                    
                    viewJob={props.viewJob}
                    backToJobs={props.backToJobs}
                    openEditModal={props.openEditModal} />
            </Tab>
            <Tab eventKey='link' title='Track Your Progress'>
                <PageTwo
                    viewJob={props.viewJob} />
            </Tab>
              </Tabs>
    )
}
