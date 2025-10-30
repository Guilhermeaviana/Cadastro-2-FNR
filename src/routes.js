import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Welcom from './page/Welcome'; // <-- USA O SEU COMPONENTE EXISTENTE
import Produtos from './page/Product';
import Categorias from './page/Category';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Welcom} /> {/* Rota principal aponta para Welcom */}
            <Route path="/products" component={Produtos} />
            <Route path="/categories" component={Categorias} />
        </Switch>
    );
}