import { useHistory } from "react-router-dom"

export function ModalGenerarCompensacion(){

    const history = useHistory()



    const pushToDenunciaAVerificar = () => history.push('/denunciasAVerificar')


    return(

       
       <div class="modal fade" id="modalCompensacion" tabindex="-1" role="dialog" aria-labelledby="modalCompensacionLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header justify-content-around">
                            <h5 class="modal-title" id="modalCompensacionLabel">Generar Compensacion Para</h5>
                        </div>
                        <div class="modal-body p-5 d-flex justify-content-around">
                        <form>
                            <div class="form-group">
                                <label for="recipient-name" class="col-form-label">Usuario</label>
                                <input type="text" class="form-control" id="recipient-name"/>
                            </div>
                            <div class="form-group">
                                <label for="message-text" class="col-form-label">Motivo:</label>
                                <textarea class="form-control" id="message-text"></textarea>
                            </div>
                        </form>
                        </div>
                        <div class="modal-footer d-flex justify-content-around">
                            <button type="button" class="btn btn-primary" onClick={() => pushToDenunciaAVerificar()}>Generar Compensacion</button>
                        </div>
                    </div>
                </div>
        </div>
    )
}

