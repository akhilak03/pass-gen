import React from 'react'
import { FcWorkflow } from "react-icons/fc";
import { FcReading,FcAlphabeticalSortingAz,FcAbout } from "react-icons/fc";
import { FcDiploma2 } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import { clearLoginStatus } from '../../../Slices/userSlice'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Route, Routes, NavLink } from 'react-router-dom'

function NavBar(){
    const navbar = {backgroundColor: 'rgba(0,0,0,0.5)'};

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
    
    return(
    <>
        <Navbar style={navbar}  expand="sm" variant='dark' sticky='top'>
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
      </>
    )
}

export default NavBar