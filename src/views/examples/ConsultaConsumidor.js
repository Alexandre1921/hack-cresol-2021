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
import NumberFormat from 'react-number-format';
import ReactLoading from 'react-loading';
import Checkbox from '@material-ui/core/Checkbox';
import { DataGrid } from '@material-ui/data-grid';
import { get_carga, get_coleta, get_produtor,get_lote_qualidade } from "../../controllers/ConsultaConsumidor"
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Form,
  Input,
  Container,
  Row,
  Col,
  Modal
} from "reactstrap";
// core components

class ConsultaConsumidor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      produtores: [],
      coletas: [],
      cargas: [],
      mdcss: 0,
      mdctb: 0,
      mdureia: 0,
    };
    this.columns = this.columns = [
      { field: 'nome', headerName: 'Produtor', width: 300 },
    ]
    this.get_data = this.get_data.bind(this)
  }

  get_data() {
    get_carga(this.props.match.params.lote).then(val => {
      let colet = []
      let prod = []
      val.forEach((carga) => {
        get_coleta(carga).then((col_val) => {
          col_val.forEach((t) => {
            colet.push(t)
          })
          col_val.forEach((col) => {
            get_produtor(col).then((prod_val) => {
              prod_val.forEach((t) => {
                let add = true
                prod.forEach(s => {
                  if (t.idProdutor == s.idProdutor) {
                    add = false
                  }
                })
                if (add) {
                  prod.push(t)
                }
              })
            })
          })
        })

      })
      this.setState({
        cargas: val,
        coletas: colet,
        produtores: prod,
      })
      console.log(this.state)
    })


  }


  render() {
    return (
      <>
        <Container className="mt--7" fluid>
          <Row>
            <Col lg="6" xl="3">
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0"
                      >
                        Contagem média de CC
                        </CardTitle>
                      <span className="h2 font-weight-bold mb-0">
                        {this.state.mdcss}
                      </span>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <i className="fas fa-chart-bar" />
                      </div>
                    </Col>
                  </Row>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-success mr-2">
                      <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                    <span className="text-nowrap">Since last month</span>
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" xl="3">
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0"
                      >
                        Contagem bacteriana média
                        </CardTitle>
                      <span className="h2 font-weight-bold mb-0">
                        {this.state.mdcss}
                      </span>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <i className="fas fa-chart-bar" />
                      </div>
                    </Col>
                  </Row>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-success mr-2">
                      <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                    <span className="text-nowrap">Since last month</span>
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Produtores</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div style={{ height: 500, width: '100%' }}>
                    <DataGrid
                      rows={this.state.produtores}
                      columns={this.columns}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Button
            color="primary" type="button"
            data-dismiss="modal"
            type="button"
            onClick={() => {this.get_data()}}
          >
            OK
            </Button>
        </Container>

        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.loadingModal}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Salvando coleta
            </h5>

          </div>
          <div className="modal-body">
            <div className="py-3 text-center">
              <div style={{ paddingLeft: "45%" }}>
                <ReactLoading type={"spin"} color={"#dddd"} height={'20%'} width={'20%'} />
              </div>
            </div>
          </div>
          <div className="modal-footer">

          </div>
        </Modal>
      </>
    )
  }
};

export default ConsultaConsumidor;
