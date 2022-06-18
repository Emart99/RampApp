import {BiLogOut} from 'react-icons/bi'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
export function Header() {

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                 <Navbar.Brand href="#home">RampApp</Navbar.Brand>
            </Nav>
            <Nav>
              <Nav.Link href='/denunciasAVerificar'>Verificar denuncias</Nav.Link>
              <Nav.Link href='/rampasAHabilitar'>Habilitar rampas</Nav.Link>
              <Nav.Link href='/login' ><BiLogOut/></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    )
}