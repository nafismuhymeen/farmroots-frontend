import React from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { RiFeedbackFill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { FaMotorcycle, FaBoxes, FaUserCheck, FaUserEdit, FaUserTag, FaUserTimes, FaHome } from "react-icons/fa";

function CallCenterBossSidebar(props){

    return <div className="admin-sidebar">
        <div className="admin-sidebar-heading">Call Center Boss</div>
        {props.value === 'Unassigned' ? <Button className="admin-sidebar-button admin-sidebar-button-selected" href = "/6118131915162019/call-center-boss/unassigned">
            <FaUserTimes className="admin-sidebar-button-icon"></FaUserTimes>
            <div>Unassigned Orders</div>
        </Button> : <Button className="admin-sidebar-button" href = "/6118131915162019/call-center-boss/unassigned">
            <FaUserTimes className="admin-sidebar-button-icon"></FaUserTimes>
            <div>Unassigned Orders</div>
        </Button>}
        {props.value === 'Assigned' ? <Button className="admin-sidebar-button admin-sidebar-button-selected" href = "/6118131915162019/call-center-boss/assigned">
            <FaUserTag className="admin-sidebar-button-icon"></FaUserTag>
            <div>Assigned Orders</div>
        </Button> : <Button className="admin-sidebar-button" href = "/6118131915162019/call-center-boss/assigned">
            <FaUserTag className="admin-sidebar-button-icon"></FaUserTag>
            <div>Assigned Orders</div>
        </Button>}
        {props.value === 'Authorized' ? <Button className="admin-sidebar-button admin-sidebar-button-selected" href = "/6118131915162019/call-center-boss/authorized">
            <FaUserCheck className="admin-sidebar-button-icon"></FaUserCheck>
            <div>Authorized Orders</div>
        </Button> : <Button className="admin-sidebar-button" href = "/6118131915162019/call-center-boss/authorized">
            <FaUserCheck className="admin-sidebar-button-icon"></FaUserCheck>
            <div>Authorized Orders</div>
        </Button>}
        {props.value === 'Processed' ? <Button className="admin-sidebar-button admin-sidebar-button-selected" href = "/6118131915162019/call-center-boss/processed">
            <FaBoxes className="admin-sidebar-button-icon"></FaBoxes>
            <div>Processed Orders</div>
        </Button> : <Button className="admin-sidebar-button" href = "/6118131915162019/call-center-boss/processed">
            <FaBoxes className="admin-sidebar-button-icon"></FaBoxes>
            <div>Processed Orders</div>
        </Button>}
        {props.value === 'Out For Delivery' ? <Button className="admin-sidebar-button admin-sidebar-button-selected" href = "/6118131915162019/call-center-boss/out-for-delivery">
            <FaMotorcycle className="admin-sidebar-button-icon"></FaMotorcycle>
            <div>Orders Out For Delivery</div>
        </Button> : <Button className="admin-sidebar-button" href = "/6118131915162019/call-center-boss/out-for-delivery">
            <FaMotorcycle className="admin-sidebar-button-icon"></FaMotorcycle>
            <div>Orders Out For Delivery</div>
        </Button>}
        {props.value === 'Delivered' ? <Button className="admin-sidebar-button admin-sidebar-button-selected" href = "/6118131915162019/call-center-boss/delivered">
            <FaHome className="admin-sidebar-button-icon"></FaHome>
            <div>Delivered Orders</div>
        </Button> : <Button className="admin-sidebar-button" href = "/6118131915162019/call-center-boss/delivered">
            <FaHome className="admin-sidebar-button-icon"></FaHome>
            <div>Delivered Orders</div>
        </Button>}
        {props.value === 'Cancelled' ? <Button className="admin-sidebar-button admin-sidebar-button-selected" href = "/6118131915162019/call-center-boss/cancelled">
            <MdCancel className="admin-sidebar-button-icon"></MdCancel>
            <div>Cancelled Orders</div>
        </Button> : <Button className="admin-sidebar-button" href = "/6118131915162019/call-center-boss/cancelled">
            <MdCancel className="admin-sidebar-button-icon"></MdCancel>
            <div>Cancelled Orders</div>
        </Button>}
        {props.value === 'Feedback' ? <Button className="admin-sidebar-button admin-sidebar-button-selected" href = "/6118131915162019/call-center-boss/feedback">
            <RiFeedbackFill className="admin-sidebar-button-icon"></RiFeedbackFill>
            <div>Feedback Orders</div>
        </Button> : <Button className="admin-sidebar-button" href = "/6118131915162019/call-center-boss/feedback">
            <RiFeedbackFill className="admin-sidebar-button-icon"></RiFeedbackFill>
            <div>Feedback Orders</div>
        </Button>}
        {props.value === 'Re-Assign' ? <Button className="admin-sidebar-button admin-sidebar-button-selected" href = "/6118131915162019/call-center-boss/re-assign">
            <FaUserEdit className="admin-sidebar-button-icon"></FaUserEdit>
            <div>Re-Assign Orders</div>
        </Button> : <Button className="admin-sidebar-button" href = "/6118131915162019/call-center-boss/re-assign">
            <FaUserEdit className="admin-sidebar-button-icon"></FaUserEdit>
            <div>Re-Assign Orders</div>
        </Button>}
    </div>
}

export default withRouter(CallCenterBossSidebar);