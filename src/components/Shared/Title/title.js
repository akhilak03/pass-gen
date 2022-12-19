import React from 'react'
import './title.css'

const title = ({title,description,description2}) => {
  return (
    <div className='main text-center'>
      <div className='title'>{title}</div>
      <div className='description'>{description}</div>
      <div className='description2'>{description2}</div>
    </div>
  )
}

export default title