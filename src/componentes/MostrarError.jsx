import React from 'react'
import Alert from 'react-bootstrap/Alert';



 // eslint-disable-next-line
export const MostrarError = ({errorMessage}) => {
   // eslint-disable-next-line
  if (!errorMessage) {
    return <span className="disabled"></span>
  
  }
  
  return (
    <>
    <Alert variant="warning">
        <Alert.Link>{errorMessage}</Alert.Link>
      </Alert>
  </>
  )

}

