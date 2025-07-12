import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from "react-bootstrap";
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from "../context/Supabase";

const MyNavbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setIsLoggedIn(!!data?.user);
    };

    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    navigate("/register");
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand>Readora</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" style={{ textDecoration: "none" }}>
                <Nav.Link as="span">Home</Nav.Link>
              </Link>

              {isLoggedIn && (
                <>
                  <Link to="/book/list" style={{ textDecoration: "none" }}>
                    <Nav.Link as="span">Add Listing</Nav.Link>
                  </Link>
                  <Link to="/profile" style={{ textDecoration: "none" }}>
                    <Nav.Link as="span">Profile</Nav.Link>
                  </Link>
                </>
              )}
            </Nav>

            <div>
              {isLoggedIn ? (
                <Button onClick={handleLogout}>Logout</Button>
              ) : (
                <Button onClick={() => navigate("/user")} style={{ marginRight: "10px" }}>
                  Signin
                </Button>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr />
    </>
  );
};

export default MyNavbar;
