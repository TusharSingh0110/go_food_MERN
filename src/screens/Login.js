// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// export default function Login() {
//   const [credentials, setCredentials] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/api/loginuser", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email: credentials.email, password: credentials.password })
//       });

//       const json = await response.json();
//       console.log(json);

//       if (!json.success) {
//         alert("Enter Valid Credentials");
//       } else {
//         navigate("/");
//       }
//     } catch (error) {
//       console.error('Error logging in:', error);
//       alert("Failed to log in. Please try again.");
//     }
//   };

//   const onChange = (event) => {
//     setCredentials({ ...credentials, [event.target.name]: event.target.value });
//   };

//   return (
//     <div>
//       <div className='container'>
//         <form onSubmit={handleSubmit}>

//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">Email address</label>
//             <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">Password</label>
//             <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
//           </div>

//           <button type="submit" className="btn btn-primary">Submit</button>
//           <Link to='/createuser' className='m-3 btn btn-danger'>I'm a new user</Link>
//         </form>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // State to store login error
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        setError("Invalid credentials"); // Set error message for invalid credentials
      } else {
        navigate("/"); // Redirect to home page upon successful login
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError("Failed to log in. Please try again."); // Set error message for login failure
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div className='container'>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to='/createuser' className='m-3 btn btn-danger'>I'm a new user</Link>
          
          {error && <div className="alert alert-danger mt-3">{error}</div>} {/* Display error message if login fails */}
        </form>
      </div>
    </div>
  );
}
