import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav,
   NavItem, NavLink, UncontrolledDropdown, Dropdown, DropdownMenu, 
   DropdownItem, DropdownToggle  } from 'reactstrap';
   
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer'; 

import { makeSelectCurrentUser} from 'containers/App/selectors';

// Import required images
import Logo from '../../../assets/logo/logo.png';

import './styles.css';


export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,  
      
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar className="navbar navbar-expand-lg navbar-light bg-light fixed-top" style={{width: '100%', boxShadow: '0px 1px 10px -2px rgba(0,0,0,0.4' }}  >
          <NavbarBrand href="/" style={{
            color: 'rgba(0, 0, 0, 0.55)',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            fontWeight: '500',
            fontSize: '17px',
          }} > <img src={Logo} style={{ maxWidth: '9em'}} className="img img-responsive" /> </NavbarBrand>
         
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
              <form className="form-inline justify-content-center">
                <NavItem>
                  <Link
                    to="signup"
                    className="btn btn-outline-primary btn_signup">Signup</Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="login"
                    className="btn btn-outline-success btn_login">Login</Link>
                </NavItem>
            </form>
            </Nav>
          </Collapse>
        </Navbar>

      </div>
    );
  }
}



Navbar.propTypes = {
  light: PropTypes.bool,
  dark: PropTypes.bool,
  fixed: PropTypes.string,
  color: PropTypes.string,
  role: PropTypes.string,
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  // pass in custom element to use
}



NavbarBrand.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  // pass in custom element to use
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
