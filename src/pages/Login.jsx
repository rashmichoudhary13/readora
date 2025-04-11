import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import image3 from "./image3.jpg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { supabase } from "../context/SupabaseProvider";

const ImageContainer = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
`;

const ImageBackground = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const TextWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 100px;
`;

const Text = styled.h3`
  font-size: 80px;
  color: white;
  text-align: center;
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        navigate("/");
      }
    };
    checkUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login Failed: " + error.message);
    } else {
      console.log("Login Success:", data);
      navigate("/");
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.log("Google Sign-in error:", error.message);
    }
  };

  return (
    <div
      className="container mt-4"
      style={{
        backgroundColor: "#FFF9F9",
        borderRadius: "20px",
        padding: "20px",
      }}
    >
      <Container fluid>
        <Row>
          <Col md={6}>
            <ImageContainer>
              <ImageBackground
                src={image3}
                alt="background"
                style={{ borderRadius: "30px" }}
              />
              <TextWrapper>
                <Text>
                  Welcome Back
                  <br />
                  <h2>Signin to continue access</h2>
                </Text>
              </TextWrapper>
            </ImageContainer>
          </Col>

          <Col
            md={6}
            className="d-flex align-items-center justify-content-center"
          >
            <div style={{ width: "100%", maxWidth: "400px" }}>
              <h2 className="text-center mb-4">Login Here</h2>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="text-center mb-4">
                  <Button
                    variant="primary"
                    type="submit"
                    style={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "10px",
                    }}
                  >
                    Login
                  </Button>
                </div>
              </Form>

              <div className="text-center my-3">
                <strong>OR</strong>
              </div>

              <div className="text-center">
                <Button
                  variant="info"
                  style={{ width: "100%", borderRadius: "10px" }}
                  onClick={handleGoogleSignIn}
                >
                  Sign In with Google
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
