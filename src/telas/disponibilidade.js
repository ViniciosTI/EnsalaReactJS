import React from "react";
import {
    Input, Table, Container, Row, Button, Col, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import InputDefault from "../componentes/inputsPadroes";
import { ObjIsEquivalent } from "../componentes/utilidadePublica";
import { BotaoEnviar, BotaoResetar } from "../componentes/botoes";
import { POST, GET, PUT, DELETE, Loading } from "../componentes/Request";
import { BarraInicial, ContainerFade, Navegacao, Cabecalho } from "../componentes/corpo"

class Disponibilidade extends React.Component {
    state = {
        lista: [],
        html: [],
        loading: false,
        id: 0,
        cpf: "",
        nome: "",
        data: "",
        email: "",
        item: {
            segM: false, segT: false, segN: false,
            terM: false, terT: false, terN: false,
            quaM: false, quaT: false, quaN: false,
            quiM: false, quiT: false, quiN: false,
            sexM: false, sexT: false, sexN: false,
            sabM: false, sabT: false, sabN: false,
            domM: false, domT: false, domN: false
        }

    }
    attItem = this.attItem.bind(this)

    componentDidMount() { this.buscar(); this.limpaItem() }

    limpaDescricao(){
        this.setState({
            id: 0,
            cpf: "",
            nome: "",
            data: "",
            email: ""
        })
    }

    buscaItem(id) { 
        this.limpaDescricao()
        this.setState({
            id: id
        })
        GET("disponibilidade/buscarItem/" + id)
            .then(response => {
                console.log(response)
                if (response.disponibilidade != undefined) {
                    this.setState({
                        id: response.id,
                        nome: response.nome,
                        cpf: response.cpf,
                        email: response.email,
                        data: response.data
                    })
                    let it = Object.keys(response.disponibilidade)
                    for (let i in it) {
                        this.compoemTabela(it[i], response.disponibilidade[it[i]])
                    }
                } else this.limpaItem()
            }).catch(() => {
                this.setState({
                    id: 0
                })
            })

    }
    compoemTabela(b, v) {
        let aProps = Object.getOwnPropertyNames(this.state.item);
        let bProps = b;
        for (let i = 0; i < aProps.length; i++) {
            if (aProps[i] === b) {
                // console.log((aProps[i] === b) + " ---> " + aProps[i] + " ---> " + b + " ---> " + v)
                this.state.item[b] = v
            }
        }
        this.setState(html => ({
            html: html.html.splice(0, 1),

        }))
        this.state.html.push(this.state.item)
    }
    limpaItem() {
        this.setState({
            item: {
                segM: false, segT: false, segN: false,
                terM: false, terT: false, terN: false,
                quaM: false, quaT: false, quaN: false,
                quiM: false, quiT: false, quiN: false,
                sexM: false, sexT: false, sexN: false,
                sabM: false, sabT: false, sabN: false,
                domM: false, domT: false, domN: false
            }
        })
        // this.state.html.push(this.state.item)
    }

    attItem(v, e) {
        this.state.item[e] = !v
        this.setState(html => ({
            html: html.html.splice(0, 1),

        }))
        this.state.html.push(this.state.item)
        this.enviaItem()
    }

    enviaItem() {
        let o = {}
        o.id = this.state.id
        o.disponibilidade = this.state.item
        POST("disponibilidade/inserirCheck", o, false).then(response => {
            console.log(response)
        })
    }

    buscar = () => {
        // segundo atualiza <----------------------------
        GET("gerenciarEmailsProfessores/listarProfessores")
            .then(response => {
                if (response === undefined | response.length === 0) throw new Error('Erro lista vazia.')
                this.setState({
                    lista: response,
                    inicial: false
                })
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    lista: [],
                    inicial: true
                })
            }).finally(() => {
                this.setState({ loading: false })
            })
    }
    render() {
        const { loading, id, cpf, nome, email, data } = this.state
        const { segM, segT, segN,
            terM, terT, terN,
            quaM, quaT, quaN,
            quiM, quiT, quiN,
            sexM, sexT, sexN,
            sabM, sabT, sabN,
            domM, domT, domN } = this.state.item

        return <div>
            <Loading loading={loading} message='Carregando ...' />
            <div>
                <Cabecalho />
            </div>
            <div className="corpo" id="corpo">
                <Row>
                    <Navegacao />
                    <ContainerFade>
                        <Row>
                            <div className="titulo">
                                <h1>Disponibilidade</h1>
                            </div>
                        </Row>
                        <Table>
                            <thead>
                                <td className="acao" width="5%">id: {id === 0 ? "#" : id}</td>
                                <td>Cpf:{cpf === "" ? "#" : cpf}</td>
                                <td colspan="2">Nome:{nome === "" ? "#" : nome}</td>
                                <tr style={{ backgroundColor: "transparent", color: "black" }}>
                                    <td colspan="2">Ultima Alteração:{data === "" ? "#" : data}</td>
                                    <td colspan="2">E-mail:{email === "" ? "#" : email}</td>
                                </tr>
                                <tr>
                                    <th className="acao" width="5%">#</th>
                                    <th style={{ textAlign: "center" }} width="31.66666%">Manhã</th>
                                    <th style={{ textAlign: "center" }} width="31.66666%">Tarde</th>
                                    <th style={{ textAlign: "center" }} width="31.66666%">Noite</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Segunda</th>
                                    <td className="acao" >
                                        <Input checked={segM} type="checkbox" name="segM" className="checkmark" onClick={() => this.attItem(segM, "segM")} />
                                    </td>
                                    <td className="acao" >
                                        <Input checked={segT} type="checkbox" name="segT" className="checkmark" onClick={() => this.attItem(segT, "segT")} />
                                    </td>
                                    <td className="acao" >
                                        <Input checked={segN} type="checkbox" name="segN" className="checkmark" onClick={() => this.attItem(segN, "segN")} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Terça</th>
                                    <td className="acao" >
                                        <Input checked={terM} type="checkbox" name="terM" className="checkmark" onClick={() => this.attItem(terM, "terM")} />
                                    </td>
                                    <td className="acao" >
                                        <Input checked={terT} type="checkbox" name="terT" className="checkmark" onClick={() => this.attItem(terT, "terT")} />
                                    </td>
                                    <td className="acao" >
                                        <Input checked={terN} type="checkbox" name="terN" className="checkmark" onClick={() => this.attItem(terN, "terN")} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Quarta</th>
                                    <td className="acao" >
                                        <Input checked={quaM} type="checkbox" name="quaM" className="checkmark" onClick={() => this.attItem(quaM, "quaM")} />
                                    </td>
                                    <td className="acao" >
                                        <Input checked={quaT} type="checkbox" name="quaT" className="checkmark" onClick={() => this.attItem(quaT, "quaT")} />
                                    </td>
                                    <td className="acao" >
                                        <Input checked={quaN} type="checkbox" name="quaN" className="checkmark" onClick={() => this.attItem(quaN, "quaN")} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Quinta</th>
                                    <td className="acao" >
                                        <Input checked={quiM} type="checkbox" name="quiM" className="checkmark" onClick={() => this.attItem(quiM, "quiM")} />
                                    </td>
                                    <td className="acao" >
                                        <Input checked={quiT} type="checkbox" name="quiT" className="checkmark" onClick={() => this.attItem(quiT, "quiT")} />
                                    </td>
                                    <td className="acao" >
                                        <Input checked={quiN} type="checkbox" name="quiN" className="checkmark" onClick={() => this.attItem(quiN, "quiN")} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Sexta</th>
                                    <td className="acao" >
                                        <Input checked={sexM} type="checkbox" name="sexM" className="checkmark" onClick={() => this.attItem(sexM, "sexM")} />
                                    </td>
                                    <td className="acao" >
                                        <Input checked={sexT} type="checkbox" name="sexT" className="checkmark" onClick={() => this.attItem(sexT, "sexT")} />
                                    </td>
                                    <td className="acao" >
                                        <Input checked={sexN} type="checkbox" name="sexN" className="checkmark" onClick={() => this.attItem(sexN, "sexN")} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Sabado</th>
                                    <td className="acao" >
                                        <Input checked={sabM} type="checkbox" name="sabM" className="checkmark" onClick={() => this.attItem(sabM, "sabM")} />
                                    </td>
                                    <td className="acao" >
                                        <Input checked={sabT} type="checkbox" name="sabT" className="checkmark" onClick={() => this.attItem(sabT, "sabT")} />
                                    </td>
                                    <td className="acao" >
                                        <Input checked={sabN} type="checkbox" name="sabN" className="checkmark" onClick={() => this.attItem(sabN, "sabN")} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Domingo</th>
                                    <td className="acao" >
                                        <Input checked={domM} type="checkbox" name="domM" className="checkmark" onClick={() => this.attItem(domM, "domM")} />
                                    </td>
                                    <td className="acao" >
                                        <Input checked={domT} type="checkbox" name="domT" className="checkmark" onClick={() => this.attItem(domT, "domT")} />
                                    </td>
                                    <td className="acao" >
                                        <Input checked={domN} type="checkbox" name="domN" className="checkmark" onClick={() => this.attItem(domN, "domN")} />
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <div>
                            <a href="#corpo">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>CPF</th>
                                            <th>Professor</th>
                                            <th>E-mail</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.lista.map(o => {
                                            let focus = {}
                                            if (o.id === this.state.id) focus = { backgroundColor: '#009785', color: "white" }
                                            return (
                                                <tr style={focus} key={o.id} onClick={() => this.buscaItem(o.id)}>
                                                    <td>{o.id}</td>
                                                    <td>{o.cpf}</td>
                                                    <td>{o.nome}</td>
                                                    <td>{o.email}</td>
                                                </tr>
                                            );
                                        })}
                                        <BarraInicial exec={this.state.inicial} message='Não possui itens para carregar.' colspan="5" />
                                    </tbody>
                                </Table>
                            </a>
                        </div>
                    </ContainerFade>
                </Row>
            </div>
        </div>
    };
}

export default Disponibilidade

