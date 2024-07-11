import { useHistory } from "react-router-dom"

export function ModalRechazo(){

    const history = useHistory()
    const pushToDenunciaAVerificar = () => history.push('/denunciasAVerificar')
    return(
        <div class="modal fade" id="modalRechazo" tabindex="-1" role="dialog" aria-labelledby="modalRechazoLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header justify-content-around">
                            <h5 class="modal-title" id="modalRechazoLabel">Motivo de rechazo</h5>
                        </div>
                        <div class="modal-body p-4 d-flex justify-content-around">
                        <form>
                            <div class="form-group">
                                <textarea placeholder='Escriba aqui...' class="form-control" id="message-text"></textarea>
                            </div>
                        </form>
                        </div>
                        <div class="modal-footer d-flex justify-content-around">
                            <button type="button" class="btn btn-primary" onClick={() => pushToDenunciaAVerificar()}>Enviar</button>
                        </div>
                    </div>
                </div>
        </div>
    )
}