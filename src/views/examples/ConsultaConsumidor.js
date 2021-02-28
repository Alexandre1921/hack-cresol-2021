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
import React, {useState, useEffect, useCallback} from "react";
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
import Header from "components/Headers/HeaderConsultaConsumidor.js";

const ConsultaConsumidor = ({match}) => {

  const columns =  [
    { field: 'nome', headerName: 'Produtor', width: 300 },
  ];

  const [state,setState] = useState({});

  const get_data = useCallback(() => {
    get_carga(match.params.lote).then(val => {
      let colet = []
      let prod = []
      val.forEach((carga) => {
        get_coleta(carga).then((col_val) => {
          col_val.forEach((t) => {
            colet.push(t)
          })
          return Promise.all(col_val.map((col) => {
            return get_produtor(col).then((prod_val) => {
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
          }))
        }).then(()=>{
          setState({
            cargas: val,
            coletas: colet,
            produtores: prod,
          })
        })
      })
    })
  },[match.params.lote])

  useEffect(()=>{
    get_data();
  },[get_data]);

    return (
      <>
        <Header  />
        <Container className="mt--7" fluid>
          <Row>
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
                    rows={state.produtores || []}
                    columns={columns}
                  />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          
        </Container>

        <Modal
          className="modal-dialog-centered"
          isOpen={state.loadingModal}
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
};

export default ConsultaConsumidor;
