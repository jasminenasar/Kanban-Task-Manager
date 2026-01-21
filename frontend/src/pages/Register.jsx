import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { Link } from "react-router-dom";


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      await API.post("/auth/register",{
        name,
        email,
        password,
      });
       navigate("/");
    }catch (err) {
      alert("Registration failed");
  }
  };
  return (
    <div style={styles.container}>
      <h2 className="text-2xl font-semibold text-center py-4">Register</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />

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
          Register
        </button>
        <p>
  Already have an account?{" "}
  <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">Login</Link>
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
    backgroundColor: "#16a34a",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default Register;
