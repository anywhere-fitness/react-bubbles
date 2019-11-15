import React, {useState} from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialState = {
  username: "",
  password: ""
}
const Login = (props) => {
  const [login, setLogin] = useState(initialState)

  const handleChanges = e => {
    setLogin({ ...login, [e.target.name] : e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    axiosWithAuth()
      .post("./login", login)
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.payload)
        props.history.push('/bubbles');
    })
    setLogin(initialState)
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChanges}
          value={login.username}
        />
        <input 
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChanges}
          value={login.password}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;

