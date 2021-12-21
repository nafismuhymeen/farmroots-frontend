import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FiX, FiXCircle } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { createHelp, deleteHelp, editHelp, listEmployeeHelp } from '../../actions/helpActions';
import UploadSidebar from '../../components/UploadSidebar';
import Header from '../../components/Header';

function UploadHelpScreen (props) {

    const [helpModalVisible, setHelpModalVisible] = useState(false);
    const [type, setType] = useState('');
    const [heading, setHeading] = useState('');
    const [content, setContent] = useState('');
    const [id, setId] = useState('');
    const [edit, setEdit] = useState(false);

    const [confirmModalVisible, setConfirmModalVisible] = useState(false);

    const dispatch = useDispatch();

    const helpEmployeeList = useSelector(state =>state.helpEmployeeList);
    const {loading, help, error} = helpEmployeeList;

    const helpCreate = useSelector(state => state.helpCreate);
    const {success: successCreate} = helpCreate;

    const helpEdit = useSelector(state => state.helpEdit);
    const {success: successEdit} = helpEdit;

    const helpDelete = useSelector(state => state.helpDelete);
    const {success: successDelete} = helpDelete;

    useEffect (() => {
        if(successCreate || successEdit)
        {
            setHelpModalVisible(false);
        }
        dispatch(listEmployeeHelp());
        return () => {
            //
        };
    }, [successCreate, successEdit, successDelete]);

    const openCreateModal = () => {
        setType('');
        setHeading('');
        setContent('');
        setEdit(false);
        setHelpModalVisible(true);
    }

    const openEditModal = (help) => {
        setType(help.type);
        setHeading(help.heading);
        setContent(help.content);
        setId(help._id);
        setEdit(true);
        setHelpModalVisible(true);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if(edit === false)
        {
            dispatch(createHelp({type, heading, content}));
        }
        else
        {
            dispatch(editHelp({_id: id, type, heading, content}))
        }
    }

    const confirmModalHandler = (help) => {
        setId(help._id);
        setConfirmModalVisible(true);
    }

    const deleteHandler = () => {
        dispatch(deleteHelp(id));
        setConfirmModalVisible(false);
    }

    return <div className="grid">
        <div className="grid-header">
            <Header></Header>
        </div>

        <Modal show={confirmModalVisible} onHide={() => setConfirmModalVisible(false)} centered dialogClassName="modal-35w">
            <Modal.Body>
                <div className="confirm-container">
                    <div className="confirm-no-icon"><FiXCircle></FiXCircle></div>
                    <div className="confirm-heading">Are you sure?</div>
                    <div className="confirm-text">Do you really want to delete this page content? This process cannot be undone.</div>
                    <div className="confirm-buttons">
                        <Button onClick={() => setConfirmModalVisible(false)} className="confirm-no-button">No</Button>
                        <Button onClick = {deleteHandler} className="confirm-yes-button">Yes</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>

        <Modal show={helpModalVisible} onHide={() => setHelpModalVisible(false)} dialogClassName="modal-50w" centered>
            <Modal.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="admin-uploads-modal-heading">Enter Page Details</div>
                    <Button className="admin-uploads-modal-button" onClick={() => setHelpModalVisible(false)}><FiX></FiX></Button>
                </div>
                <form className="admin-uploads-form" onSubmit={submitHandler}>
                    <div className="d-flex justify-content-between align-items-center" style={{width: "100%", marginBottom: "2rem"}}>
                        <label className="admin-uploads-label">Type</label>
                        <select className="admin-uploads-select" value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="">Select Type</option>
                            <option value="Terms and Conditions">Terms and Conditions</option>
                            <option value="Privacy">Privacy</option>
                            <option value="Contact Us">Contact Us</option>
                            <option value="FAQs">FAQs</option>
                            <option value="Customer Service">Customer Service</option>
                        </select>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{width: "100%", marginBottom: "2rem"}}>
                        <label className="admin-uploads-label">Heading</label>
                        <input autoComplete="off" placeholder="Eg. Terms and Conditions" className="admin-uploads-input" type="text" name="heading" value={heading} onChange={(e) => setHeading(e.target.value)}></input>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{width: "100%", marginBottom: "2rem"}}>
                        <label className="admin-uploads-label">Content</label>
                        <textarea placeholder="Eg. You can order only..." className="admin-uploads-textarea" type="text" name="content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                    </div>
                    <Button type='submit' className="admin-uploads-submit">Submit</Button>
                </form>
            </Modal.Body>
        </Modal>

        <div className="main">
            <div className="d-flex">
                <UploadSidebar value="Help"></UploadSidebar>
                <div className="admin-content">
                    {loading ? <div></div> : 
                    error ? <div>{error.message}</div> : 
                    <>
                        <div className="d-flex justify-content-between align-items-center" style={{marginBottom: "2rem"}}>
                            <div className="admin-uploads-heading">Help</div>
                            <div className="d-flex align-items-center">
                                <Button onClick={openCreateModal} className="admin-uploads-button">Add Help</Button>
                            </div>
                        </div>
                        <table className="table table-striped table-bordered">
                            <thead style={{fontSize: "1.8rem"}}>
                                <tr>
                                    <th>ID</th>
                                    <th>Type</th>
                                    <th>Heading</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {help.map((help, index) => (<tr key = {help._id}>
                                    <td>{Number(index) + 1}</td>
                                    <td>{help.type}</td>
                                    <td>{help.heading}</td>
                                    <td className="d-flex">
                                        <Button onClick={() => openEditModal(help)} className="admin-table-button">Edit</Button>
                                        <Button onClick={() => confirmModalHandler(help)} className="admin-table-button">Delete</Button>
                                    </td>
                                </tr>))}
                            </tbody>
                        </table>
                    </>}
                </div>
            </div>
        </div>
    </div>
}

export default UploadHelpScreen;