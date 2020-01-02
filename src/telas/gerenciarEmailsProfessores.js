import React from "react";
import {
  Table, Container, Row, Button, Col, Input
} from "reactstrap";
import { GET, POST } from "../componentes/Request";
import { BarraInicial, ContainerFade, Navegacao, Cabecalho } from "../componentes/corpo"
import InputDefault from "../componentes/inputsPadroes";

class GerenciarEmailsProfessores extends React.Component {
  state = {
    check: "",
    assunto: "",
    corpoEmail: "",
    lista: [],
    loading: false,
    modal: false,
    form: "none",
    desativar: true,
    checkBox: true
  }
  //fields inserir
  preencheAssunto(assunto) { this.setState({ assunto }) }
  preencheCorpoEmail(corpoEmail) { this.setState({ corpoEmail }) }
  limparFormlulario() {
    this.setState({
      assunto: "",
      corpoEmail: ""
    })
  }

  preencheCheckbox(id, check) {
    let lista = this.state.lista
    let novaLista = []
    for (let i in lista) {
      let o = {};
      o.id = lista[i].id
      o.cpf = lista[i].cpf
      o.nome = lista[i].nome
      o.email = lista[i].email
      if (lista[i].id === id) {
        if (check === false) {
          o.check = true
        } else if (check === true) {
          o.check = false
        }
      } else o.check = lista[i].check
      novaLista.push(o)
    }
    this.setState({ lista: novaLista })
  }

  componentDidMount() {
    this.buscar();
  }

  enviarEmail = async cpf => {
    if (this.state.form === "block") {
      if (window.confirm("Deseja mesmo enviar?")) {
        let lista = this.state.lista
        let listaEnviar = []
        let o = {}

        o.assunto = this.state.assunto
        o.corpoEmail = this.state.corpoEmail

        for (let i in lista) {
          if (lista[i].check === true) {
            let o = {};
            o.id = lista[i].id
            o.cpf = lista[i].cpf
            o.nome = lista[i].nome
            o.email = lista[i].email
            listaEnviar.push(o)
          }
        }

        o.lista = listaEnviar
        if (!o.assunto.isEmpty() && !o.corpoEmail.isEmpty()) {
          if (o.lista.length > 0) {

            await POST("gerenciarEmailsProfessores/enviarEmail", o)
              .finally(response => {
                console.log(response)
              })
          } else window.alert("Precisa selecionar alguém para enviar.")
        } else window.alert("Precisa preencher assunto e conteúdo, antes de enviar.")
      }
      // this.verificarEmails();
    } else alert("Abra o Corpo do E-mail antes de enviar")
  }

  enviarTodosEmails = async () => {
    if (this.state.form === "block") {
      let o = {}
      o.assunto = this.state.assunto
      o.corpoEmail = this.state.corpoEmail
      o.lista = []
      if (window.confirm("Deseja mesmo enviar?")) {
        await POST("gerenciarEmailsProfessores/enviarTodosEmails", o)
          .finally(response => {
            console.log(response)
          })
      }
    } else alert("Abra o Corpo do E-mail antes de enviar")
  }

  // atualizar
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

  //modal
  checkToggle() {
    this.setState(prevState => ({
      checkBox: !prevState.checkBox
    }));
    let listaAux = []
    for (let item in this.state.lista) {
      let o = this.state.lista[item]
      if (this.state.checkBox)
        o.check = true
      if (!this.state.checkBox)
        o.check = false

      listaAux.push(o)
    }
    this.setState({
      lista: listaAux
    })
  }
  toggleForm() {
    if (this.state.form === "none") {
      this.setState(prevState => ({
        form: "block",
        desativar: false
      }));
    }
    if (this.state.form === "block") {
      this.setState(prevState => ({
        form: "none",
        desativar: true
      }));
    }
  }

  render() {
    const { desativar, checkBox, assunto, corpoEmail, form } = this.state;

    return <div>
      <div>
        <Cabecalho />
      </div>
      <div className="corpo">
        <Row>
          <Navegacao />
          <ContainerFade>
            <Row>
              <div className="titulo">
                <h1>Gerenciar e-mails dos professores</h1>
              </div>
            </Row>
            <div className="cadastro">
              <Container>
                <Button outline onClick={this.toggleForm.bind(this)}>Corpo do E-mail</Button>
                <Button disabled={desativar} outline onClick={() => this.enviarEmail()} className="enviarTodos">Selecionados</Button>
                <Button disabled={desativar} outline onClick={() => this.enviarTodosEmails()} className="enviarTodos">Para todos</Button>
                <Col style={{ display: form }}>
                  <form>
                    <Row>
                      <Col xs={{ size: 12 }}>
                        <Col>
                          <InputDefault evento={this.preencheAssunto.bind(this)} valor={assunto} size="70" tipo="text" nome="assunto" titulo="Assunto" descricao="Assunto" />
                        </Col>
                        <Col>
                          <InputDefault evento={this.preencheCorpoEmail.bind(this)} valor={corpoEmail} size="3000" tipo="textarea" nome="corpoEmail" titulo="Conteúdo" descricao="Escreva o aqui..." />
                        </Col>
                      </Col>
                    </Row>
                  </form>
                </Col>
              </Container>
            </div>
            <div>
              <Table>
                <thead>
                  <tr>
                    <th className="checkAll" width="7%">
                      <Input checked={!checkBox} type="checkbox" id="check" className="checkmark" name="check" onClick={() => this.checkToggle()} />
                    </th>
                    <th width="10%">#</th>
                    <th width="35%">Professor</th>
                    <th width="35%">E-mail</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.lista.map(o => {
                    if (o.check === undefined) o.check = false;
                    return (
                      <tr key={o.id}>
                        <td className="acao" >
                          <Input checked={o.check} type="checkbox" id="check" className="checkmark" name="check" onChange={() => this.preencheCheckbox(o.id, o.check)} />
                        </td>
                        <td>{o.cpf}</td>
                        <td>{o.nome}</td>
                        <td>{o.email}</td>
                      </tr>
                    );
                  })}
                  <BarraInicial exec={this.state.inicial} message='Não possui itens para carregar.' colspan="5" />
                </tbody>
              </Table>
            </div>
          </ContainerFade>
        </Row>
      </div >
    </div >
  };
}
export default GerenciarEmailsProfessores

