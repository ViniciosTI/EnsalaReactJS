import React from "react";
import { Row, Col, Fade } from "reactstrap";
import { Navegacao, Cabecalho} from "../componentes/corpo"

class Home extends React.Component {

  render() {
    return <div>
      <div>
        <Cabecalho />
      </div>
      <div className="corpo">
        <Row>
          <Navegacao />
          <Fade>
            <div className="containerCorpo">
              <Col>
                <div className="titulo">
                  <h1>Bem vindo!</h1>
                </div>
              </Col>
            </div>
          </Fade>
        </Row>
      </div>
    </div>
  };
}

export default Home;
