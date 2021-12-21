import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FiX, FiXCircle } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import axios from "axios";
import UploadSidebar from '../../components/UploadSidebar';
import { addExportsContent, createExports, deleteExportsContent, editExports, editExportsContent, getEmployeeExports } from '../../actions/exportsActions';

function UploadExportsScreen(props) {

    const [id, setId] = useState('');
    const [topImage, setTopImage] = useState('');
    const [uploading, setUploading] = useState(false);

    const [exportsContentName, setExportsContentName] = useState('');
    const [exportsContentImage, setExportsContentImage] = useState('');
    const [exportsContentInfo, setExportsContentInfo] = useState('');
    const [exportsContentModalVisible, setExportsContentModalVisible] = useState(false);
    const [exportsContentId, setExportsContentId] = useState('');
    const [editContent, setEditContent] = useState(false);

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [edit, setEdit] = useState(false);

    const [confirmModalVisible, setConfirmModalVisible] = useState(false);

    const dispatch = useDispatch();

    const exportsGet = useSelector(state => state.exportsGet);
    const { loading, exports, error } = exportsGet;

    const exportsCreate = useSelector(state => state.exportsCreate);
    const { success: successCreate } = exportsCreate;

    const exportsEdit = useSelector(state => state.exportsEdit);
    const { success: successEdit } = exportsEdit;

    const exportsContentAdd = useSelector(state => state.exportsContentAdd);
    const { success: successAddContent } = exportsContentAdd;

    const exportsContentEdit = useSelector(state => state.exportsContentEdit);
    const { success: successEditContent } = exportsContentEdit;

    const exportsContentDelete = useSelector(state => state.exportsContentDelete);
    const { success: successDeleteContent } = exportsContentDelete;

    useEffect(() => {
        dispatch(getEmployeeExports());
        if (successEdit) {
            setEditModalVisible(false);
        }
        if (successAddContent || successEditContent || successDeleteContent) {
            setExportsContentModalVisible(false);
            setEditContent(false);
            setExportsContentId('');
            setExportsContentImage('');
            setExportsContentInfo('');
            setExportsContentName('');
        }
        return () => {
            //
        };
    }, [successCreate, successEdit, successAddContent, successEditContent, successDeleteContent]);

    const saveChanges = () => {

        if (edit) {
            dispatch(editExports({ _id: id, topImage }));
        }
        else {
            dispatch(createExports({ topImage }));
        }

    }

    const openModal = (exports) => {
        if (exports._id) {
            setId(exports._id);
            setTopImage(exports.topImage);
            setEdit(true);
            setEditModalVisible(true);
        }
    }

    const openExportsContentEditModal = (exportsContent) => {
        setExportsContentName(exportsContent.name);
        setExportsContentId(exportsContent._id);
        setExportsContentImage(exportsContent.image);
        setExportsContentInfo(exportsContent.info);
        setEditContent(true);
        setExportsContentModalVisible(true);
    }

    const confirmModalHandler = (exportsContent) => {
        setId(exportsContent._id);
        setConfirmModalVisible(true);
    }

    const deleteHandler = () => {
        dispatch(deleteExportsContent({ id }));
        setConfirmModalVisible(false);
    }

    const uploadImage1Handler = (e) => {
        const file = e.target.files[0];
        setUploading(true);
        setExportsContentImage(file.name);
        const bodyFormData = new FormData();
        bodyFormData.append("image", file);
        setUploading(true);
        axios
            .post("/api/uploads", bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                // setImage1(response.data);
                setUploading(false);
            })
            .catch((err) => {
                console.log(err);
                setUploading(false);
            });
    };

    const uploadImage2Handler = (e) => {
        const file = e.target.files[0];
        setUploading(true);
        setTopImage(file.name);
        const bodyFormData = new FormData();
        bodyFormData.append("image", file);
        setUploading(true);
        axios
            .post("/api/uploads", bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                // setImage1(response.data);
                setUploading(false);
            })
            .catch((err) => {
                console.log(err);
                setUploading(false);
            });
    };
    const exportsContentHandler = (e) => {

        e.preventDefault();
        if (!editContent) {
            dispatch(addExportsContent({
                name: exportsContentName,
                image: exportsContentImage,
                info: exportsContentInfo
            }));
        }
        else {
            dispatch(editExportsContent({
                id: exportsContentId,
                name: exportsContentName,
                image: exportsContentImage,
                info: exportsContentInfo
            }));
        }
        window.location.reload();
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
                    <div className="confirm-text">Do you really want to delete this export? This process cannot be undone.</div>
                    <div className="confirm-buttons">
                        <Button onClick={() => setConfirmModalVisible(false)} className="confirm-no-button">No</Button>
                        <Button onClick={deleteHandler} className="confirm-yes-button">Yes</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>

        <Modal show={exportsContentModalVisible} onHide={() => setExportsContentModalVisible(false)} dialogClassName="modal-50w" centered>
            <Modal.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="admin-uploads-modal-heading">Enter Exports Content Details</div>
                    <Button className="admin-uploads-modal-button" onClick={() => setExportsContentModalVisible(false)}><FiX></FiX></Button>
                </div>
                <form className="admin-uploads-form" onSubmit={exportsContentHandler}>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", marginBottom: "2rem" }}>
                        <label className="admin-uploads-label">Exports Content Name</label>
                        <input autoComplete="off" placeholder="Eg. Exports from London" className="admin-uploads-input" type="text" name="exportsContentName" value={exportsContentName} onChange={(e) => setExportsContentName(e.target.value)}></input>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", marginBottom: "2rem" }}>
                        <label className="admin-uploads-label">Exports Content Image</label>
                        <input
                            autoComplete="off"
                            type="file"
                            name="image1"
                            onChange={uploadImage1Handler}
                            className="admin-modal-form-input admin-form-div-input"
                        ></input>
                        {/* <input autoComplete="off" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg" className="admin-uploads-input" type="text" name="exportsContentImage" value={exportsContentImage} onChange={(e) => setExportsContentImage(e.target.value)}></input> */}
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%" }}>
                        <label className="admin-uploads-label">Exports Content Info</label>
                        <textarea placeholder="Eg. At Farmroots we export..." className="admin-uploads-textarea" type="text" name="exportsContentInfo" value={exportsContentInfo} onChange={(e) => setExportsContentInfo(e.target.value)}></textarea>
                    </div>
                    <Button type='submit' className="admin-uploads-submit">Submit</Button>
                </form>
            </Modal.Body>
        </Modal>

        <div className="main">
            <div className="d-flex">
                <UploadSidebar value="Exports"></UploadSidebar>
                <div className="admin-content">
                    {loading ? <div></div> :
                        error ? <div>{error.message}</div> :
                            <>
                                {!exports._id ? <div>
                                    <div className="admin-header">
                                        <div className="admin-header-text" style={{ marginLeft: "1rem" }}>Exports Data</div>
                                        <div className="d-flex align-items-center">
                                            <Button onClick={saveChanges} className="admin-header-button">Create Exports</Button>
                                        </div>
                                    </div>
                                    <form className="admin-form">
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Top Image</label>

                                            <input autoComplete="off" className="admin-form-input" value={topImage} onChange={(e) => setTopImage(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input>
                                        </div>
                                    </form>
                                </div> : editModalVisible ? <div>
                                    <div className="admin-header">
                                        <div className="admin-header-text" style={{ marginLeft: "1rem" }}>Exports Data</div>
                                        <div className="d-flex align-items-center">
                                            <Button onClick={saveChanges} className="admin-header-button">Save Changes</Button>
                                        </div>
                                    </div>
                                    <form className="admin-form">
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Top Image</label>
                                            <input
                                                autoComplete="off"
                                                type="file"
                                                name="image1"
                                                onChange={uploadImage2Handler}
                                                className="admin-modal-form-input admin-form-div-input"
                                            ></input>
                                            {/* <input autoComplete="off" className="admin-form-input" value={topImage} onChange={(e) => setTopImage(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input> */}
                                        </div>
                                    </form>
                                </div> : <div>
                                    <div className="admin-header">
                                        <div className="admin-header-text" style={{ marginLeft: "1rem" }}>Exports Data</div>
                                        <div className="d-flex align-items-center">
                                            <Button onClick={() => setExportsContentModalVisible(true)} className="admin-header-button">Add Exports Content</Button>
                                            <Button onClick={() => openModal(exports)} className="admin-header-button">Edit Exports</Button>
                                        </div>
                                    </div>
                                    <table style={{ marginTop: "2rem" }} className="table table-striped table-bordered">
                                        <thead style={{ fontSize: "1.8rem" }}>
                                            <tr>
                                                <th>Exports Content ID</th>
                                                <th>Name</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {exports.exportsContent.map((content, index) => (
                                                <tr key={content._id}>
                                                    <td>{Number(index) + 1}</td>
                                                    <td>{content.name}</td>
                                                    <td className="d-flex">
                                                        <Button onClick={() => openExportsContentEditModal(content)} className="admin-table-button">Edit</Button>
                                                        <Button onClick={() => confirmModalHandler(content)} className="admin-table-button">Delete</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <form className="admin-form">
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Top Image</label>
                                            <div className="admin-form-div-input">{exports.topImage}</div>
                                        </div>
                                    </form>
                                </div>}
                            </>}
                </div>
            </div>
        </div>
    </div>
}

export default UploadExportsScreen;