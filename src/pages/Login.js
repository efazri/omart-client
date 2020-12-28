import React, { useEffect } from 'react'


export default function Login () {
    useEffect(() => {
        fetch('http://localhost:3000/product',{
            method: 'GET'
          })
            .then((resp) => {
              return resp.json()
            })
            .then(data => {
                console.log(data)
            })
    }, [])
    
    return (
        <div>
            <h1>
                Login
            </h1>
        </div>
    )
}