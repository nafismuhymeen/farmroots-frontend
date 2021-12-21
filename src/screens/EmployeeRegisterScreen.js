import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { registerEmployee } from '../actions/employeeActions';
import Header from '../components/Header';

function EmployeeRegisterScreen(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');

    const employeeRegister = useSelector(state => state.employeeRegister);
    const {success} = employeeRegister;

    const dispatch = useDispatch();

    useEffect (() => {
        if(success)
        {
            setUsername('');
            setPassword('');
            setType('');
            alert("New Employee Registered");
        }
        return () => {
            //
        };
    }, [success]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(registerEmployee(username, password, type));
    }

    return <div className="grid">

        <div className="grid-header">
            <Header></Header>
        </div>

        <div className="main">
            <div style={{height: "50rem"}} className="d-flex justify-content-center align-items-center">
                <form onSubmit={submitHandler}>
                    <div className="d-flex flex-column" style={{marginBottom: "2rem"}}>
                        <label style={{fontSize: "2rem"}}>Username</label>
                        <input autoComplete="off" value={username} onChange={(e) => setUsername(e.target.value)} type="text" style={{width: "32rem"} }></input>
                    </div>
                    <div className="d-flex flex-column" style={{marginBottom: "2rem"}}>
                        <label style={{fontSize: "2rem"}}>Password</label>
                        <input autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} type="password" style={{width: "32rem"}}></input>
                    </div>
                    <div className="d-flex flex-column" style={{marginBottom: "2rem"}}>
                        <label style={{fontSize: "2rem"}}>Type</label>
                        <select value={type} className="address-form-select" onChange={(e) => setType(e.target.value)} type="password" style={{width: "32rem"}}>
                            <option value="">Select employee type</option>
                            <option value="Admin">Admin</option>
                            <option value="Uploader">Uploader</option>
                            <option value="Call Center Boss">Call Center Boss</option>
                            <option value="Call Center Guy">Call Center Guy</option>
                            <option value="Supply Chain">Supply Chain</option>
                            <option value="Delivery Guy">Delivery Guy</option>
                        </select>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Button className="admin-modal-form-submit" type="submit">Register</Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
}

export default EmployeeRegisterScreen