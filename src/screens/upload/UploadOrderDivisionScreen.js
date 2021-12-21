import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FiX, FiXCircle } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { createDivision, deleteDivision, editDivision, listEmployeeDivision } from '../../actions/orderDivisionActions';
import UploadSidebar from '../../components/UploadSidebar';
import Header from '../../components/Header';
import { CSVReader } from 'react-papaparse';

function UploadOrderDivisionScreen (props) {

    const [divisionModalVisible, setDivisionModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [district, setDistrict] = useState('');
    const [area, setArea] = useState('');
    const [zoneName, setZoneName] = useState('');
    const [zoneNumber, setZoneNumber] = useState('');
    const [id, setId] = useState('');
    const [edit, setEdit] = useState(false);

    const [confirmModalVisible, setConfirmModalVisible] = useState(false);

    const dispatch = useDispatch();

    const divisionList = useSelector(state =>state.divisionList);
    const {loading, divisions, error} = divisionList;

    const divisionCreate = useSelector(state => state.divisionCreate);
    const {success: successCreate} = divisionCreate;

    const divisionEdit = useSelector(state => state.divisionEdit);
    const {success: successEdit} = divisionEdit;

    const divisionDelete = useSelector(state => state.divisionDelete);
    const {success: successDelete} = divisionDelete;

    useEffect (() => {
        if(successCreate || successEdit)
        {
            setDivisionModalVisible(false);
        }
        dispatch(listEmployeeDivision());
        return () => {
            //
        };
    }, [successCreate, successEdit, successDelete]);

    const openCreateModal = () => {
        setName('');
        setDistrict('');
        setArea('');
        setZoneName('');
        setZoneNumber('');
        setEdit(false);
        setDivisionModalVisible(true);
    }

    const openEditModal = (division) => {

        setName(division.name);
        setDistrict(division.district);
        setArea(division.area);
        setZoneName(division.zoneName);
        setZoneNumber(division.zoneNumber);
        setId(division._id);
        setEdit(true);
        setDivisionModalVisible(true);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if(edit === false)
        {
            dispatch(createDivision({name, district, area, zoneName, zoneNumber}));
        }
        else
        {
            dispatch(editDivision({_id: id, name, district, area, zoneName, zoneNumber}))
        }
    }

    const confirmModalHandler = (division) => {
        setId(division._id);
        setConfirmModalVisible(true);
    }

    const deleteHandler = () => {
        dispatch(deleteDivision(id));
        setConfirmModalVisible(false);
    }

    const handleOnDrop = (data) => {
        for (const index in data)
        {
            if(index > 0 && data[index].data.length > 1)
            {
                dispatch(createDivision({
                    name: data[index].data[0],
                    district: data[index].data[1],
                    area: data[index].data[2],
                    zoneName: data[index].data[3],
                    zoneNumber: data[index].data[4]
                }));
            }
        }
    }
    
    const handleOnError = (err, file, inputElem, reason) => {
        console.log(err)
    }

    const handleOnRemoveFile = (data) => {
        console.log(data)
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
                    <div className="confirm-text">Do you really want to delete this address? This process cannot be undone.</div>
                    <div className="confirm-buttons">
                        <Button onClick={() => setConfirmModalVisible(false)} className="confirm-no-button">No</Button>
                        <Button onClick = {deleteHandler} className="confirm-yes-button">Yes</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>

        <Modal show={divisionModalVisible} onHide={() => setDivisionModalVisible(false)} dialogClassName="modal-35w" centered>
            <Modal.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="admin-uploads-modal-heading">Enter Address Details</div>
                    <Button className="admin-uploads-modal-button" onClick={() => setDivisionModalVisible(false)}><FiX></FiX></Button>
                </div>
                <form className="admin-uploads-form" onSubmit={submitHandler}>
                    <div className="d-flex justify-content-between align-items-center" style={{width: "100%", marginBottom: "2rem"}}>
                        <label className="admin-uploads-label">Division</label>
                        <input autoComplete="off" className="admin-uploads-input" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{width: "100%", marginBottom: "2rem"}}>
                        <label className="admin-uploads-label">District</label>
                        <input autoComplete="off" className="admin-uploads-input" type="text" name="district" value={district} onChange={(e) => setDistrict(e.target.value)}></input>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{width: "100%", marginBottom: "2rem"}}>
                        <label className="admin-uploads-label">Area</label>
                        <input autoComplete="off" className="admin-uploads-input" type="text" name="area" value={area} onChange={(e) => setArea(e.target.value)}></input>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{width: "100%", marginBottom: "2rem"}}>
                        <label className="admin-uploads-label">Zone Name</label>
                        <input autoComplete="off" className="admin-uploads-input" type="text" name="zoneName" value={zoneName} onChange={(e) => setZoneName(e.target.value)}></input>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{width: "100%", marginBottom: "2rem"}}>
                        <label className="admin-uploads-label">Zone Number</label>
                        <input autoComplete="off" className="admin-uploads-input" type="text" name="zoneNumber" value={zoneNumber} onChange={(e) => setZoneNumber(e.target.value)}></input>
                    </div>
                    <Button type='submit' className="admin-uploads-submit">Submit</Button>
                </form>
            </Modal.Body>
        </Modal>

        <div className="main">
            <div className="d-flex">
                <UploadSidebar value="Division"></UploadSidebar>
                <div className="admin-content">
                    {loading ? <div></div> : 
                    error ? <div>{error.message}</div> : 
                    <>
                        <div className="d-flex justify-content-between align-items-center" style={{marginBottom: "2rem"}}>
                            <div className="admin-uploads-heading">Order Division</div>
                            <div className="d-flex align-items-center">
                                <div className="admin-uploads-div">
                                    <CSVReader
                                        onDrop={handleOnDrop}
                                        onError={handleOnError}
                                        noDrag
                                        addRemoveButton
                                        onRemoveFile={handleOnRemoveFile}
                                    >
                                        <span>Click to upload CSV</span>
                                    </CSVReader>
                                </div>
                                <Button onClick={openCreateModal} className="admin-uploads-button">Add New Division</Button>
                            </div>
                        </div>
                        <table className="table table-striped table-bordered">
                            <thead style={{fontSize: "1.8rem"}}>
                                <tr>
                                    <th>ID</th>
                                    <th>Division</th>
                                    <th>District</th>
                                    <th>Area / Thana</th>
                                    <th>Zone Name</th>
                                    <th>Zone Number</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {divisions.map((division, index) => (<tr key = {division._id}>
                                    <td>{Number(index) + 1}</td>
                                    <td>{division.name}</td>
                                    <td>{division.district}</td>
                                    <td>{division.area}</td>
                                    <td>{division.zoneName}</td>
                                    <td>{division.zoneNumber}</td>
                                    <td className="d-flex">
                                        <Button onClick={() => openEditModal(division)} className="admin-table-button">Edit</Button>
                                        <Button onClick={() => confirmModalHandler(division)} className="admin-table-button">Delete</Button>
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

export default UploadOrderDivisionScreen;