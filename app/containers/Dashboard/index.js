/**
 *
 * Dashboard
 *
 */

import React from 'react';
import ContentWrapper from 'components/Layout/ContentWrapper';
import { Grid, Row, Col } from 'react-bootstrap';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Roles from 'containers/Roles';
import YourRole from 'containers/YourRole';
import NeededResources from 'containers/NeededResources';
import PledgedResources from 'containers/PledgedResources';
import TableExtendedRun from 'components/Tables/TableExtended.run';
import PanelsRun from 'components/Elements/Panels.run';
import Clock from './Clock';

export class Dashboard extends React.Component { // eslint-disable-line react/prefer-stateless-function
 
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 1
    };
  }

  componentDidMount() {
    PanelsRun();
    TableExtendedRun();
  }

  handleSelect(key) {
    console.log('Tab selected ' + key);
    this.setState({
      key
    });
  }

  render() {
    return (
      <ContentWrapper>
        <Helmet>
          <title>DASHBOARD</title>
          <meta name="description" content="Description of Dashboard" />
        </Helmet>

        <h3>DASHBOARD
          <small>

          </small>

        </h3>

        <Grid fluid>

          { /* START widgets box */}
          <Row>
            <Col lg={3} sm={6}>
              { /* START widget */}
              <div className="panel widget bg-primary">
                <Row className="row-table">
                  <Col xs={4} className="text-center bg-primary-dark pv-lg">
                    <em className="icon-check fa-3x"></em>
                  </Col>
                  <Col xs={8} className="pv-lg">
                    <div className="h2 mt0">370 
                    </div>
                    <div className="text-uppercase">Hrs</div>
                    <div className="text-uppercase">Worked</div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg={3} sm={6}>
              { /* START widget */}
              <div className="panel widget bg-purple">
                <Row className="row-table">
                  <Col xs={4} className="text-center bg-purple-dark pv-lg">
                    <em className="icon-heart fa-3x"></em>
                  </Col>
                  <Col xs={8} className="pv-lg ">
                    <div className="h2 mt0">4,255
                    </div>
                    <div className="text-uppercase">Karma</div>
                    <div className="text-uppercase">PTS</div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg={3} md={6} sm={12}>
              { /* START widget */}
              <div className="panel widget bg-green">
                <Row className="row-table">
                  <Col xs={4} className="text-center bg-green-dark pv-lg">
                    <em className="icon-disc fa-3x"></em>
                  </Col>
                  <Col xs={8} className="pv-lg">
                    <div className="h2 mt0">84</div>
                    <div className="text-uppercase">Array</div>
                    <div className="text-uppercase">Coins</div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Clock />
          </Row>
          { /* END widgets box */}


          { /* END row */}
          {/* <h4 className="page-header mt0">Roles</h4> */}
          { /* START row */}
          <Row>
            
            <Col md={8}>
              <Roles />
            </Col>
    
            
            <Col md={4}>
              <YourRole />
            </Col>
    
          </Row>
          
          { /* END row */}

          <Row>

            <Col md={8}>
              <NeededResources />
            </Col>


            <Col md={4}>
              <PledgedResources />
            </Col>

          </Row>

          { /* END row */}
          
        </Grid>

      </ContentWrapper>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Dashboard);
