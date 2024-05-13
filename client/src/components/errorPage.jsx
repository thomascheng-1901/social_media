import React from 'react'
import { Link } from 'react-router-dom'

const errorPage = () => {
    return (
        <div>
            <h1>OPPS... Something wrong has occured </h1>
            <Link to = "/"></Link>
        </div>
    )
}

export default errorPage
