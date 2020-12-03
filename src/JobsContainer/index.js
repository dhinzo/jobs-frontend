import React from 'react'
import axios from 'axios'
import GetJobPosts from '../GetJobPosts'
import NewJobForm from '../NewJobForm'
import Login from '../Login'

export default class JobsContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            jobs: [],
            loggedIn: false,
            loggedInUser: null
        }
    }

    login = async (loginInfo) => {
        const url = process.env.REACT_APP_API_URL + "/trackr/users/login"
        try {
            const res = await axios.post(url, {
                credentials: 'include',
                body: JSON.stringify(loginInfo),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const loginJson = await res.json()
            console.log(loginJson)
            if (res.status ===200 || res.status === 201){
                this.setState({
                    loggedIn: true,
                    loggedInUser: loginJson.data.username
                })
            }  
        } catch(err) {
            console.log("there was an error logging in: ", err)
        }
    }

    getJobs = async () => {
        try {
            const url = process.env.REACT_APP_API_URL + "/trackr/jobs/"
            const jobsRes = await fetch(url)
            const jobsJson = await jobsRes.json()
            this.setState({
                jobs: jobsJson.data,
            })
            console.log(jobsJson)
        } catch (err) {
            console.log("error getting jobs, ", err)
        }
    }

    addJob = async (job) => {
        const url = process.env.REACT_APP_API_URL + "/trackr/jobs/"
        try {
            const res = await axios.post(url, {
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(job)
            })
            const newJobJson = await res.json()
            if(res.status === 200 || res.status === 201){
                this.setState({
                    jobs: [...this.state.jobs, newJobJson.data]
                })
            }
        } catch(err) {
            console.log("error adding job: ", err)
        }
    }

    componentDidMount() {
       this.getJobs()
        
    }

    render() {
        return (
            <React.Fragment>
                <Login
                    login={this.login} />
                <NewJobForm
                    createJob={this.addJob} />
                <GetJobPosts
                    jobs={this.state.jobs} />
            </React.Fragment>
        )
    }
}
