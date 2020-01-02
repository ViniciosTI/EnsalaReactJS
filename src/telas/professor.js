import React from "react";
import {
  Table, Container, Row, Button, Col, Modal, ModalHeader, ModalBody, ModalFooter,
} from "reactstrap";
import InputDefault from "../componentes/inputsPadroes";
import { BotaoEnviar, BotaoResetar } from "../componentes/botoes";
import { POST, GET, PUT, DELETE, Loading } from "../componentes/Request";
import { BarraInicial, ContainerFade, Navegacao, Cabecalho } from "../componentes/corpo"

class Professor extends React.Component {
  state = {
    cpf: "",
    nome: "",
    email: "",
    telefone: "",
    permissao: "",
    senha: "",
    confirmar: "",

    id__: "",
    cpf__: "",
    nome__: "",
    email__: "",
    telefone__: "",
    permissao__: "",
    senha__: "",
    confirmar__: "",

    lista: [],
    loading: false,
    modal: false,
    inicial: true,
    form: "none",
    mudaSenha: "none"
  }
  toggle = this.toggle.bind(this)

  //fields inserir
  preencheCpf(cpf) { this.setState({ cpf: cpf.maskCpf() }) }
  preencheNome(nome) { this.setState({ nome }) }
  preencheEmail(email) { this.setState({ email: email.toLowerCase().replaceAll(" ", "") }) }
  preencheTelefone(telefone) { this.setState({ telefone: telefone.maskTelefone() }) }
  preenchePermissao(permissao) { this.setState({ permissao }) }
  preencheSenha(senha) { this.setState({ senha }) }
  preencheConfirmar(confirmar) { this.setState({ confirmar }) }
  limparFormlulario() {
    this.setState({
      cpf: "",
      nome: "",
      email: "",
      telefone: "",
      permissao: "",
      senha: "",
      confirmar: ""
    })
  }
  //fields alterar
  preencheId__(id__) { this.setState({ id__: id__.toString() }) }
  preencheCpf__(cpf__) { this.setState({ cpf__: cpf__.toString().maskCpf() }) }
  preencheNome__(nome__) { this.setState({ nome__ }) }
  preencheEmail__(email__) { this.setState({ email__: email__.toLowerCase().replaceAll(" ", "") }) }
  preencheTelefone__(telefone__) { this.setState({ telefone__: telefone__.maskTelefone() }) }
  preenchePermissao__(permissao__) { this.setState({ permissao__ }) }
  preencheSenha__(senha__) { this.setState({ senha__ }) }
  preencheConfirmar__(confirmar__) { this.setState({ confirmar__ }) }
  limparFormlulario__() {
    this.setState({
      cpf__: "",
      nome__: "",
      email__: "",
      telefone__: "",
      permissao__: "",
      senha__: "",
      confirmar__: ""
    })
  }

  componentDidMount() { this.buscar() }
  // inserir
  inserir = async o => {
    this.setState({ loading: true });
    await POST("professor/inserir", o)
      .finally(response => {
        this.buscar();
      })
  }
  enviaFormulario(event) {
    let st = this.state
    console.log(st.cpf.length + " ---> " + st.cpf)
    console.log(st.telefone.length + " ---> " + st.telefone)
    if (
      !st.cpf.isEmpty() && st.cpf.length === 14 && //15
      !st.nome.isEmpty() &&
      !st.email.isEmpty() &&
      !st.telefone.isEmpty() && st.telefone.length >= 14 && // 15,16
      (!st.permissao.isEmpty() || !st.permissao.equals("SELECIONE")) &&
      !st.senha.isEmpty() &&
      !st.confirmar.isEmpty()
    ) {
      if (st.email.isEmail()) {
        if (st.senha.length > 4) {
          if (st.senha.equals(st.confirmar)) {
            let o = {};
            o.cpf = st.cpf.replace(/[^0-9]/g, "");
            o.nome = st.nome;
            o.email = st.email;
            o.telefone = st.telefone;
            o.permissao = st.permissao;
            o.senha = st.senha;
            this.inserir(o);
          } else alert("Confirmar senha, precisa ser exatamente igual a senha.")
        } else alert("A senha precisa ter pelo menos 5 letras, e no máximo 10 letras.")
      } else alert("Digite um e-mail válido.")
    } else alert("Insira os dados para enviar")

  }
  // atualizar
  buscar = () => {
    // segundo atualiza <----------------------------
    GET("professor/listar")
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
  // remover
  removerLinha = async (id) => {
    this.setState({ loading: true });
    await DELETE("professor/remover/" + id)
      .finally(response => {
        this.buscar();
      })
  }
  //alterar

  enviaFormulario__(event) {
    let st = this.state
    console.log(st.cpf__)
    if (
      !st.cpf__.isEmpty() && st.cpf__.length === 14 && //15
      !st.nome__.isEmpty() &&
      !st.email__.isEmpty() &&
      !st.telefone__.isEmpty() && st.telefone__.length >= 14 && // 15,16
      (!st.permissao__.isEmpty() || !st.permissao__.equals("SELECIONE"))
    ) {
      if (st.email__.isEmail()) {
        let f = true;
        let o = {};
        o.id = st.id__;
        o.cpf = st.cpf__;
        o.nome = st.nome__;
        o.email = st.email__;
        o.telefone = st.telefone__;
        o.permissao = st.permissao__;
        if (!st.senha__.isEmpty()) {
          if (st.senha__.length > 4) {
            if (st.senha__.equals(st.confirmar__)) {
              o.senha = st.senha__;
            } else { f = false; alert("Confirmar senha, precisa ser exatamente igual a senha.") }
          } else { f = false; alert("A senha precisa ter pelo menos 5 letras, e no máximo 10 letras.") }
        } else o.senha = ""
        console.log(o)
        if (f) this.alterar(o);
      } else alert("Digite um e-mail válido.")
    } else alert("Insira os dados para enviar")

  }
  alterar = async o => {
    this.setState({ loading: true });
    await PUT("professor/alterar", o)
      .finally(() => {
        this.setState({ modal: false })
        this.buscar();
      })
  }
  buscarPorId = async (id) => {
    // segundo atualiza <----------------------------
    console.log(id)
    this.limparFormlulario__();
    this.setState({ loading: true })
    await GET("professor/buscar/" + id)
      .then(response => {

        this.preencheId__(response.id)
        this.preencheCpf__(response.cpf)
        this.preencheNome__(response.nome)
        this.preencheEmail__(response.email)
        this.preencheTelefone__(response.telefone)
        this.preenchePermissao__(response.permissao)

        this.setState({
          modal: true
        })
      }).finally(() => {
        this.setState({ loading: false })
      })
  }
  //modal
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  toggleForm() {
    if (this.state.form === "none") {
      this.setState(() => ({
        form: "block"
      }));
    }
    if (this.state.form === "block") {
      this.setState(() => ({
        form: "none"
      }));
    }
  }
  toggleMudaSenha() {
    if (this.state.mudaSenha === "none") {
      this.setState(() => ({
        mudaSenha: "flex"
      }));
    }
    if (this.state.mudaSenha === "flex") {
      this.setState(() => ({
        mudaSenha: "none"
      }));
    }
  }
  render() {
    const { loading, inicial, cpf, nome, email, telefone, permissao, senha, confirmar,
      cpf__, nome__, email__, telefone__, permissao__, senha__, confirmar__ } = this.state;

    return <div>
      <Loading loading={loading} message='Carregando ...' />
      <div>
        <Cabecalho />
      </div>
      <div className="corpo">
        <Row>
          <Navegacao />
          <ContainerFade>
            <Row>
              <div className="titulo">
                <h1>Professor</h1>
              </div>
            </Row>
            <div className="cadastro">
              <Container>
                <Button outline onClick={this.toggleForm.bind(this)}>Formulário</Button>
                <Col style={{ display: this.state.form }}>
                  <form>
                    <Row>
                      <Col xs={{ size: 8, offset: 2 }}>
                        <Row>
                          <Col md={{ size: 6 }}>
                            <InputDefault evento={this.preencheNome.bind(this)} valor={nome} size="70" tipo="text" nome="nome" titulo="Nome" descricao="Digite um nome" />
                          </Col>
                          <Col md={{ size: 6 }}>
                            <InputDefault evento={this.preencheCpf.bind(this)} valor={cpf} tipo="text" nome="cpf" titulo="Cpf" descricao="Digite um cpf" />
                          </Col>
                        </Row>
                        <Col>
                          <InputDefault evento={this.preencheEmail.bind(this)} valor={email} size="255" tipo="text" nome="email" titulo="Email" descricao="Digite um email" />
                        </Col>
                        <Row>
                          <Col md={{ size: 6 }}>
                            <InputDefault evento={this.preenchePermissao.bind(this)} valor={permissao} tipo="select" name="permissao" titulo="Permissao">
                              <option value="SELECIONE">Selecione...</option>
                              <option>ADMINISTRADOR</option>
                              <option>PROFESSOR</option>
                            </InputDefault>
                          </Col>
                          <Col md={{ size: 6 }}>
                            <InputDefault evento={this.preencheTelefone.bind(this)} valor={telefone} tipo="text" nome="telefone" titulo="Telefone" descricao="Digite um telefone" />
                          </Col>
                        </Row>
                        <Row>
                          <Col md={{ size: 6 }}>
                            <InputDefault evento={this.preencheSenha.bind(this)} size="10" valor={senha} tipo="password" nome="senha" titulo="Senha" descricao="Digite uma senha" />
                          </Col>
                          <Col md={{ size: 6 }}>
                            <InputDefault evento={this.preencheConfirmar.bind(this)} size="10" valor={confirmar} tipo="password" nome="confirmar" titulo="Confirmar" descricao="Confirme a senha" />
                          </Col>
                        </Row>
                        <Col>
                          <div className="botao" align="right">
                            <BotaoResetar resetar={this.limparFormlulario.bind(this)} />
                            <BotaoEnviar enviar={this.enviaFormulario.bind(this)} />
                          </div>
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
                    <th>#</th>
                    <th>CPF</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Permissao</th>
                    <th className="acao" colspan='2' width="5%">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.lista.map(o => (
                    <tr key={o.id}>
                      <td>{o.id}</td>
                      <td>{o.cpf.toString().maskCpf()}</td>
                      <td>{o.nome}</td>
                      <td>{o.email}</td>
                      <td>{o.telefone.toString().maskTelefone()}</td>
                      <td>{o.permissao}</td>
                      <td className="acao" ><Button onClick={() => this.buscarPorId(o.id)}>Alterar</Button></td>
                      <td className="acao" ><Button onClick={() => { if (window.confirm("Deseja remover esse item? \n#" + o.id)) this.removerLinha(o.id) }}>Deletar</Button></td>
                    </tr>
                  )
                  )}
                  <BarraInicial exec={inicial} message='Não possui itens para carregar.' colspan="5" />
                </tbody>
                <Loading loading={loading} message='Carregando ...' />
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                  <ModalHeader toggle={this.toggle}>Alterar</ModalHeader>
                  <form>
                    <ModalBody>
                      <form>
                        <Row>
                          <Col xs={{ size: 12 }}>
                            <Row>
                              <Col md={{ size: 6 }}>
                                <InputDefault evento={this.preencheNome__.bind(this)} valor={nome__} size="70" tipo="text" nome="nome" titulo="Nome" descricao="Digite um nome" />
                              </Col>
                              <Col md={{ size: 6 }}>
                                <InputDefault evento={this.preencheCpf__.bind(this)} valor={cpf__} tipo="text" nome="cpf" titulo="Cpf" descricao="Digite um cpf" />
                              </Col>
                            </Row>
                            <Col>
                              <InputDefault evento={this.preencheEmail__.bind(this)} valor={email__} size="255" tipo="text" nome="email" titulo="Email" descricao="Digite um email" />
                            </Col>
                            <Row>
                              <Col md={{ size: 6 }}>
                                <InputDefault evento={this.preenchePermissao__.bind(this)} valor={permissao__} tipo="select" name="permissao" titulo="Permissao">
                                  <option value="SELECIONE">Selecione...</option>
                                  <option>ADMINISTRADOR</option>
                                  <option>PROFESSOR</option>
                                </InputDefault>
                              </Col>
                              <Col md={{ size: 6 }}>
                                <InputDefault evento={this.preencheTelefone__.bind(this)} valor={telefone__} tipo="text" nome="telefone" titulo="Telefone" descricao="Digite um telefone" />
                              </Col>
                            </Row>
                            <Col>
                              <Button outline onClick={this.toggleMudaSenha.bind(this)}>Mudar senha</Button>
                            </Col>
                            <div><br /></div>
                            <Row style={{ display: this.state.mudaSenha }}>
                              <Col md={{ size: 6 }}>
                                <InputDefault evento={this.preencheSenha__.bind(this)} valor={senha__} size="10" tipo="password" nome="senha" titulo="Senha" descricao="Digite uma senha" />
                              </Col>
                              <Col md={{ size: 6 }}>
                                <InputDefault evento={this.preencheConfirmar__.bind(this)} valor={confirmar__} size="10" tipo="password" nome="confirmar" titulo="Confirmar" descricao="Confirme a senha" />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </form>
                    </ModalBody>
                    <ModalFooter>
                      <BotaoResetar resetar={this.limparFormlulario__.bind(this)} />
                      <BotaoEnviar enviar={this.enviaFormulario__.bind(this)} />
                    </ModalFooter>
                  </form>
                </Modal>
              </Table>
            </div>
          </ContainerFade>
        </Row>
      </div>
    </div>
  };
}

export default Professor

