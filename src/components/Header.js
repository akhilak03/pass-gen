import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Route, Routes, NavLink } from 'react-router-dom'
import Home from './Home';
import Landing from './Landing';
import HostEvent from './HostEvent';
import Login from './Login';
import Event from './Event';
import Signup from './Signup';
import Key from './Key';
import ViewEvents from './ViewEvents'
import EditPage from './EditPage'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import { clearLoginStatus } from '../Slices/userSlice'
import { FcDiploma2 } from "react-icons/fc";
import "./Header.css"
import { FcWorkflow } from "react-icons/fc";
import { FcReading,FcAlphabeticalSortingAz,FcAbout } from "react-icons/fc";
import Paypal from './Paypal';
import SuccessPage from './SuccessPage';
import Card from './Card';
function Header() {
  let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector(
    (state) => state.user
  )

  //get dispath function
  let dispath = useDispatch()

  //get navigate function
  let navigate = useNavigate()

  //logout user
  const userLogout = () => {
    localStorage.clear();
    dispath(clearLoginStatus());
    navigate("/login");
  }


  return (
    <>

      <Navbar collapseOnSelect bg="dark" expand="sm" variant='dark' sticky='top'>
        <Container>
        <h2><FcDiploma2 /></h2>
          <a href="/" className='bootstrap'><Navbar.Brand>
            EVENT PASS
          </Navbar.Brand>
          </a>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto navbar">
              {isSuccess !== true ? (
                <>
                <h2><FcWorkflow /></h2>
                  {/* These links can be visible when no user logged in */}
                  <Nav.Item>
                    <Nav.Link eventKey={1} as={NavLink} to="/">
                      Home
                    </Nav.Link>
                  </Nav.Item>
                <h2><FcAlphabeticalSortingAz/></h2>
                  <Nav.Item>
                    <Nav.Link eventKey={2} as={NavLink} to="/Signup">
                      Signup
                    </Nav.Link>
                  </Nav.Item>
                <h2><FcAbout/></h2>
                  <Nav.Item>
                    <Nav.Link eventKey={3} as={NavLink} to="/login">
                      Login
                    </Nav.Link>
                  </Nav.Item>
                </>
              ) : (
                <>
                  {/* This dropdown is visible only when a user is logged in */}
                  <h2><FcReading /></h2>
                  <NavDropdown title={userObj.username} id="collasible-nav-dropdown">
                    <NavDropdown.Item>
                      <Nav.Link as={NavLink} to="/Home" className='text-dark'>
                        Home
                      </Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Nav.Link as={NavLink} to="/Key" className='text-dark'>
                        EditEvent
                      </Nav.Link>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={userLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/HostEvent" element={<HostEvent />} />
        <Route path="/Event" element={<Event />} />
        <Route path="/Card" element={<Card/>} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Key" element={<Key />} />
        <Route path="/ViewEvents" element={<ViewEvents />} />
        <Route path="/EditPage" element={<EditPage />} />
        <Route path="/SuccessPage" element={<SuccessPage />} />
        <Route path="/Paypal" element={<Paypal />} />
      </Routes>
    </>
  )
}

export default Header