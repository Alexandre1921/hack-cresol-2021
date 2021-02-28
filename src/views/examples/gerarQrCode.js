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
import ReactLoading from 'react-loading';
import { get_cargas, gerar_lote } from '../../controllers/GerarQrCode.js'
import { DataGrid } from '@material-ui/data-grid';
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

var QRCode = require('qrcode.react');


class GerarQrCode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            observacao: "",
            dataInicio: "",
            dataFim: "",
            cargas: [],
            loadingModal: false,
            sucessModal: false,
            selected: [],
            link: null,

        };
        this.dataInicioChange = this.dataInicioChange.bind(this);
        this.dataFimChange = this.dataFimChange.bind(this);
        this.observacaoChange = this.observacaoChange.bind(this);
        this.selectedChange = this.selectedChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModalLoading = this.toggleModalLoading.bind(this);
        this.toggleModalSucess = this.toggleModalSucess.bind(this);
        this.toggleModalError = this.toggleModalError.bind(this);
        this.columns = [
            { field: 'linha', headerName: 'Linha', width: 300 },
            { field: 'data', headerName: 'Data', width: 130 },
        ]
    }

    componentDidMount() {
        get_cargas().then((val) => {
            console.log(val)
            this.setState({
                cargas: val
            })
        })
    }

    dataInicioChange(event) {
        this.setState({ dataInicio: event._d });
    }

    dataFimChange(event) {
        this.setState({ dataFim: event._d });
    }

    selectedChange(value) {
        this.setState({ selected: value.selectionModel });
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
        console.log(this.state)
        gerar_lote(this.state).then((link) => {
            this.toggleModalLoading()
            this.toggleModalSucess()
            this.setState({ link: link })
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
                                            <h3 className="mb-0">Dados do lote</h3>
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
                                                            Data - início
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
                                                                onChange={e => this.dataInicioChange(e)}
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
                                                            Data -fim
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
                                                                onChange={e => this.dataFimChange(e)}
                                                            />
                                                        </InputGroup>
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
                                        <div style={{ height: 400, width: '100%' }}>
                                            <DataGrid
                                                // onRowSelected={(gf)=>{console.log(gf)}}
                                                rows={this.state.cargas}
                                                onSelectionModelChange={(newSelection) => {
                                                    this.selectedChange(newSelection);
                                                }}
                                                columns={this.columns} checkboxSelection

                                            />
                                        </div>
                                        <div className="d-flex justify-content-center">
                                        <FormGroup>
                                            <Button
                                                className="float-right btn"
                                                onClick={(e) => { this.handleSubmit(e) }}
                                            >
                                                Gerar lote
                                        </Button>
                                        </FormGroup>
                                        </div>
                                    </Form>
                                    {this.state.link != null &&
                                        <div className="d-flex justify-content-center">
                                            <QRCode value={this.state.link} />
                                        </div>
                                    }
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
                            color="primary"
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

export default GerarQrCode;
