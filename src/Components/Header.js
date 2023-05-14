import React from 'react'
import Button from './Button'
import { useLocation } from 'react-router-dom'
// import PropTypes from 'prop-types'


// const style={color:'blue',backgroundColor:'black'};

const Header = ({onAdd , showAdd}) => {
  const location =useLocation()
  return (
    <header className='header'>
      <h1 >Task Tracker</h1>
      {location.pathname==='/'&& <Button color={showAdd? 'red':'green'  } name={showAdd? 'close':'Add'  }  onClick={onAdd} />}
      
    </header>
  )
}

// Header.defaultProps={
//     title :"helllllo"
// }


// Header.PropTypes={
//     title:PropTypes.string.isRequired,
// }


export default Header
