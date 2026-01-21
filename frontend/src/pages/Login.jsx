import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { Link } from "react-router-dom";
import { TypeOutline } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
        const res = await API.post("/auth/login", {email,password});
        localStorage.setItem("token", res.data.token);
        console.log("Login submitted");
         navigate("/dashboard");
         console.log("Email:",email);
         console.log("Password:",password);
         
    }
   catch (err) {
       console.error("Login error response:", err.response?.data);
       alert(err.response?.data?.message || "Login failed");
  }

  };

  return (
    <div style={styles.container}>
      <h2 className="text-2xl font-semibold text-center py-4">Login</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
       < p>
  Don’t have an account?{" "}
  <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">Register</Link>
</p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "300px",
    margin: "100px auto",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    border:"1px solid black",
   
  },
  button: {
    padding: "10px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default Login;

