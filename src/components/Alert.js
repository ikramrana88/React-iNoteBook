import React from 'react'

export default function Alert(props) {
  return (
    <div style={{height: '30px'}}>

    {props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
    <strong>{props.alert.type}</strong>{props.alert.msg}</div>}
  
  </div>
  )
}
