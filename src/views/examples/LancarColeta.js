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
import ReactDatetime from "react-datetime";
import NumberFormat from 'react-number-format';
import ReactLoading from 'react-loading';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import salvar_coleta from '../../controllers/lancar_coleta.js'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Modal
} from "reactstrap";
// core components

import Header from "components/Headers/Header.js";


class LancarColeta extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quantidade: "",
      data: "",
      horario: "",
      temperatura: "",
      observacao: "",
      loadingModal: false,
      sucessModal: false,
      coleta: false

    };
    this.quantidadeChange = this.quantidadeChange.bind(this);
    this.dataChange = this.dataChange.bind(this);
    this.horarioChange = this.horarioChange.bind(this);
    this.temperaturaChange = this.temperaturaChange.bind(this);
    this.observacaoChange = this.observacaoChange.bind(this);
    this.coletaChange = this.coletaChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModalLoading = this.toggleModalLoading.bind(this);
    this.toggleModalSucess = this.toggleModalSucess.bind(this);
    this.toggleModalError = this.toggleModalError.bind(this);
  }

  quantidadeChange(event) {
    this.setState({ quantidade: event.target.value });
  }

  dataChange(event) {
    this.setState({ data: event._d });
  }

  coletaChange(event) {
    this.setState({ coleta: event.target.checked });
  }

  horarioChange(event) {
    this.setState({ horario: event.target.value });
  }

  temperaturaChange(event) {
    this.setState({ temperatura: event.target.value });
  }

  observacaoChange(event) {
    this.setState({ observacao: event.target.value });
  }

  toggleModalLoading() {
    this.setState({
      loadingModal: !this.state.loadingModal
    });
  }
  toggleModalSucess() {
    this.setState({
      sucessModal: !this.state.sucessModal
    });
  }
  toggleModalError() {
    this.setState({
      errorModal: !this.state.errorModal
    });
  }

  handleSubmit(event) {
    this.toggleModalLoading()
    salvar_coleta(this.state).then(() => {
      this.toggleModalLoading()
      this.toggleModalSucess()
    })
      .catch((error) => {
        this.toggleModalLoading()
        this.toggleModalError()
      });
    event.preventDefault();
  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Dados da coleta</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleSubmit}>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Data
                          </label>
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-calendar-grid-58" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <ReactDatetime
                                inputProps={{
                                  placeholder: "Seleciona uma data"
                                }}
                                timeFormat={false}
                                onChange={e => this.dataChange(e)}
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Horario
                          </label>
                            <Input
                              className="form-control-alternative"
                              id="input-horario"
                              placeholder="12:00 AM"
                              type="time"
                              value={this.state.horario}
                              onChange={this.horarioChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Quantidade
                          </label>
                            <NumberFormat
                              className="form-control"
                              id="input-quantidade"
                              thousandSeparator="."
                              decimalSeparator=","
                              decimalScale="2"
                              value={this.state.quantidade}
                              onChange={this.quantidadeChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Temperatura
                          </label>
                            <NumberFormat
                              className="form-control"
                              id="input-temperatura"
                              decimalSeparator=","
                              format="##,## °C "
                              decimalScale="2"
                              // value={this.state.temperatura}
                              onChange={this.temperaturaChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={this.state.coleta}
                                  onChange={this.coletaChange}
                                  name="coleta"
                                  color="primary"
                                />
                              }
                              label="Realizada coleta para análise"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">Observação</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <Input
                          className="form-control-alternative"
                          placeholder="Algo que deseja deixar obervado sobre essa coleta?"
                          rows="4"
                          type="textarea"
                          value={this.state.observacao}
                          onChange={this.observacaoChange}

                        />
                      </FormGroup>
                    </div>
                    <div className="d-flex justify-content-center">
                      <Button
                        className="float-right btn"
                        onClick={(e) => { this.handleSubmit(e) }}
                      >
                        Salvar
                  </Button>
                    </div>
                  </Form>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.sucessModal}
          toggle={() => this.toggleModalSucess()}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Coleta Salva com sucesso
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModalSucess("exampleModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="text-center">
              <i className="ni ni-check-bold ni-3x"
                style={{ color: "green", textAlign: "center", fontSize: "6em" }}
              />
            </div>

          </div>
          <div className="modal-footer">
            <Button
              color="primary" type="button"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModalSucess()}
            >
              OK
            </Button>
          </div>
        </Modal>
        <Modal
          className="modal-dialog-centered modal-danger"
          isOpen={this.state.errorModal}
          toggle={() => this.toggleModalError()}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Falha ao salvar coleta
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModalError()}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="text-center">
              <i className="ni ni-fat-remove ni-3x"
                style={{ color: "white", textAlign: "center", fontSize: "6em" }}
              />
              <p>
                Não foi possivel salvar a coleta, verifique sua conexão e tente novamente
                  </p>
            </div>

          </div>
          <div className="modal-footer">
            <Button
              color="primary" type="button"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModalSucess()}
            >
              OK
            </Button>
          </div>
        </Modal>
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

export default LancarColeta;
