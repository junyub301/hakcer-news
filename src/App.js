import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "./components/Layout";
import List from "./components/List";
import Detail from "./components/Detail";
import { GlobalStyles } from "./style";

function App() {
    return (
        <>
            <GlobalStyles />
            <Router>
                <Switch>
                    <Route path='/' exact>
                        <Layout>Home</Layout>
                    </Route>
                    <Route exact path={`/:category`}>
                        <Layout>
                            <List />
                        </Layout>
                    </Route>
                    <Route path={`/item/:id`}>
                        <Layout>
                            <Detail />
                        </Layout>
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
