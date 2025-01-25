import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children}:any) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector((state: any) => state.auth.status)

    useEffect(() => {
        if(!authStatus){
            navigate("/login")
        }
        setLoader(false)
    }, [authStatus, navigate])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}
