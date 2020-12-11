import React from 'react'
import Button from 'react-bootstrap/Button'

export default function Logout(props) {
    
    const logout = async () => {
        const url = process.env.REACT_APP_API_URL + "/trackr/users/logout"
        try {
            const res = await fetch(url)
            await res.json()
            if (res.status === 200 || res.status === 201) {
                props.unsetUser()
            }
        } catch(err) {
            console.log("error trying to logout", err)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        logout()
    }

    return (
        <React.Fragment>
            <Button
                
                
                className='LogoutBtn'
                onClick={handleSubmit}>LOGOUT</Button>
        </React.Fragment>
    )
}
