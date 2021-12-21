import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FiX, FiXCircle } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import axios from "axios";
import UploadSidebar from '../../components/UploadSidebar';
import { addPartnerContent, createPartner, deletePartnerContent, editPartner, editPartnerContent, getEmployeePartner } from '../../actions/partnerActions';

function UploadPartnerScreen(props) {

    const [id, setId] = useState('');
    const [topImage, setTopImage] = useState('');
    const [uploading, setUploading] = useState(false);

    const [partnerContentName, setPartnerContentName] = useState('');
    const [partnerContentImage, setPartnerContentImage] = useState('');
    const [partnerContentInfo, setPartnerContentInfo] = useState('');
    const [partnerContentModalVisible, setPartnerContentModalVisible] = useState(false);
    const [partnerContentId, setPartnerContentId] = useState('');
    const [editContent, setEditContent] = useState(false);

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [edit, setEdit] = useState(false);

    const [confirmModalVisible, setConfirmModalVisible] = useState(false);

    const dispatch = useDispatch();

    const partnerGet = useSelector(state => state.partnerGet);
    const { loading, partner, error } = partnerGet;

    const partnerCreate = useSelector(state => state.partnerCreate);
    const { success: successCreate } = partnerCreate;

    const partnerEdit = useSelector(state => state.partnerEdit);
    const { success: successEdit } = partnerEdit;

    const partnerContentAdd = useSelector(state => state.partnerContentAdd);
    const { success: successAddContent } = partnerContentAdd;

    const partnerContentEdit = useSelector(state => state.partnerContentEdit);
    const { success: successEditContent } = partnerContentEdit;

    const partnerContentDelete = useSelector(state => state.partnerContentDelete);
    const { success: successDeleteContent } = partnerContentDelete;

    useEffect(() => {
        dispatch(getEmployeePartner());
        if (successEdit) {
            setEditModalVisible(false);
        }
        if (successAddContent || successEditContent || successDeleteContent) {
            setPartnerContentModalVisible(false);
            setEditContent(false);
            setPartnerContentId('');
            setPartnerContentImage('');
            setPartnerContentInfo('');
            setPartnerContentName('');
        }
        return () => {
            //
        };
    }, [successCreate, successEdit, successAddContent, successEditContent, successDeleteContent]);

    const saveChanges = () => {

        if (edit) {
            dispatch(editPartner({ _id: id, topImage }));
        }
        else {
            dispatch(createPartner({ topImage }));
        }
    }

    const openModal = (partner) => {
        if (partner._id) {
            setId(partner._id);
            setTopImage(partner.topImage);
            setEdit(true);
            setEditModalVisible(true);
        }
    }

    const openPartnerContentEditModal = (partnerContent) => {
        setPartnerContentName(partnerContent.name);
        setPartnerContentId(partnerContent._id);
        setPartnerContentImage(partnerContent.image);
        setPartnerContentInfo(partnerContent.info);
        setEditContent(true);
        setPartnerContentModalVisible(true);
    }

    const confirmModalHandler = (partnerContent) => {
        setId(partnerContent._id);
        setConfirmModalVisible(true);
    }

    const deleteHandler = () => {
        dispatch(deletePartnerContent({ id }));
        setConfirmModalVisible(false);
    }

    const uploadImage1Handler = (e) => {
        const file = e.target.files[0];
        setUploading(true);
        setPartnerContentImage(file.name);
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
                setUploading(false);
            });
    };
    const partnerContentHandler = (e) => {

        e.preventDefault();
        if (!editContent) {
            dispatch(addPartnerContent({
                name: partnerContentName,
                image: partnerContentImage,
                info: partnerContentInfo
            }));
        }
        else {
            dispatch(editPartnerContent({
                id: partnerContentId,
                name: partnerContentName,
                image: partnerContentImage,
                info: partnerContentInfo
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
                    <div className="confirm-text">Do you really want to delete this partner? This process cannot be undone.</div>
                    <div className="confirm-buttons">
                        <Button onClick={() => setConfirmModalVisible(false)} className="confirm-no-button">No</Button>
                        <Button onClick={deleteHandler} className="confirm-yes-button">Yes</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>

        <Modal show={partnerContentModalVisible} onHide={() => setPartnerContentModalVisible(false)} dialogClassName="modal-50w" centered>
            <Modal.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="admin-uploads-modal-heading">Enter Partner Content Details</div>
                    <Button className="admin-uploads-modal-button" onClick={() => setPartnerContentModalVisible(false)}><FiX></FiX></Button>
                </div>
                <form className="admin-uploads-form" onSubmit={partnerContentHandler}>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", marginBottom: "2rem" }}>
                        <label className="admin-uploads-label">Partner Content Name</label>
                        <input autoComplete="off" className="admin-uploads-input" type="text" name="partnerContentName" value={partnerContentName} onChange={(e) => setPartnerContentName(e.target.value)}></input>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", marginBottom: "2rem" }}>
                        <label className="admin-uploads-label">Partner Content Image</label>
                        <input
                            autoComplete="off"
                            type="file"
                            name="image1"
                            onChange={uploadImage1Handler}
                            className="admin-modal-form-input admin-form-div-input"
                        ></input>
                        {/* <input autoComplete="off" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg" className="admin-uploads-input" type="text" name="partnerContentImage" value={partnerContentImage} onChange={(e) => setPartnerContentImage(e.target.value)}></input> */}
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%" }}>
                        <label className="admin-uploads-label">Partner Content Info</label>
                        <textarea className="admin-uploads-textarea" type="text" name="partnerContentInfo" value={partnerContentInfo} onChange={(e) => setPartnerContentInfo(e.target.value)}></textarea>
                    </div>
                    <Button type='submit' className="admin-uploads-submit">Submit</Button>
                </form>
            </Modal.Body>
        </Modal>

        <div className="main">
            <div className="d-flex">
                <UploadSidebar value="Partner"></UploadSidebar>
                <div className="admin-content">
                    {loading ? <div></div> :
                        error ? <div>{error.message}</div> :
                            <>
                                {!partner._id ? <div>
                                    <div className="admin-header">
                                        <div className="admin-header-text" style={{ marginLeft: "1rem" }}>Partner Data</div>
                                        <div className="d-flex align-items-center">
                                            <Button onClick={saveChanges} className="admin-header-button">Create Partner</Button>
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
                                        <div className="admin-header-text" style={{ marginLeft: "1rem" }}>Partner Data</div>
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
                                        <div className="admin-header-text" style={{ marginLeft: "1rem" }}>Partner Data</div>
                                        <div className="d-flex align-items-center">
                                            <Button onClick={() => setPartnerContentModalVisible(true)} className="admin-header-button">Add Partner Content</Button>
                                            <Button onClick={() => openModal(partner)} className="admin-header-button">Edit Partner</Button>
                                        </div>
                                    </div>
                                    <table style={{ marginTop: "2rem" }} className="table table-striped table-bordered">
                                        <thead style={{ fontSize: "1.8rem" }}>
                                            <tr>
                                                <th>Partner Content ID</th>
                                                <th>Name</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {partner.partnerContent.map((content, index) => (
                                                <tr key={content._id}>
                                                    <td>{Number(index) + 1}</td>
                                                    <td>{content.name}</td>
                                                    <td className="d-flex">
                                                        <Button onClick={() => openPartnerContentEditModal(content)} className="admin-table-button">Edit</Button>
                                                        <Button onClick={() => confirmModalHandler(content)} className="admin-table-button">Delete</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <form className="admin-form">
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Top Image</label>
                                            <div className="admin-form-div-input">{partner.topImage}</div>
                                        </div>
                                    </form>
                                </div>}
                            </>}
                </div>
            </div>
        </div>
    </div>
}

export default UploadPartnerScreen;