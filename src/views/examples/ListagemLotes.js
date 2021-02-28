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
import React, { useState, useEffect } from "react";

import { format } from 'date-fns';

import { ptBR } from 'date-fns/locale'

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,
  Table,
  Container,
  Row,
  Button,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { db } from "../../utils/firebase";
import { useAuth } from "../../hooks/auth";
var QRCode = require('qrcode.react');

const ListagemLotes = () => {
  const { uid } = useAuth();
  const [listQualidade, setListQualidade] = useState([]);

  const [exampleModal, setExampleModal] = useState({isOpen:false});
  const toggleModal = () => {
    setExampleModal({...exampleModal, isOpen:!exampleModal.isOpen});
  };

  useEffect(()=>{
    db.collection("lote").get()
    .then(query=>{
          setListQualidade(query.docs.filter(value=>value.exists).map(value=>({docId: value.id,...value.data()})));
    });
  }, [uid]);

  return (
    <>
     <Header cardsData={listQualidade.slice(-2)} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Lotes</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Data</th>
                    <th scope="col">Observação</th>
                    <th scope="col">QRCode</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {listQualidade.map((value) => {
                    const showQRCode = (e) => {
                      setExampleModal({
                        isOpen: true,
                        title: "QRCode",
                        content:(
                          <>
                          <QRCode value={"http://localhost:3000/lote/"+value.docId} />
                          </>
                        )
                      })
                    };
                    // const HandleOnClickDropdown = (e) => {
                    //   console.log(value);
                    //   e.preventDefault();
                    //   setExampleModal({
                    //     isOpen: true,
                    //     title: `Teste realizado em ${format(value.data.toDate(),"cccc - P", {locale: ptBR})}`,
                    //     content:(
                    //       <>
                    //         <p>Empresa que realizou o teste: <b>{value.nome_empresa}</b></p>
                    //         <p>Disponibilizou os seguintes resultados:</p>
                    //         <p>CPP: <b>{value.ccb}</b></p>
                    //         <p>CCS: <b>{value.ccs}</b></p>
                    //         <p>ureia: <b>{value.ureia}</b></p>
                    //         <p>Com as seguintes observacoes:</p>
                    //         <p><b>{value.observacao || "Nenhuma observação foi feita"}</b></p>
                    //       </>
                    //     )
                    //   })
                    // }
                    return (
                      <tr key={value.docId}>
                        <th>{format(new Date(value.data),"cccc - P", {locale: ptBR})}</th>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            {value.observacao || "Nenhuma observação foi feita"}
                          </Badge>
                        </td>
                        <td>
                          {
                          <Button
                        className="float-right btn"
                        onClick={(e) => { showQRCode() }}
                      >
                        Ver QRCode
                  </Button>
                          }
                        </td>
                        {/* <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={HandleOnClickDropdown}
                              >
                                Ver mais detalhes do resultado
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Anterior</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Próximo</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
      {<Modal
          className="modal-dialog-centered"
          isOpen={exampleModal.isOpen}
          toggle={() => toggleModal()}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {exampleModal.title}
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => toggleModal()}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">{exampleModal.content}</div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => toggleModal()}
            >
              Fechar
            </Button>
          </div>
        </Modal>}
    </>
  );
};

export default ListagemLotes;
