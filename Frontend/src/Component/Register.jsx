import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    let navigate = useNavigate()
    let [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: ""
    })


    let handleChange = (e) => {
        let { name, value } = e.target
        setFormData((pre) => (
            {
                ...pre,
                [name]: value
            }))
    }

    let handleSubmit = async (e) => {
        e.preventDefault()

        try {
            let newUser = {
                username: formData.name,
                email: formData.email,
                mobile: formData.mobile,
                password: formData.password
            }

            let res = await axios.post("https://usersregistration.onrender.com/api/user/", newUser)
            // console.log(res.data);
            alert(res.data.message)
            setFormData({
                name: "",
                email: "",
                password: "",
                mobile: ""
            })

            navigate("/user")
        } catch (error) {
            console.log(error);
        }


    }

    return (
        <div className='container'>
            <div>Register Here</div>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:- </label>
                    <input type="text" name='name' value={formData.name} placeholder='Enter Your Name Here' id='name' onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="email">Email:- </label>
                    <input type="email" name='email' value={formData.email} placeholder='Enter Your Email Here' onChange={handleChange} id='email' required />
                </div>
                <div>
                    <label htmlFor="number">Mobile No:- </label>
                    <input type="number" name='mobile' value={formData.mobile} placeholder='Enter Your Mobile Here' onChange={handleChange} id='number' required />
                </div>

                <div>
                    <label htmlFor="password">Password:- </label>
                    <input type="password" name='password' value={formData.password} placeholder='Enter Your Password Here' onChange={handleChange} id='password' required />
                </div>
                <button type='submit'>Submit</button>
            </form>
            <p>
                Already have an account? <span> <Link to="/">Login</Link></span>
            </p>
        </div>


    )
}


export default Register