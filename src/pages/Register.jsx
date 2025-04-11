import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { supabase } from "../context/Supabase";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
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
    e.preventDefault(); // prevent page refresh
    console.log("Registering user...");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        }
      }
    });

    if (error) {
      alert("Signup Failed: " + error.message);
    } else {
      console.log("SignUp Successful:", data);
      alert("Verification email sent. Please check your inbox.");
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
    <div className="container mt-5">
      <center>
        <h2>Create Account</h2>
        <br />
      </center>

      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Enter your name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <br />
        <center>
          <Button
            variant="primary"
            type="submit"
            style={{
              width: "200px",
              height: "40px",
              borderRadius: "15px",
            }}
          >
            Sign Up
          </Button>
          <h2 style={{ marginTop: "20px" }}>OR</h2>
          <br />
          <Button
            onClick={handleGoogleSignIn}
            variant="info"
            style={{
              width: "200px",
              height: "40px",
              borderRadius: "15px",
            }}
          >
            Sign In with Google
          </Button>
        </center>
      </Form>
    </div>
  );
};

export default RegisterPage;
