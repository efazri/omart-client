import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Dashboard, Login, Product_Detail, Cart } from './pages'
import Navbar from './components/Navbar'

function App() {
  return (
    <div>
      <Router>
      <Navbar />
        <Switch>
          <Route path="/cart" component={Cart} />
          <Route path="/login" component={Login} />
          <Route path="/:id" component={Product_Detail} />
          <Route path="/" component={Dashboard}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
