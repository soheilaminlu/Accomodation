import { Navbar , Nav , NavDropdown , Form , FormControl , Button } from "react-bootstrap";

const Header = () => {
    return (
        <Navbar className="Navbar" expand="lg">
          <Navbar.Brand className="Navbar-brand" href="#home">Relaxation Refuge</Navbar.Brand>
          <Navbar.Toggle className="Navbar-Toggle" aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav mr-auto">
              <Nav.Link className="Nav-link" href="#home">Home</Nav.Link>
              <Nav.Link className="Nav-link" href="#link">Signup</Nav.Link>
              <NavDropdown className="Nav-drop" title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item className="Nav-drop-link" href="#action/3.1">About Reservation</NavDropdown.Item>
                <NavDropdown.Item  className="Nav-drop-link" href="#action/3.2">About Security & Safety</NavDropdown.Item>
                <NavDropdown.Item  className="Nav-drop-link" href="#action/3.3">About Us</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
}
 
export default Header