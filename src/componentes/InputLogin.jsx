
import React from 'react'


import PropTypes from 'prop-types'

export const InputLogin = ({ textoTitulo, type,value,onChange, onClick }) => {
    return (
        <div className="form-outline form-white mb-4">
             {console.log(value)}
            <label className="form-label">{textoTitulo}</label>
            <input  className="form-control text-center form-control-lg" type={type} placeholder={textoTitulo} value={value} onClick = {onClick} onChange={(event) => onChange(event.target.value)} />
        </div>
    )
}

InputLogin.propTypes = {
    textoTitulo: PropTypes.string,
    type: PropTypes.string,
    Icono: PropTypes.func,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func
}
