import React from "react";
import {
  Table, Container, Row, Button, Col, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import InputDefault from "../componentes/inputsPadroes";
import { BotaoEnviar, BotaoResetar } from "../componentes/botoes";
import { POST, GET, PUT, DELETE, Loading } from "../componentes/Request";
import { BarraInicial, ContainerFade, Navegacao, Cabecalho } from "../componentes/corpo"

class Modalidade extends React.Component {
  state = {
    id: "",
    nome: "",
    descricao: "",
    id__: "",
    nome__: "",
    descricao__: "",
    lista: [],
    loading: false,
    modal: false,
    inicial: true,
    form: "none"
  }
  toggle = this.toggle.bind(this);

  //fields inserir
  preencheNome(nome) { this.setState({ nome }) }
  preencheDescricao(descricao) { this.setState({ descricao }) }
  limparFormlulario() {
    this.setState({
      nome: "",
      descricao: ""
    })
  }
  //fields alterar
  preencheId__(id__) { this.setState({ id__ }) }
  preencheNome__(nome__) { this.setState({ nome__ }) }
  preencheDescricao__(descricao__) { this.setState({ descricao__ }) }
  limparFormlulario__() {
    this.setState({
      nome__: "",
      descricao__: ""
    })
  }

  componentDidMount() { this.buscar(); }
  // inserir
  inserir = async o => {
    this.setState({ loading: true })
    await POST("modalidade/inserir", o)
      .finally(response => {
        this.buscar();
      })
  }
  enviaFormulario(event) {
    if (!this.state.descricao.isEmpty() && !this.state.nome.isEmpty()) {
      let o = {};
      o.descricao = this.state.descricao;
      o.nome = this.state.nome;
      this.inserir(o);
    } else alert("Insira os dados para enviar")
  }
  // atualizar
  buscar = () => {
    // segundo atualiza <----------------------------
    GET("modalidade/listar")
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
    this.setState({ loading: true })
    await DELETE("modalidade/remover/" + id)
      .finally(response => {
        this.buscar();
      })

  }
  //alterar
  enviaFormulario__(event) {
    if (!this.state.descricao__.isEmpty() && !this.state.nome__.isEmpty()) {
      let o = {};
      o.descricao = this.state.descricao__;
      o.nome = this.state.nome__;
      o.id = this.state.id__;
      this.alterar(o);
    } else alert("Insira os dados para enviar")
  }
  alterar = async o => {
    this.setState({ loading: true })
    await PUT("modalidade/alterar", o)
      .finally(() => {
        this.setState({ modal: false })
        this.buscar();
      })
  }
  buscarPorId = async (id) => {
    this.limparFormlulario__();
    // segundo atualiza <----------------------------
    this.setState({ loading: true })
    await GET("modalidade/buscar/" + id)
      .then(response => {
        this.preencheId__(response.id)
        this.preencheNome__(response.nome)
        this.preencheDescricao__(response.descricao)
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
      this.setState(prevState => ({
        form: "block"
      }));
    }
    if (this.state.form === "block") {
      this.setState(prevState => ({
        form: "none"
      }));
    }
  }

  render() {
    const { loading, inicial, nome__, descricao__, nome, descricao } = this.state

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
                <h1>Modalidade</h1>
              </div>
            </Row>
            <div className="cadastro">
              <Container>
                <Button outline onClick={this.toggleForm.bind(this)}>Formulário</Button>
                <Col style={{ display: this.state.form }}>
                  <form>
                    <Row>
                      <Col xs={{ size: 6, offset: 3 }}>
                        <Col>
                          <InputDefault evento={this.preencheNome.bind(this)} valor={nome} size="70" tipo="text" nome="nome" titulo="Nome" descricao="Digite um nome" />
                        </Col>
                        <Col>
                          <InputDefault evento={this.preencheDescricao.bind(this)} valor={descricao} size="255" tipo="textarea" nome="descricao" titulo="Observação" descricao="Descreva..." />
                        </Col>
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
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th className="acao" colspan='2' width="5%">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.lista.map(o => {
                    return (
                      <tr key={o.id}>
                        <td>{o.id}</td>
                        <td>{o.nome}</td>
                        <td>{o.descricao}</td>
                        <td className="acao" ><Button onClick={() => this.buscarPorId(o.id)}>Alterar</Button></td>
                        <td className="acao" ><Button onClick={() => { if (window.confirm("Deseja remover esse item? \n#" + o.id)) this.removerLinha(o.id) }}>Deletar</Button></td>
                      </tr>
                    );
                  })}
                  <BarraInicial exec={inicial} message='Não possui itens para carregar.' colspan="5" />
                </tbody>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                  <ModalHeader toggle={this.toggle}>Alterar</ModalHeader>
                  <form>
                    <ModalBody>
                      <Row>
                        <Col>
                          <Col>
                            <InputDefault evento={this.preencheNome__.bind(this)} valor={nome__} size="70" tipo="text" nome="descricao" titulo="Nome" descricao="Digite um nome" />
                          </Col>
                          <Col>
                            <InputDefault evento={this.preencheDescricao__.bind(this)} valor={descricao__} size="255" tipo="textarea" nome="descricao" titulo="Observação" descricao="Descreva..." />
                          </Col>
                        </Col>
                      </Row>
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

export default Modalidade

