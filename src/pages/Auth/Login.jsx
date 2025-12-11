import React, { useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Toastify from "../../components/message";
import { useAuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const { setContextState } = useAuthContext();
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleLogin = async () => {
    const { email, password } = state;

    if (!email.trim()) return Toastify("Email is required", "error");
    if (!password.trim()) return Toastify("Password is required", "error");

    setIsProcessing(true);
    const URL = import.meta.env.VITE_API_URL;

    try {
      const res = await axios.post(`${URL}/api/auth/login`, { email, password });
      const data = res.data;
      setIsProcessing(false);

      Toastify(data.message || "Login successful", "success");
      setContextState((s) => ({ ...s, isAuth: true }));

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      console.log(JSON.parse(localStorage.getItem("user")))
      

      navigate("/dashboard");
    } catch (error) {
      setIsProcessing(false);
      const message = error.response?.data?.message || "Invalid credentials or network issue.";
      Toastify(message, "error");
    }
  };

  return (
    <main className="auth">
      <div className="card p-4">
        <h2 className="text-center text-dark mb-4">Sign In</h2>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Email">
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Password">
                <Input.Password
                  placeholder="Password"
                  name="password"
                  value={state.password}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Button
                type="primary"
                danger
                block
                loading={isProcessing}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Col>
            <Col span={24} className="text-center mt-3">
              <p className="text-dark">
                Don’t have an account?{" "}
                <Link to="/auth/register" style={{ color: "#ff4d4f" }}>
                  Sign Up
                </Link>
              </p>
            </Col>
          </Row>
        </Form>
      </div>
    </main>
  );
};

export default Login;
