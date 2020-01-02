import React from 'react'
import { UncontrolledPopover, PopoverHeader, PopoverBody, ToastHeader, Spinner, Nav, Fade, Row, Col } from "reactstrap";
import logoSENAI from './../img/senai.png';
import logoSESI from './../img/sesi.png';
import { Link } from "react-router-dom";
import { GET } from "./Request";


class ContainerFade extends React.Component {
    render() {
        return (
            <div className="containerCorpo">
                <Fade>
                    {this.props.children}
                </Fade>
            </div>
        )
    }
}

class BarraInicial extends React.Component {
    render() {
        const { exec, message, colspan } = this.props
        return exec ? (
            <td colspan={colspan}>
                {message}
            </td>
        ) : null
    }
}


class Navegacao extends React.Component {

    render() {
        return <div className="barraNav">
            <Nav vertical>
                <p className="subtituloMenu">Cadastros</p>
                <Link to="../cadastro/professor">Professor</Link>
                <Link to="../cadastro/modalidade">Modalidade</Link>
                <Link to="../cadastro/areaConhecimento">Area de conhecimento</Link>
                <Link to="../cadastro/unidadeCurricular">Unidade curricular</Link>
                <p className="subtituloMenu">Processos</p>
                <Link to="../processo/gerenciaremailsprofessores">Gerenciar e-mails</Link>
                <Link to="../processo/disponibilidade">Disponibilidade</Link>
                <Link href="#">processo3</Link>
                <Link href="#">processo4</Link>
                <p className="subtituloMenu">Consultas</p>
                <Link href="#">consulta1</Link>
                <Link href="#">consulta2</Link>
                <Link href="#">consulta3</Link>
                <Link href="#">consulta4</Link>
            </Nav>
        </div>
    };
}

class Cabecalho extends React.Component {

    render() {

        return <header className="cabecalho">
            <Row>
                <Col>
                    <Row style={{ width: "382px" }}>
                        <Col>
                            <Link to="../home">
                                <img src={logoSESI} className="App-logo" alt="logo" />
                            </Link>
                        </Col>
                        <Col>
                            <Link to="../home">
                                <img src={logoSENAI} className="App-logo" alt="logo" />
                            </Link>
                        </Col>
                    </Row>
                </Col>
                <Status />
            </Row>
        </header>

    };
}
class Status extends React.Component {
    state = {
        spin: true,
        foo: true,
        inicial: true,
        pop: "none",
        texto: ""
    }
    componentDidMount() {
        this.verificaEmail()
        this.timer = setInterval(
            () => {
                this.verificaEmail()
            },
            5000
        );
    }
    verificaEmail() {
        GET("gerenciarEmailsProfessores/verificarEmails", false)
            .then(response => {
                if (response === undefined) response = "ERRO"
                this.TimerEmail(response)
            })
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }

    TimerEmail = (f) => {
        if (f !== undefined) this.setState({ inicial: false })
        if (f === "ANDAMENTO") {
            this.setState({
                spin: true,
                foo: false,
                texto: "Em andamento."
            })
        } else if (f === "ACABOU")
            this.setState({
                spin: false,
                foo: true,
                texto: "Sem atividade."
            })
        else if (f === "ERRO") {
            this.setState({
                spin: false,
                foo: false,
                texto: "Problemas com a conexão, aguarde um momento."
            })
        }
    }
    render() {
        const { foo, spin, inicial, texto } = this.state
        const ic = spin ? <Spinner size="sm" color="success" /> : null
        const f = foo ? "statusGreen" : "statusOrange"
        const t = !foo && !spin ? "statusRed" : null
        const color = "status " + (inicial ? "statusGray" : (t ? t : f))

        return (
            <ToastHeader id="PopoverLegacy" icon={ic} >
                <div className={color} /> E-mails
                <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverLegacy">
                    <PopoverHeader>Situação</PopoverHeader>
                    <PopoverBody>
                        <ul style={{ padding: "0" }} >
                            <li style={{ padding: "0", display: "inline", float: "left" }}>{color.includes("statusGray") ? "..." : texto}</li>
                        </ul>
                    </PopoverBody>
                </UncontrolledPopover>
            </ToastHeader>

        )
    }
}

export { BarraInicial, ContainerFade, Navegacao, Cabecalho }
