import {Redirect,
    BrowserRouter as Router,
    Route,
     } from 'react-router-dom';
import './App.css';
import { Login } from './vistas/Login';
import { RampasAHabilitar } from './vistas/RampasAHabilitar';
import { DenunciasAVerificar } from './vistas/DenunciasAVerificar';
import { Balance } from './vistas/Balance';
import { VerificarDenuncias } from './vistas/VerificarDenuncias';
import { HabilitarRampa } from './vistas/HabilitarRampa';



export const RunAPPRoutes = () => 
    <Router>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/rampasAHabilitar" component={RampasAHabilitar}/>
        <Route path="/denunciasAVerificar" component={DenunciasAVerificar}/>
        <Route path="/balance" component={Balance}/>
        <Route path="/verificarDenuncia/:id" component={VerificarDenuncias}/>
        <Route path="/habilitarRampa/:id" component={HabilitarRampa}/>
    </Router>

