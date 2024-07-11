
import {useEffect, useState} from 'react';
import { adminService } from '../services/AdminService';
import { obtenerMensaje } from "../services/obtenerMensaje";
import { useParams } from 'react-router-dom';
import { PropTypes } from 'prop-types'
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';



export const VerificarDenuncias= ({history}) => {
    
    const [denuncia,setDenuncia] = useState('')
    const [errorMessage, SetErrorMessage ] = useState("")
    const [show, setShow] = useState(false);
    const [showV2, setShowV2] = useState(false);
    const [showV3, setShowV3] = useState(false);
    const {id} = useParams()


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseV2 = () => setShowV2(false);
    const handleShowV2 = () => setShowV2(true);

    const handleCloseV3 = () => setShowV3(false);
    const handleShowV3 = () => {
        handleCloseV2();
        handleClose();
        setShowV3(true)};


    const denunciaAJuzgar = async () => {
        try{
        const canti = await adminService.traerDenuncia(id)
        setDenuncia(canti)}catch (error) {
            const message = obtenerMensaje(error)
            SetErrorMessage(message)
          }
    }

    const rechazarDenuncia = async() =>{
        try{  
          await adminService.rechazarDenuncia(id)
          handleShowV2()
            }
          catch (error) {
              const message = obtenerMensaje(error)
              SetErrorMessage(message)
          }
      }

      const aprobarDenuncia = async() =>{
        try{  
          await adminService.aprobarDenuncia(id)
          handleShow()
          }
          catch (error) {
              const message = obtenerMensaje(error)
              SetErrorMessage(message)
          }
      }

    
      const pushToDenunciaAVerificar = () => history.push('/denunciasAVerificar')
    
    useEffect(() => {
        denunciaAJuzgar();
      },[]);


    return (
        <div className='container mt-5'>
            <h2 className='text-center mb-5'>Verificar Denuncia</h2>
            <div className='row'>
                <div className='col-md-6'>
                    <img className='imagen-verificar-denuncias' src={denuncia.imagen} alt='...' />
                </div>
                <div className='col-md-6 verificar-denuncia-datos '>
                    <div>Fecha: {denuncia.fecha}</div>
                    <div>Direccion: {denuncia.direccionRampa}</div>
                    <div>Dominio: {denuncia.dominio}</div>
                    <div>Motivo: {denuncia.motivoDenuncia}</div>
                    <div className="d-flex justify-content-around">
                        <button className='btn btn-danger' data-toggle="modal" data-target="#modalRechazo"onClick={() => rechazarDenuncia()}>Rechazar</button>
                        <button className='btn btn-primary' data-toggle="modal" data-target="#modalCompensacion"onClick={() => aprobarDenuncia()}>Aceptar</button>
                    </div>

                    
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Generar Compensacion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                            <Form.Group className="mb-3" >
                                <Form.Label>Ingrese al usurio a compensar</Form.Label>
                                <Form.Control
                                type="Usuario"
                                placeholder=""
                                autoFocus
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                            >
                                <Form.Label>Motivo</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => handleShowV3()}>
                            Generar Compensacion
                            </Button>
                        </Modal.Footer>
                    </Modal>


                    <Modal show={showV3} onHide={handleCloseV3}>
                        <Modal.Header closeButton>
                            <Modal.Title>Operacion Exitosa</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>La operacion fue realizada con exito y se notifico al usuario</Modal.Body>
                        <Modal.Footer>
                        <Button variant="primary" onClick= {() => pushToDenunciaAVerificar()}>
                            Aceptar
                        </Button>
                        </Modal.Footer>
                    </Modal>


                    <Modal show={showV2} onHide={handleCloseV2}>
                        <Modal.Header closeButton>
                            <Modal.Title>Rechazar Denuncia</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                            <Form.Group
                                className="mb-3"
                            >
                                <Form.Label>Motivo del Rechazo</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => handleShowV3()}>
                            confirmar Rechazo
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
        
    )
}

VerificarDenuncias.propTypes = {

    history: PropTypes.object,
  
  }

export default withRouter(VerificarDenuncias)