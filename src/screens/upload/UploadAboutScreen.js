import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FiX, FiXCircle } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import UploadSidebar from '../../components/UploadSidebar';
import axios from "axios";
import { addAboutManagementContent, createAbout, deleteAboutManagementContent, editAbout, editAboutManagementContent, getEmployeeAbout } from '../../actions/aboutActions';

function UploadAboutScreen(props) {

    const [id, setId] = useState('');
    const [uploading, setUploading] = useState(false);
    const [topImage, setTopImage] = useState('');
    const [aboutFarmrootsImage, setAboutFarmrootsImage] = useState('');
    const [aboutFarmrootsHeading, setAboutFarmrootsHeading] = useState('');
    const [aboutFarmrootsText, setAboutFarmrootsText] = useState('');
    const [visionSloganText, setVisionSloganText] = useState('');
    const [visionSloganBackgroundColor, setVisionSloganBackgroundColor] = useState('');
    const [visionSloganColor, setVisionSloganColor] = useState('');
    const [visionImage, setVisionImage] = useState('');
    const [visionHeading, setVisionHeading] = useState('');
    const [visionText, setVisionText] = useState('');
    const [managementSloganText, setManagementSloganText] = useState('');
    const [managementSloganBackgroundColor, setManagementSloganBackgroundColor] = useState('');
    const [managementSloganColor, setManagementSloganColor] = useState('');
    const [factorySloganText, setFactorySloganText] = useState('');
    const [factorySloganBackgroundColor, setFactorySloganBackgroundColor] = useState('');
    const [factorySloganColor, setFactorySloganColor] = useState('');
    const [factoryBeforeVideoImage, setFactoryBeforeVideoImage] = useState('');
    const [factoryBeforeVideoHeading, setFactoryBeforeVideoHeading] = useState('');
    const [factoryBeforeVideoText, setFactoryBeforeVideoText] = useState('');
    const [factoryAfterVideoImage, setFactoryAfterVideoImage] = useState('');
    const [factoryAfterVideoHeading, setFactoryAfterVideoHeading] = useState('');
    const [factoryAfterVideoText, setFactoryAfterVideoText] = useState('');
    const [factoryVideo, setFactoryVideo] = useState('');

    const [managementName, setManagementName] = useState('');
    const [managementPosition, setManagementPosition] = useState('');
    const [managementImage, setManagementImage] = useState('');
    const [managementInfo, setManagementInfo] = useState('');
    const [managementModalVisible, setManagementModalVisible] = useState(false);
    const [managementId, setManagementId] = useState('');
    const [managementEdit, setManagementEdit] = useState(false);

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [edit, setEdit] = useState(false);

    const [confirmModalVisible, setConfirmModalVisible] = useState(false);

    const dispatch = useDispatch();

    const aboutEmployeeGet = useSelector(state => state.aboutEmployeeGet);
    const { loading, about, error } = aboutEmployeeGet;

    const aboutCreate = useSelector(state => state.aboutCreate);
    const { success: successCreate } = aboutCreate;

    const aboutEdit = useSelector(state => state.aboutEdit);
    const { success: successEdit } = aboutEdit;

    const aboutManagementContentAdd = useSelector(state => state.aboutManagementContentAdd);
    const { success: successAddManagementContent } = aboutManagementContentAdd;

    const aboutManagementContentEdit = useSelector(state => state.aboutManagementContentEdit);
    const { success: successEditManagementContent } = aboutManagementContentEdit;

    const aboutManagementContentDelete = useSelector(state => state.aboutManagementContentDelete);
    const { success: successDeleteManagementContent } = aboutManagementContentDelete;

    useEffect(() => {
        dispatch(getEmployeeAbout());
        if (successEdit) {
            setEditModalVisible(false);
        }
        if (successAddManagementContent || successEditManagementContent || successDeleteManagementContent) {
            setManagementModalVisible(false);
            setManagementEdit(false);
            setManagementId('');
            setManagementImage('');
            setManagementInfo('');
            setManagementName('');
            setManagementPosition('');
        }
        return () => {
            //
        };
    }, [successCreate, successEdit, successAddManagementContent, successEditManagementContent, successDeleteManagementContent]);

    const saveChanges = () => {

        if (edit) {
            dispatch(editAbout({
                _id: id, topImage, aboutFarmrootsImage, aboutFarmrootsHeading, aboutFarmrootsText, visionSloganText,
                visionSloganBackgroundColor, visionSloganColor, visionImage, visionHeading, visionText, managementSloganText,
                managementSloganBackgroundColor, managementSloganColor, factorySloganText, factorySloganBackgroundColor,
                factorySloganColor, factoryBeforeVideoImage, factoryBeforeVideoHeading, factoryBeforeVideoText,
                factoryAfterVideoImage, factoryAfterVideoHeading, factoryAfterVideoText, factoryVideo
            }));
        }
        else {
            dispatch(createAbout({
                topImage, aboutFarmrootsImage, aboutFarmrootsHeading, aboutFarmrootsText, visionSloganText,
                visionSloganBackgroundColor, visionSloganColor, visionImage, visionHeading, visionText, managementSloganText,
                managementSloganBackgroundColor, managementSloganColor, factorySloganText, factorySloganBackgroundColor,
                factorySloganColor, factoryBeforeVideoImage, factoryBeforeVideoHeading, factoryBeforeVideoText,
                factoryAfterVideoImage, factoryAfterVideoHeading, factoryAfterVideoText, factoryVideo
            }));
        }
    }

    const openModal = (about) => {
        if (about._id) {
            setId(about._id);
            setTopImage(about.topImage);
            setAboutFarmrootsImage(about.aboutFarmrootsImage);
            setAboutFarmrootsHeading(about.aboutFarmrootsHeading);
            setAboutFarmrootsText(about.aboutFarmrootsText);
            setVisionSloganText(about.visionSloganText);
            setVisionSloganBackgroundColor(about.visionSloganBackgroundColor);
            setVisionSloganColor(about.visionSloganColor);
            setVisionImage(about.visionImage);
            setVisionHeading(about.visionHeading);
            setVisionText(about.visionText);
            setManagementSloganText(about.managementSloganText);
            setManagementSloganBackgroundColor(about.managementSloganBackgroundColor);
            setManagementSloganColor(about.managementSloganColor);
            setFactorySloganText(about.factorySloganText);
            setFactorySloganBackgroundColor(about.factorySloganBackgroundColor);
            setFactorySloganColor(about.factorySloganColor);
            setFactoryBeforeVideoImage(about.factoryBeforeVideoImage);
            setFactoryBeforeVideoHeading(about.factoryBeforeVideoHeading);
            setFactoryBeforeVideoText(about.factoryBeforeVideoText);
            setFactoryAfterVideoImage(about.factoryAfterVideoImage);
            setFactoryAfterVideoHeading(about.factoryAfterVideoHeading);
            setFactoryAfterVideoText(about.factoryAfterVideoText);
            setFactoryVideo(about.factoryVideo);
            setEdit(true);
            setEditModalVisible(true);
        }
    }

    const openManagementEditModal = (management) => {
        setManagementName(management.name);
        setManagementId(management._id);
        setManagementImage(management.image);
        setManagementPosition(management.position);
        setManagementInfo(management.info);
        setManagementEdit(true);
        setManagementModalVisible(true);
    }

    const confirmModalHandler = (management) => {
        setManagementId(management._id);
        setConfirmModalVisible(true);
    }

    const deleteHandler = () => {
        dispatch(deleteAboutManagementContent({ id: managementId }));
        setConfirmModalVisible(false);
    }
    const uploadImage1Handler = (e) => {
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
    const uploadImage2Handler = (e) => {
        const file = e.target.files[0];
        setUploading(true);
        setAboutFarmrootsImage(file.name);
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

    const uploadImage3Handler = (e) => {
        const file = e.target.files[0];
        setUploading(true);
        setVisionImage(file.name);
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
    const uploadImage4Handler = (e) => {
        const file = e.target.files[0];
        setUploading(true);
        setFactoryBeforeVideoImage(file.name);
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

    const uploadImage5Handler = (e) => {
        const file = e.target.files[0];
        setUploading(true);
        setFactoryAfterVideoImage(file.name);
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
    const uploadImage6Handler = (e) => {
        const file = e.target.files[0];
        setUploading(true);
        setFactoryVideo(file.name);
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
    const uploadImage7Handler = (e) => {
        const file = e.target.files[0];
        setUploading(true);
        setManagementImage(file.name);
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
    const managementHandler = (e) => {

        e.preventDefault();
        if (!managementEdit) {
            dispatch(addAboutManagementContent({
                name: managementName,
                position: managementPosition,
                image: managementImage,
                info: managementInfo
            }));
        }
        else {
            dispatch(editAboutManagementContent({
                id: managementId,
                name: managementName,
                position: managementPosition,
                image: managementImage,
                info: managementInfo
            }));
        }
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
                    <div className="confirm-text">Do you really want to delete this management? This process cannot be undone.</div>
                    <div className="confirm-buttons">
                        <Button onClick={() => setConfirmModalVisible(false)} className="confirm-no-button">No</Button>
                        <Button onClick={deleteHandler} className="confirm-yes-button">Yes</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>

        <Modal show={managementModalVisible} onHide={() => setManagementModalVisible(false)} dialogClassName="modal-50w" centered>
            <Modal.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="admin-uploads-modal-heading">Enter Management Details</div>
                    <Button className="admin-uploads-modal-button" onClick={() => setManagementModalVisible(false)}><FiX></FiX></Button>
                </div>
                <form className="admin-uploads-form" onSubmit={managementHandler}>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", marginBottom: "2rem" }}>
                        <label className="admin-uploads-label">Management Name</label>
                        <input autoComplete="off" placeholder="Eg. Shahrear" className="admin-uploads-input" type="text" name="managementName" value={managementName} onChange={(e) => setManagementName(e.target.value)}></input>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", marginBottom: "2rem" }}>
                        <label className="admin-uploads-label">Management Position</label>
                        <input autoComplete="off" placeholder="Eg. Managing Director" className="admin-uploads-input" type="text" name="managementPosition" value={managementPosition} onChange={(e) => setManagementPosition(e.target.value)}></input>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", marginBottom: "2rem" }}>
                        <label className="admin-uploads-label">Management Image</label>
                        <input
                            autoComplete="off"
                            type="file"
                            name="image1"
                            onChange={uploadImage7Handler}
                            className="admin-modal-form-input admin-form-div-input"
                        ></input>
                        {/* <input autoComplete="off" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg" className="admin-uploads-input" type="text" name="managementImage" value={managementImage} onChange={(e) => setManagementImage(e.target.value)}></input> */}
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%" }}>
                        <label className="admin-uploads-label">Management Info</label>
                        <textarea className="admin-uploads-textarea" type="text" name="managementInfo" value={managementInfo} onChange={(e) => setManagementInfo(e.target.value)}></textarea>
                    </div>
                    <Button type='submit' className="admin-uploads-submit">Submit</Button>
                </form>
            </Modal.Body>
        </Modal>

        <div className="main">
            <div className="d-flex">
                <UploadSidebar value="About"></UploadSidebar>
                <div className="admin-content">
                    {loading ? <div></div> :
                        error ? <div>{error.message}</div> :
                            <>
                                {!about._id ? <div>
                                    <div className="admin-header">
                                        <div className="admin-header-text" style={{ marginLeft: "1rem" }}>About Data</div>
                                        <div className="d-flex align-items-center">
                                            <Button onClick={saveChanges} className="admin-header-button">Create About</Button>
                                        </div>
                                    </div>
                                    <form className="admin-form">
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Top Image</label>
                                            <input autoComplete="off" className="admin-form-input" value={topImage} onChange={(e) => setTopImage(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">About Farmroots Image</label>
                                            <input autoComplete="off" className="admin-form-input" value={aboutFarmrootsImage} onChange={(e) => setAboutFarmrootsImage(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">About Farmroots Heading</label>
                                            <input autoComplete="off" className="admin-form-input" value={aboutFarmrootsHeading} onChange={(e) => setAboutFarmrootsHeading(e.target.value)} type="text" placeholder="Eg. About Farmroots"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">About Farmroots Text</label>
                                            <textarea className="admin-form-textarea" value={aboutFarmrootsText} onChange={(e) => setAboutFarmrootsText(e.target.value)} type="text" placeholder="Eg. Farmroots was established in..."></textarea>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Vision Slogan Text</label>
                                            <input autoComplete="off" className="admin-form-input" value={visionSloganText} onChange={(e) => setVisionSloganText(e.target.value)} type="text" placeholder="Eg. Obstacles are the things we see when we take our eyes off our goals"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Vision Slogan Background Color</label>
                                            <input autoComplete="off" className="admin-form-input" value={visionSloganBackgroundColor} onChange={(e) => setVisionSloganBackgroundColor(e.target.value)} type="text" placeholder="Eg. 000000 (Color hex code)"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Vision Slogan Color</label>
                                            <input autoComplete="off" className="admin-form-input" value={visionSloganColor} onChange={(e) => setVisionSloganColor(e.target.value)} type="text" placeholder="Eg. ffffff (Color hex code)"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Vision Image</label>
                                            <input autoComplete="off" className="admin-form-input" value={visionImage} onChange={(e) => setVisionImage(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Vision Heading</label>
                                            <input autoComplete="off" className="admin-form-input" value={visionHeading} onChange={(e) => setVisionHeading(e.target.value)} type="text" placeholder="Eg. Vision"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Vision Text</label>
                                            <textarea className="admin-form-textarea" value={visionText} onChange={(e) => setVisionText(e.target.value)} type="text" placeholder="Eg. Farmroots wants to..."></textarea>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Management Slogan Text</label>
                                            <input autoComplete="off" className="admin-form-input" value={managementSloganText} onChange={(e) => setManagementSloganText(e.target.value)} type="text" placeholder="Eg. The consistent shield to protect the team"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Management Slogan Background Color</label>
                                            <input autoComplete="off" className="admin-form-input" value={managementSloganBackgroundColor} onChange={(e) => setManagementSloganBackgroundColor(e.target.value)} type="text" placeholder="Eg. 000000 (Color hex code)"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Management Slogan Color</label>
                                            <input autoComplete="off" className="admin-form-input" value={managementSloganColor} onChange={(e) => setManagementSloganColor(e.target.value)} type="text" placeholder="Eg. ffffff (Color hex code)"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory Slogan Text</label>
                                            <input autoComplete="off" className="admin-form-input" value={factorySloganText} onChange={(e) => setFactorySloganText(e.target.value)} type="text" placeholder="Eg. Premium Quality Guaranteed"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory Slogan Background Color</label>
                                            <input autoComplete="off" className="admin-form-input" value={factorySloganBackgroundColor} onChange={(e) => setFactorySloganBackgroundColor(e.target.value)} type="text" placeholder="Eg. 000000 (Color hex code)"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory Slogan Color</label>
                                            <input autoComplete="off" className="admin-form-input" value={factorySloganColor} onChange={(e) => setFactorySloganColor(e.target.value)} type="text" placeholder="Eg. ffffff (Color hex code)"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory Before Video Image</label>
                                            <input autoComplete="off" className="admin-form-input" value={factoryBeforeVideoImage} onChange={(e) => setFactoryBeforeVideoImage(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory Before Video Heading</label>
                                            <input autoComplete="off" className="admin-form-input" value={factoryBeforeVideoHeading} onChange={(e) => setFactoryBeforeVideoHeading(e.target.value)} type="text" placeholder="Eg. Farmroots Machines"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory Before Video Text</label>
                                            <textarea className="admin-form-textarea" value={factoryBeforeVideoText} onChange={(e) => setFactoryBeforeVideoText(e.target.value)} type="text" placeholder="Eg. At Farmroots we manufacture..."></textarea>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory After Video Image</label>
                                            <input autoComplete="off" className="admin-form-input" value={factoryAfterVideoImage} onChange={(e) => setFactoryAfterVideoImage(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory After Video Heading</label>
                                            <input autoComplete="off" className="admin-form-input" value={factoryAfterVideoHeading} onChange={(e) => setFactoryAfterVideoHeading(e.target.value)} type="text" placeholder="Eg. Farmroots Machines"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory After Video Text</label>
                                            <textarea className="admin-form-textarea" value={factoryAfterVideoText} onChange={(e) => setFactoryAfterVideoText(e.target.value)} type="text" placeholder="Eg. At Farmroots we manufacture..."></textarea>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory Video</label>
                                            <input autoComplete="off" className="admin-form-input" value={factoryVideo} onChange={(e) => setFactoryVideo(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.mp4"></input>
                                        </div>
                                    </form>
                                </div> : editModalVisible ? <div>
                                    <div className="admin-header">
                                        <div className="admin-header-text" style={{ marginLeft: "1rem" }}>About Data</div>
                                        <div className="d-flex align-items-center">
                                            <Button onClick={saveChanges} className="admin-header-button">Save Changes</Button>
                                        </div>
                                    </div>
                                    <form className="admin-form">
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Top Image</label>
                                            {/* <input autoComplete="off" className="admin-form-input" value={topImage} onChange={(e) => setTopImage(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input> */}
                                            <input
                                                autoComplete="off"
                                                type="file"
                                                name="image1"
                                                onChange={uploadImage1Handler}
                                                className="admin-modal-form-input admin-form-div-input"
                                            ></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">About Farmroots Image</label>
                                            <input
                                                autoComplete="off"
                                                type="file"
                                                name="image1"
                                                onChange={uploadImage2Handler}
                                                className="admin-modal-form-input admin-form-div-input"
                                            ></input>
                                            {/* <input autoComplete="off" className="admin-form-input" value={aboutFarmrootsImage} onChange={(e) => setAboutFarmrootsImage(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input> */}
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">About Farmroots Heading</label>
                                            <input autoComplete="off" className="admin-form-input" value={aboutFarmrootsHeading} onChange={(e) => setAboutFarmrootsHeading(e.target.value)} type="text" placeholder="Eg. About Farmroots"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">About Farmroots Text</label>
                                            <textarea className="admin-form-textarea" value={aboutFarmrootsText} onChange={(e) => setAboutFarmrootsText(e.target.value)} type="text" placeholder="Eg. Farmroots was established in..."></textarea>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Vision Slogan Text</label>
                                            <input autoComplete="off" className="admin-form-input" value={visionSloganText} onChange={(e) => setVisionSloganText(e.target.value)} type="text" placeholder="Eg. Obstacles are the things we see when we take our eyes off our goals"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Vision Slogan Background Color</label>
                                            <input autoComplete="off" className="admin-form-input" value={visionSloganBackgroundColor} onChange={(e) => setVisionSloganBackgroundColor(e.target.value)} type="text" placeholder="Eg. 000000 (Color hex code)"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Vision Slogan Color</label>
                                            <input autoComplete="off" className="admin-form-input" value={visionSloganColor} onChange={(e) => setVisionSloganColor(e.target.value)} type="text" placeholder="Eg. ffffff (Color hex code)"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Vision Image</label>
                                            <input
                                                autoComplete="off"
                                                type="file"
                                                name="image1"
                                                onChange={uploadImage3Handler}
                                                className="admin-modal-form-input admin-form-div-input"
                                            ></input>
                                            {/* <input autoComplete="off" className="admin-form-input" value={visionImage} onChange={(e) => setVisionImage(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input> */}
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Vision Heading</label>
                                            <input autoComplete="off" className="admin-form-input" value={visionHeading} onChange={(e) => setVisionHeading(e.target.value)} type="text" placeholder="Eg. Vision"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Vision Text</label>
                                            <textarea className="admin-form-textarea" value={visionText} onChange={(e) => setVisionText(e.target.value)} type="text" placeholder="Eg. Farmroots wants to..."></textarea>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Management Slogan Text</label>
                                            <input autoComplete="off" className="admin-form-input" value={managementSloganText} onChange={(e) => setManagementSloganText(e.target.value)} type="text" placeholder="Eg. The consistent shield to protect the team"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Management Slogan Background Color</label>
                                            <input autoComplete="off" className="admin-form-input" value={managementSloganBackgroundColor} onChange={(e) => setManagementSloganBackgroundColor(e.target.value)} type="text" placeholder="Eg. 000000 (Color hex code)"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Management Slogan Color</label>
                                            <input autoComplete="off" className="admin-form-input" value={managementSloganColor} onChange={(e) => setManagementSloganColor(e.target.value)} type="text" placeholder="Eg. ffffff (Color hex code)"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory Slogan Text</label>
                                            <input autoComplete="off" className="admin-form-input" value={factorySloganText} onChange={(e) => setFactorySloganText(e.target.value)} type="text" placeholder="Eg. Premium Quality Guaranteed"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory Slogan Background Color</label>
                                            <input autoComplete="off" className="admin-form-input" value={factorySloganBackgroundColor} onChange={(e) => setFactorySloganBackgroundColor(e.target.value)} type="text" placeholder="Eg. 000000 (Color hex code)"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory Slogan Color</label>
                                            <input autoComplete="off" className="admin-form-input" value={factorySloganColor} onChange={(e) => setFactorySloganColor(e.target.value)} type="text" placeholder="Eg. ffffff (Color hex code)"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory Before Video Image</label>
                                            <input
                                                autoComplete="off"
                                                type="file"
                                                name="image1"
                                                onChange={uploadImage4Handler}
                                                className="admin-modal-form-input admin-form-div-input"
                                            ></input>
                                            {/* <input autoComplete="off" className="admin-form-input" value={factoryBeforeVideoImage} onChange={(e) => setFactoryBeforeVideoImage(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input> */}
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory Before Video Heading</label>
                                            <input autoComplete="off" className="admin-form-input" value={factoryBeforeVideoHeading} onChange={(e) => setFactoryBeforeVideoHeading(e.target.value)} type="text" placeholder="Eg. Farmroots Machines"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory Before Video Text</label>
                                            <textarea className="admin-form-textarea" value={factoryBeforeVideoText} onChange={(e) => setFactoryBeforeVideoText(e.target.value)} type="text" placeholder="Eg. At Farmroots we manufacture..."></textarea>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory After Video Image</label>
                                            <input
                                                autoComplete="off"
                                                type="file"
                                                name="image1"
                                                onChange={uploadImage5Handler}
                                                className="admin-modal-form-input admin-form-div-input"
                                            ></input>
                                            {/* <input autoComplete="off" className="admin-form-input" value={factoryAfterVideoImage} onChange={(e) => setFactoryAfterVideoImage(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input> */}
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory After Video Heading</label>
                                            <input autoComplete="off" className="admin-form-input" value={factoryAfterVideoHeading} onChange={(e) => setFactoryAfterVideoHeading(e.target.value)} type="text" placeholder="Eg. Farmroots Machines"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory After Video Text</label>
                                            <textarea className="admin-form-textarea" value={factoryAfterVideoText} onChange={(e) => setFactoryAfterVideoText(e.target.value)} type="text" placeholder="Eg. At Farmroots we manufacture..."></textarea>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory Video</label>
                                            <input
                                                autoComplete="off"
                                                type="file"
                                                name="image1"
                                                onChange={uploadImage6Handler}
                                                className="admin-modal-form-input admin-form-div-input"
                                            ></input>
                                            {/* <input autoComplete="off" className="admin-form-input" value={factoryVideo} onChange={(e) => setFactoryVideo(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.mp4"></input> */}
                                        </div>
                                    </form>
                                </div> : <div>
                                    <div className="admin-header">
                                        <div className="admin-header-text" style={{ marginLeft: "1rem" }}>About Data</div>
                                        <div className="d-flex align-items-center">
                                            <Button onClick={() => setManagementModalVisible(true)} className="admin-header-button">Add Management Content</Button>
                                            <Button onClick={() => openModal(about)} className="admin-header-button">Edit About</Button>
                                        </div>
                                    </div>
                                    <table style={{ marginTop: "2rem" }} className="table table-striped table-bordered">
                                        <thead style={{ fontSize: "1.8rem" }}>
                                            <tr>
                                                <th>Management ID</th>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {about.managementContent.map((management, index) => (
                                                <tr key={management._id}>
                                                    <td>{Number(index) + 1}</td>
                                                    <td>{management.name}</td>
                                                    <td>{management.position}</td>
                                                    <td className="d-flex">
                                                        <Button onClick={() => openManagementEditModal(management)} className="admin-table-button">Edit</Button>
                                                        <Button onClick={() => confirmModalHandler(management)} className="admin-table-button">Delete</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <form className="admin-form">
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Top Image</label>
                                            <div className="admin-form-div-input">{about.topImage}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">About Farmroots Image</label>
                                            <div className="admin-form-div-input">{about.aboutFarmrootsImage}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">About Farmroots Heading</label>
                                            <div className="admin-form-div-input">{about.aboutFarmrootsHeading}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">About Farmroots Text</label>
                                            <div className="admin-form-textarea">{about.aboutFarmrootsText}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Vision Slogan Text</label>
                                            <div className="admin-form-div-input">{about.visionSloganText}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Vision Slogan Background Color</label>
                                            <div className="admin-form-div-input">{about.visionSloganBackgroundColor}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Vision Slogan Color</label>
                                            <div className="admin-form-div-input">{about.visionSloganColor}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Vision Image</label>
                                            <div className="admin-form-div-input">{about.visionImage}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Vision Heading</label>
                                            <div className="admin-form-div-input">{about.visionHeading}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Vision Text</label>
                                            <div className="admin-form-textarea">{about.visionText}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Management Slogan Text</label>
                                            <div className="admin-form-div-input">{about.managementSloganText}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Management Slogan Background Color</label>
                                            <div className="admin-form-div-input">{about.managementSloganBackgroundColor}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Management Slogan Color</label>
                                            <div className="admin-form-div-input">{about.managementSloganColor}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory Slogan Text</label>
                                            <div className="admin-form-div-input">{about.factorySloganText}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory Slogan Background Color</label>
                                            <div className="admin-form-div-input">{about.factorySloganBackgroundColor}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory Slogan Color</label>
                                            <div className="admin-form-div-input">{about.factorySloganColor}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory Before Video Image</label>
                                            <div className="admin-form-div-input">{about.factoryBeforeVideoImage}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory Before Video Heading</label>
                                            <div className="admin-form-div-input">{about.factoryBeforeVideoHeading}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory Before Video Text</label>
                                            <div className="admin-form-textarea">{about.factoryBeforeVideoText}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory After Video Image</label>
                                            <div className="admin-form-div-input">{about.factoryAfterVideoImage}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory After Video Heading</label>
                                            <div className="admin-form-div-input">{about.factoryAfterVideoHeading}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory After Video Text</label>
                                            <div className="admin-form-textarea">{about.factoryAfterVideoText}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Factory Video</label>
                                            <div className="admin-form-div-input">{about.factoryVideo}</div>
                                        </div>
                                    </form>
                                </div>}
                            </>}
                </div>
            </div>
        </div>
    </div>
}

export default UploadAboutScreen;