import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
    const naviagte = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const submitSignUp = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            naviagte('/');
        }
        else {
            alert("Inavalid credentials")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container">
            <h2>Create an account for using iNoteBook</h2>
            <form onSubmit={submitSignUp}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={onChange} value={credentials.name} name='name' required />
                </div>
                <div>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={onChange} value={credentials.email} name='email' aria-describedby="emailHelp" required />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control"  id="password" onChange={onChange} value={credentials.password} name='password' minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control"  id="cpassword" onChange={onChange} value={credentials.cpassword} name='cpassword' minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary">SignUp</button>
            </form>
        </div>
    )
}
