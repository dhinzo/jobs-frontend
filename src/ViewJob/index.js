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
            <Tab eventKey='home' title='Page One'>
                <PageOne
                    viewJob={props.viewJob}
                    backToJobs={props.backToJobs} />
            </Tab>
            <Tab eventKey='link' title='Page Two'>
                <PageTwo
                    viewJob={props.viewJob} />
            </Tab>
              </Tabs>
    )
}
