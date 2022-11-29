import { Link, Route, Routes } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from "react";

import Login from './components/movie.js'
import AddReview from './components/add-review.js'
import MoviesList from './components/movies-list'
import Movie from './components/movie.js';

function App() {

  const [user, setUser] = useState(false)

  const login = () => {
    setUser(!user)
  }
  const logout = () =>{
    setUser(!user)
  }
  return (
    <div>
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Movie Rank</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link>
              <Link to="/movies">Movie</Link>
            </Nav.Link>
            <Nav.Link>
                {user ? (
                  <a onClick={logout}>Logout User</a>
                ): (
                  <Link to="/login"><a onClick={login}>Login</a></Link>
                )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Routes>
    {["/", "/movies"].map(path => <Route path={path} element=<MoviesList/>/>)}

    <Route path="/movies/:id/review" render={(props)=>
    <AddReview {...props} user={user} />
    }/>
    <Route path="/movies/:id/" render={(props)=>
    <Movie {...props} user={user} />
    }/>
    <Route path="/login" render={(props)=>
    <Login {...props} login={login} />
    } />
    </Routes>
    </div>
  );
}

export default App;
