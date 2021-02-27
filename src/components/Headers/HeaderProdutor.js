/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = ({cardsData}) => {
  const lastCardsData = cardsData.slice(-1)[0];
  const showPercentage = cardsData.length > 1;

  const arrowGen = (v1, v2) => {

    const value1 = Number(v1);
    const value2 = Number(v2);

    return value1>value2?
      (
        <span className="text-warning mr-2">
          <i className="fas fa-arrow-down" /> {(value1*100)/value2}%
        </span>
      )
      :
      (
        <span className="text-success mr-2">
          <i className="fa fa-arrow-up" /> {(value2*100)/value1}%
        </span>
      );
  }

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Contagem bacteriana
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {lastCardsData?.ccb}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    {showPercentage && cardsData[0].ccb !== cardsData[1].ccb &&
                    (
                      <p className="mt-3 mb-0 text-muted text-sm">
                        {arrowGen(cardsData[0].ccb, cardsData[1].ccb)}
                        {" "}
                        <span className="text-nowrap">Desde o último exame</span>
                      </p>
                    )}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Contagem de células somáticas
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{lastCardsData?.ccs}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    {showPercentage && cardsData[0].ccs !== cardsData[1].ccs &&
                    (
                      <p className="mt-3 mb-0 text-muted text-sm">
                        {arrowGen(cardsData[0].ccs, cardsData[1].ccs)}
                        {" "}
                        <span className="text-nowrap">Desde o último exame</span>
                      </p>
                    )}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Uréia
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{lastCardsData?.ureia}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    {showPercentage && cardsData[0].ureia !== cardsData[1].ureia &&
                    (
                      <p className="mt-3 mb-0 text-muted text-sm">
                        {arrowGen(cardsData[0].ureia, cardsData[1].ureia)}
                        {" "}
                        <span className="text-nowrap">Desde o último exame</span>
                      </p>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
