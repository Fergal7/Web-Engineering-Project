import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {AiFillHome} from 'react-icons/ai';
import {AiOutlineSearch} from 'react-icons/ai';
import {AiOutlineUpload} from 'react-icons/ai';
import {AiOutlineUser} from 'react-icons/ai';
import {AiOutlineFire} from 'react-icons/ai';
import '../App.css'

function NavBar() {
    return(
        <div class = "color-nav">
        <Navbar  class= "color-nav" expand="lg" >
        <Container>
            <Navbar.Brand href="/"> <img
          alt=""
          src="/SpotifyLogo.png"
          width="200"
          height="110"
          className="d-inline-block align-top" /></Navbar.Brand>


            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/">Home <AiFillHome/></Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link href="/search">Search <AiOutlineSearch/></Nav.Link>
                <Nav.Link href="/upload">Upload <AiOutlineUpload/></Nav.Link>
                <Nav.Link href="/artists">Artists<AiOutlineUser/></Nav.Link>
                <Nav.Link href="/popular">Most popular<AiOutlineFire/></Nav.Link>
            </Nav>
            
            </Navbar.Collapse>

        </Container>
        
        </Navbar>
        </div>
    );
} 

export default NavBar;
