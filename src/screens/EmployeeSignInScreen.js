import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { signInEmployee } from '../actions/employeeActions';
import Header from '../components/Header';

function EmployeeSignInScreen(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const employeeSignin = useSelector(state => state.employeeSignin);
    const {employeeInfo, success} = employeeSignin;

    const dispatch = useDispatch();

    useEffect (() => {
        if(employeeInfo && success)
        {
            if(employeeInfo.isCallCenterGuy && !employeeInfo.isSuperAdmin)
            {
                props.history.push("/6118131915162019/call-center/pending");
            }
            else if(employeeInfo.isUploader && !employeeInfo.isSuperAdmin)
            {
                props.history.push("/6118131915162019/upload/homescreen");
            }
            else if(employeeInfo.isCallCenterBoss && !employeeInfo.isSuperAdmin)
            {
                props.history.push("/6118131915162019/call-center-boss/unassigned");
            }
            else if(employeeInfo.isSupplyChainGuy && !employeeInfo.isSuperAdmin)
            {
                props.history.push("/6118131915162019/supply-chain/unprocessed");
            }
            else if(employeeInfo.isDeliveryMan && !employeeInfo.isSuperAdmin)
            {
                props.history.push("/6118131915162019/delivery");
            }
        }
        return () => {
            //
        };
    }, [employeeInfo, success]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signInEmployee(username, password));
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
                        <input autoComplete="off" onChange={(e) => setUsername(e.target.value)} type="text" style={{width: "32rem"} }></input>
                    </div>
                    <div className="d-flex flex-column" style={{marginBottom: "2rem"}}>
                        <label style={{fontSize: "2rem"}}>Password</label>
                        <input autoComplete="off" onChange={(e) => setPassword(e.target.value)} type="password" style={{width: "32rem"}}></input>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Button className="admin-modal-form-submit" type="submit">Login</Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
}

export default EmployeeSignInScreen