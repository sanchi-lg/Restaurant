import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
import './App.css';
import AddOrder from './components/AddOrder';
import Home from './components/Home';
import Login from './components/Login';
import Reports from './components/Reports';


function App() {
  return (
    <div className="App">
      <header>
        <div style={{ height: "50px", marginBottom: "10px", width: "100%", background: "grey", marginTop: 0, fontWeight: "normal", fontSize: "large", color: "white", verticalAlign: "middle", display: "flex", justifyItems: "center", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
          ABC Restaurant
               </div>
      </header>
      <main>
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/" exact component={Home} />
            <Route path="/addorder" exact component={AddOrder} />
            <Route path="/reports" exact component={Reports} />

          </Switch>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
