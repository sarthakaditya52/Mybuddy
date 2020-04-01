import React, { Component } from 'react'

import{
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
    } from 'reactstrap';
    
class AppNavbar extends Component{
    
    state = {
    isOpen: false
    }

    toggle = () => {
    this.setState({
        isOpen: !this.state.isOpen
    });
    }
    
    render() {
    return(
            <div>
                <Navbar id="nav" color="light" dark expand="sm" className="mb-3">
                    <Collapse isOpen = { this.state.isOpen } navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink href="#">
                                        Somewhere
                                    </NavLink>
                                </NavItem>
                            </Nav>
                    </Collapse>
                    <Container>
                        <NavbarBrand href = "/">Icon</NavbarBrand>
                        <NavbarToggler onClick = { this.toggle } />
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default AppNavbar;
