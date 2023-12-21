// import { Button } from "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import '../styles/navBar.css'
import { useHistory } from 'react-router-dom'; // Import useHistory to redirect

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)
  const history = useHistory(); // Hook to manage navigation history


  const handleLogin = async (e) => {
    console.log("I was pressed", e)
    e.preventDefault()

    // Handle Register here!
    const response = await fetch('http://localhost:3001/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

	const data = await response.json()
    if(data.validated === true){
        console.log('found me', email)
        localStorage.clear()
        localStorage.setItem('email', email)
        localStorage.setItem('token', data.token)
        setLoginError(false)
        history.push('/') // Redirect to home or dashboard after successful login

        window.location.href = '/'
    }else {
      // Display login error alert
      setLoginError(true);
      console.log('Invalid email or password')
    }
    console.log(data)
  }
  return (
    <>
    <div className="App container center p-5">
      <h2 className="pb-2"> Login </h2>
      
      <br></br>
      {/* <LoginPage></LoginPage> */}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
          <input type="email" className="form-control" id="email"
            value={email} onChange={(e) => setEmail(() => e.target.value)}
            />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"
            value={password} onChange={(e) => setPassword(() => e.target.value)}
            />
        </div>
        {loginError && (
            <div className="alert alert-danger" role="alert">
              Invalid email or password. Please try again.
            </div>
          )}
        <li className="nav-item">
        <button type="submit" className="btn btn-warning p-2" href='/'>Submit</button>
                        <a className='nav-sub-item-2' href="/register">Register now!</a>
                        
                    </li>
        
      </form>
    </div>
    </>
  );
}

export default LoginPage;
