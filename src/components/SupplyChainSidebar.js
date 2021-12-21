import React from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { RiFeedbackFill } from "react-icons/ri";
import { MdCancel, MdContentCut } from "react-icons/md";
import { FaMotorcycle, FaBoxes, FaHome, FaBoxOpen, FaTruck } from "react-icons/fa";

function SupplyChainSidebar(props){

    return <div className="admin-sidebar">
        <div className="admin-sidebar-heading">Supply Chain</div>
        {props.value === 'Unprocessed' ? <Button className="admin-sidebar-button admin-sidebar-button-selected" href = "/6118131915162019/supply-chain/unprocessed">
            <FaBoxOpen className="admin-sidebar-button-icon"></FaBoxOpen>
            <div>Unprocessed Orders</div>
        </Button> : <Button className="admin-sidebar-button" href = "/6118131915162019/supply-chain/unprocessed">
            <FaBoxOpen className="admin-sidebar-button-icon"></FaBoxOpen>
            <div>Unprocessed Orders</div>
        </Button>}
        {props.value === 'Pickup' ? <Button className="admin-sidebar-button admin-sidebar-button-selected" href = "/6118131915162019/supply-chain/pickup">
            <FaTruck className="admin-sidebar-button-icon"></FaTruck>
            <div>Pickup Orders</div>
        </Button> : <Button className="admin-sidebar-button" href = "/6118131915162019/supply-chain/pickup">
            <FaTruck className="admin-sidebar-button-icon"></FaTruck>
            <div>Pickup Orders</div>
        </Button>}
        {props.value === 'Partial' ? <Button className="admin-sidebar-button admin-sidebar-button-selected" href = "/6118131915162019/supply-chain/partial">
            <MdContentCut className="admin-sidebar-button-icon"></MdContentCut>
            <div>Partial Orders</div>
        </Button> : <Button className="admin-sidebar-button" href = "/6118131915162019/supply-chain/partial">
            <MdContentCut className="admin-sidebar-button-icon"></MdContentCut>
            <div>Partial Orders</div>
        </Button>}
        {props.value === 'Processed' ? <Button className="admin-sidebar-button admin-sidebar-button-selected" href = "/6118131915162019/supply-chain/processed">
            <FaBoxes className="admin-sidebar-button-icon"></FaBoxes>
            <div>Processed Orders</div>
        </Button> : <Button className="admin-sidebar-button" href = "/6118131915162019/supply-chain/processed">
            <FaBoxes className="admin-sidebar-button-icon"></FaBoxes>
            <div>Processed Orders</div>
        </Button>}
        {props.value === 'Out For Delivery' ? <Button className="admin-sidebar-button admin-sidebar-button-selected" href = "/6118131915162019/supply-chain/out-for-delivery">
            <FaMotorcycle className="admin-sidebar-button-icon"></FaMotorcycle>
            <div>Orders Out For Delivery</div>
        </Button> : <Button className="admin-sidebar-button" href = "/6118131915162019/supply-chain/out-for-delivery">
            <FaMotorcycle className="admin-sidebar-button-icon"></FaMotorcycle>
            <div>Orders Out For Delivery</div>
        </Button>}
        {props.value === 'Delivered' ? <Button className="admin-sidebar-button admin-sidebar-button-selected" href = "/6118131915162019/supply-chain/delivered">
            <FaHome className="admin-sidebar-button-icon"></FaHome>
            <div>Delivered Orders</div>
        </Button> : <Button className="admin-sidebar-button" href = "/6118131915162019/supply-chain/delivered">
            <FaHome className="admin-sidebar-button-icon"></FaHome>
            <div>Delivered Orders</div>
        </Button>}
        {props.value === 'Feedback' ? <Button className="admin-sidebar-button admin-sidebar-button-selected" href = "/6118131915162019/supply-chain/feedback">
            <RiFeedbackFill className="admin-sidebar-button-icon"></RiFeedbackFill>
            <div>Feedback Orders</div>
        </Button> : <Button className="admin-sidebar-button" href = "/6118131915162019/supply-chain/feedback">
            <RiFeedbackFill className="admin-sidebar-button-icon"></RiFeedbackFill>
            <div>Feedback Orders</div>
        </Button>}
        {props.value === 'Cancelled' ? <Button className="admin-sidebar-button admin-sidebar-button-selected" href = "/6118131915162019/supply-chain/cancelled">
            <MdCancel className="admin-sidebar-button-icon"></MdCancel>
            <div>Cancelled Orders</div>
        </Button> : <Button className="admin-sidebar-button" href = "/6118131915162019/supply-chain/cancelled">
            <MdCancel className="admin-sidebar-button-icon"></MdCancel>
            <div>Cancelled Orders</div>
        </Button>}
    </div>
}

export default withRouter(SupplyChainSidebar);