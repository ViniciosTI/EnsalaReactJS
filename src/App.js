
import React from 'react';
import Login from './telas/login';
import TelaInicial from './telas/home';
import Modalidade from './telas/modalidade';
import Professor from './telas/professor';
import AreaConhecimento from './telas/areaConhecimento';
import UnidadeCurricular from './telas/unidadeCurricular';
import GerenciarEmailsProfessores from './telas/gerenciarEmailsProfessores';
import Disponibilidade from './telas/disponibilidade';
import { BrowserRouter, Route, Switch } from "react-router-dom";


export default class App extends React.Component {
    render() {
        return <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={Login} />
                <Route path="/home/" component={TelaInicial} />
                <Route path="/cadastro/professor" component={Professor} />
                <Route path="/cadastro/modalidade" component={Modalidade} />
                <Route path="/cadastro/areaConhecimento" component={AreaConhecimento} />
                <Route path="/cadastro/unidadeCurricular" component={UnidadeCurricular} />
                <Route path="/processo/gerenciaremailsprofessores" component={GerenciarEmailsProfessores} />
                <Route path="/processo/disponibilidade" component={Disponibilidade} />
            </Switch>
        </ BrowserRouter>
    }
}

