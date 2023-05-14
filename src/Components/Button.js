import React from 'react'

const Button = ({name,color,onClick}) => {

  return (
    <button onClick={onClick} style={{backgroundColor:color}} className="btn">{name}</button>
  )
}

export default Button
