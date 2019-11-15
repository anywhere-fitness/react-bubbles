import React from "react";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [creds, setCreds] = useState({username: "", password: ""});
  const handleChange = event => {
      setCreds({...creds, [event.target.name]: event.target.value});
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios.post('http://localhost:5000/api/login', creds)
    .then(res => {console.log(res);
        localStorage.setItem('token', res.data.payload);
        props.history.push('/BubblePage');
    })
    .catch(err => console.log(err.response));
}


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      {/* <p>Build a login page here</p> */}

      <form onSubmit={handleSubmit}>

      <input type='text'
      name='username'
      placeholder='username' 
      onChange={handleChange} 
      value={creds.username}/>

      <input type='password' 
      name='password' 
      placeholder='password' 
      onChange={handleChange} 
      value={creds.password}/>

      <button type='submit'>Submit</button>

    </form>

    </>
  );
};

export default Login;
