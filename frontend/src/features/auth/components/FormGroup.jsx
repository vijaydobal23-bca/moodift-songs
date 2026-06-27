import React from 'react'

const FormGroup = ({label,placeholder ,value,onChange}) => {
  return (
    
      <div className='form-group'>
        <label htmlFor={label}>{label}</label>
        <input type = "text" id = {label} name={label} value={value} onChange={onChange}
        placeholder={placeholder}></input>
      </div>
   
  )
}

export default FormGroup
