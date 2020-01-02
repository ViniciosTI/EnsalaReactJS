import React from 'react';
import logoSENAI from '../img/senai.png';
import logoSESI from '../img/sesi.png';

import { Row, Col, Container, Button, InputGroup, Input } from 'reactstrap';

const base = "http://localhost:";
const door = "8080";
const context = "/Ensalamento/Login";
const headers = { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" };

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      senha: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  logar = async o => {
    await fetch(base + door + context, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(o)
    })
      .then(response => {

        if (response.status !== 200) {
          console.log('Status Code inserir: ' + response.status)
          return
        } else {
          window.location.href = base + "3000/Home";
        }
      })
  }
  handleChange(event) {
    this.setState({ usuario: event.target.usuario });
    this.setState({ senha: event.target.senha });
  }

  handleSubmit(event) {
    // var o = {};
    // this.logar(o);
    console.log("Voce foi logado! " + this.state.usuario);
    event.preventDefault();
    this.setState({ usuario: event.target.usuario });
  }

  render() {

    return <div className="body">
      <Container>
        <Row>
          <Col sm={{ size: 4, order: 1, offset: 4 }}>
            <form className="linhacontainer formulario" onSubmit={this.handleSubmit}>
              <div align="center">
                <h1 className="txtLogo">Login</h1>
              </div>
              <Row>
                <Col>
                  <img src={logoSESI} className="App-logo" alt="logo" />
                </Col>
                <Col>
                  <img src={logoSENAI} className="App-logo" alt="logo" />
                </Col>
              </Row>
              <InputGroup>
                <Input placeholder="Usuario:" value={this.state.usuario} onChange={this.handleChange} />
              </InputGroup>
              <InputGroup>
                <Input type="password" className="empurrar" placeholder="Senha:" value={this.state.senha} onChange={this.handleChange} />
              </InputGroup>
              <div className="botaoLogin">
                <Button block onClick={this.handleSubmit} className="btn-login">Entrar</Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  }
}