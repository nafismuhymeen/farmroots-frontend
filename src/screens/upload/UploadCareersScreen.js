import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FiX, FiXCircle } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import axios from "axios";
import UploadSidebar from '../../components/UploadSidebar';
import {
    createCareers, editCareers, getEmployeeCareers, addCareersJobOpeningsContent, editCareersJobOpeningsContent,
    deleteCareersJobOpeningsContent, addCareersArticlesContent, editCareersArticlesContent, deleteCareersArticlesContent
} from '../../actions/careersActions';

function UploadCareersScreen(props) {

    const [id, setId] = useState('');
    const [topImage, setTopImage] = useState('');
    const [lifeAtFarmrootsImage, setLifeAtFarmrootsImage] = useState('');
    const [lifeAtFarmrootsHeading, setLifeAtFarmrootsHeading] = useState('');
    const [lifeAtFarmrootsText, setLifeAtFarmrootsText] = useState('');
    const [jobOpeningsHeading, setJobOpeningsHeading] = useState('');
    const [jobOpeningsEmail, setJobOpeningsEmail] = useState('');
    const [jobOpeningsSloganText, setJobOpeningsSloganText] = useState('');
    const [jobOpeningsSloganBackgroundColor, setJobOpeningsSloganBackgroundColor] = useState('');
    const [jobOpeningsSloganColor, setJobOpeningsSloganColor] = useState('');
    const [articlesSloganText, setArticlesSloganText] = useState('');
    const [articlesSloganBackgroundColor, setArticlesSloganBackgroundColor] = useState('');
    const [articlesSloganColor, setArticlesSloganColor] = useState('');

    const [uploading, setUploading] = useState(false);
    const [jobOpeningsTitle, setJobOpeningsTitle] = useState('');
    const [jobOpeningsLocation, setJobOpeningsLocation] = useState('');
    const [jobOpeningsJobDescription, setJobOpeningsJobDescription] = useState('');
    const [jobOpeningsSkills, setJobOpeningsSkills] = useState('');
    const [jobOpeningsRole, setJobOpeningsRole] = useState('');
    const [jobOpeningsModalVisible, setJobOpeningsModalVisible] = useState(false);
    const [jobOpeningsId, setJobOpeningsId] = useState('');
    const [jobOpeningsEdit, setJobOpeningsEdit] = useState(false);

    const [articlesName, setArticlesName] = useState('');
    const [articlesImage, setArticlesImage] = useState('');
    const [articlesInfo, setArticlesInfo] = useState('');
    const [articlesModalVisible, setArticlesModalVisible] = useState(false);
    const [articlesId, setArticlesId] = useState('');
    const [articlesEdit, setArticlesEdit] = useState(false);

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [edit, setEdit] = useState(false);

    const [confirmJobOpeningsModalVisible, setConfirmJobOpeningsModalVisible] = useState(false);
    const [confirmArticlesModalVisible, setConfirmArticlesModalVisible] = useState(false);

    const dispatch = useDispatch();

    const careersEmployeeGet = useSelector(state => state.careersEmployeeGet);
    const { loading, careers, error } = careersEmployeeGet;

    const careersCreate = useSelector(state => state.careersCreate);
    const { success: successCreate } = careersCreate;

    const careersEdit = useSelector(state => state.careersEdit);
    const { success: successEdit } = careersEdit;

    const careersJobOpeningsContentAdd = useSelector(state => state.careersJobOpeningsContentAdd);
    const { success: successAddJobOpeningsContent } = careersJobOpeningsContentAdd;

    const careersJobOpeningsContentEdit = useSelector(state => state.careersJobOpeningsContentEdit);
    const { success: successEditJobOpeningsContent } = careersJobOpeningsContentEdit;

    const careersJobOpeningsContentDelete = useSelector(state => state.careersJobOpeningsContentDelete);
    const { success: successDeleteJobOpeningsContent } = careersJobOpeningsContentDelete;

    const careersArticlesContentAdd = useSelector(state => state.careersArticlesContentAdd);
    const { success: successAddArticlesContent } = careersArticlesContentAdd;

    const careersArticlesContentEdit = useSelector(state => state.careersArticlesContentEdit);
    const { success: successEditArticlesContent } = careersArticlesContentEdit;

    const careersArticlesContentDelete = useSelector(state => state.careersArticlesContentDelete);
    const { success: successDeleteArticlesContent } = careersArticlesContentDelete;

    useEffect(() => {
        dispatch(getEmployeeCareers());
        if (successEdit) {
            setEditModalVisible(false);
        }
        if (successAddJobOpeningsContent || successEditJobOpeningsContent || successDeleteJobOpeningsContent) {
            setJobOpeningsModalVisible(false);
            setJobOpeningsEdit(false);
            setJobOpeningsId('');
            setJobOpeningsTitle('');
            setJobOpeningsLocation('');
            setJobOpeningsJobDescription('');
            setJobOpeningsRole('');
            setJobOpeningsSkills('');
        }
        if (successAddArticlesContent || successEditArticlesContent || successDeleteArticlesContent) {
            setArticlesModalVisible(false);
            setArticlesEdit(false);
            setArticlesId('');
            setArticlesImage('');
            setArticlesInfo('');
            setArticlesName('');
        }
        return () => {
            //
        };
    }, [successCreate, successEdit, successAddJobOpeningsContent, successEditJobOpeningsContent, successDeleteJobOpeningsContent
        , successAddArticlesContent, successEditArticlesContent, successDeleteArticlesContent]);

    const saveChanges = () => {

        if (edit) {
            dispatch(editCareers({
                _id: id, topImage, lifeAtFarmrootsImage, lifeAtFarmrootsHeading, lifeAtFarmrootsText, jobOpeningsHeading,
                jobOpeningsEmail, jobOpeningsSloganText, jobOpeningsSloganBackgroundColor, jobOpeningsSloganColor, articlesSloganText,
                articlesSloganBackgroundColor, articlesSloganColor
            }));
        }
        else {
            dispatch(createCareers({
                topImage, lifeAtFarmrootsImage, lifeAtFarmrootsHeading, lifeAtFarmrootsText, jobOpeningsHeading,
                jobOpeningsEmail, jobOpeningsSloganText, jobOpeningsSloganBackgroundColor, jobOpeningsSloganColor, articlesSloganText,
                articlesSloganBackgroundColor, articlesSloganColor
            }));
        }
    }

    const openModal = (careers) => {
        if (careers._id) {
            setId(careers._id);
            setTopImage(careers.topImage);
            setLifeAtFarmrootsImage(careers.lifeAtFarmrootsImage);
            setLifeAtFarmrootsHeading(careers.lifeAtFarmrootsHeading);
            setLifeAtFarmrootsText(careers.lifeAtFarmrootsText);
            setJobOpeningsHeading(careers.jobOpeningsHeading);
            setJobOpeningsEmail(careers.jobOpeningsEmail);
            setJobOpeningsSloganText(careers.jobOpeningsSloganText);
            setJobOpeningsSloganBackgroundColor(careers.jobOpeningsSloganBackgroundColor);
            setJobOpeningsSloganColor(careers.jobOpeningsSloganColor);
            setArticlesSloganText(careers.articlesSloganText);
            setArticlesSloganBackgroundColor(careers.articlesSloganBackgroundColor);
            setArticlesSloganColor(careers.articlesSloganColor);
            setEdit(true);
            setEditModalVisible(true);
        }
    }

    const openJobOpeningsEditModal = (jobOpenings) => {
        setJobOpeningsId(jobOpenings._id);
        setJobOpeningsTitle(jobOpenings.title);
        setJobOpeningsLocation(jobOpenings.location);
        setJobOpeningsJobDescription(jobOpenings.jobDescription);
        setJobOpeningsRole(jobOpenings.role.join('; '));
        setJobOpeningsSkills(jobOpenings.skills.join('; '));
        setJobOpeningsEdit(true);
        setJobOpeningsModalVisible(true);
    }

    const confirmJobOpeningsModalHandler = (jobOpenings) => {
        setJobOpeningsId(jobOpenings._id);
        setConfirmJobOpeningsModalVisible(true);
    }

    const deleteJobOpeningsHandler = () => {
        dispatch(deleteCareersJobOpeningsContent({ id: jobOpeningsId }));
        setConfirmJobOpeningsModalVisible(false);
    }

    const jobOpeningsHandler = (e) => {

        e.preventDefault();
        if (!jobOpeningsEdit) {
            dispatch(addCareersJobOpeningsContent({
                title: jobOpeningsTitle,
                location: jobOpeningsLocation,
                jobDescription: jobOpeningsJobDescription,
                role: jobOpeningsRole.split(";").map(item => item.trim()),
                skills: jobOpeningsSkills.split(";").map(item => item.trim())
            }));
        }
        else {
            dispatch(editCareersJobOpeningsContent({
                id: jobOpeningsId,
                title: jobOpeningsTitle,
                location: jobOpeningsLocation,
                jobDescription: jobOpeningsJobDescription,
                role: jobOpeningsRole.split(";").map(item => item.trim()),
                skills: jobOpeningsSkills.split(";").map(item => item.trim())
            }));
        }
    }

    const openArticlesEditModal = (articles) => {
        setArticlesName(articles.name);
        setArticlesId(articles._id);
        setArticlesImage(articles.image);
        setArticlesInfo(articles.info);
        setArticlesEdit(true);
        setArticlesModalVisible(true);
    }

    const confirmArticlesModalHandler = (articles) => {
        setArticlesId(articles._id);
        setConfirmArticlesModalVisible(true);
    }
    const uploadImage1Handler = (e) => {
        const file = e.target.files[0];
        setUploading(true);
        setLifeAtFarmrootsImage(file.name);
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
        setArticlesImage(file.name);
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
    const deleteArticlesHandler = () => {
        dispatch(deleteCareersArticlesContent({ id: articlesId }));
        setConfirmArticlesModalVisible(false);
    }

    const articlesHandler = (e) => {

        e.preventDefault();
        if (!articlesEdit) {
            dispatch(addCareersArticlesContent({
                name: articlesName,
                image: articlesImage,
                info: articlesInfo
            }));
        }
        else {
            dispatch(editCareersArticlesContent({
                id: articlesId,
                name: articlesName,
                image: articlesImage,
                info: articlesInfo
            }));
        }
    }

    return <div className="grid">

        <div className="grid-header">
            <Header></Header>
        </div>

        <Modal show={confirmJobOpeningsModalVisible} onHide={() => setConfirmJobOpeningsModalVisible(false)} centered dialogClassName="modal-35w">
            <Modal.Body>
                <div className="confirm-container">
                    <div className="confirm-no-icon"><FiXCircle></FiXCircle></div>
                    <div className="confirm-heading">Are you sure?</div>
                    <div className="confirm-text">Do you really want to delete this job? This process cannot be undone.</div>
                    <div className="confirm-buttons">
                        <Button onClick={() => setConfirmJobOpeningsModalVisible(false)} className="confirm-no-button">No</Button>
                        <Button onClick={deleteJobOpeningsHandler} className="confirm-yes-button">Yes</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>

        <Modal show={confirmArticlesModalVisible} onHide={() => setConfirmArticlesModalVisible(false)} centered dialogClassName="modal-35w">
            <Modal.Body>
                <div className="confirm-container">
                    <div className="confirm-no-icon"><FiXCircle></FiXCircle></div>
                    <div className="confirm-heading">Are you sure?</div>
                    <div className="confirm-text">Do you really want to delete this article? This process cannot be undone.</div>
                    <div className="confirm-buttons">
                        <Button onClick={() => setConfirmArticlesModalVisible(false)} className="confirm-no-button">No</Button>
                        <Button onClick={deleteArticlesHandler} className="confirm-yes-button">Yes</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>

        <Modal show={jobOpeningsModalVisible} onHide={() => setJobOpeningsModalVisible(false)} dialogClassName="modal-50w" centered>
            <Modal.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="admin-uploads-modal-heading">Enter Job Details</div>
                    <Button className="admin-uploads-modal-button" onClick={() => setJobOpeningsModalVisible(false)}><FiX></FiX></Button>
                </div>
                <form className="admin-uploads-form" onSubmit={jobOpeningsHandler}>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", marginBottom: "2rem" }}>
                        <label className="admin-uploads-label">Job Title</label>
                        <input autoComplete="off" placeholder="Accounts Manager" className="admin-uploads-input" type="text" name="jobOpeningsTitle" value={jobOpeningsTitle} onChange={(e) => setJobOpeningsTitle(e.target.value)}></input>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", marginBottom: "2rem" }}>
                        <label className="admin-uploads-label">Job Location</label>
                        <input autoComplete="off" placeholder="Narayanganj, Dhaka" className="admin-uploads-input" type="text" name="jobOpeningsLocation" value={jobOpeningsLocation} onChange={(e) => setJobOpeningsLocation(e.target.value)}></input>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", marginBottom: "2rem" }}>
                        <label className="admin-uploads-label">Job Description</label>
                        <textarea placeholder="In this job..." className="admin-uploads-textarea" type="text" name="jobOpeningsJobDescription" value={jobOpeningsJobDescription} onChange={(e) => setJobOpeningsJobDescription(e.target.value)}></textarea>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", marginBottom: "2rem" }}>
                        <label className="admin-uploads-label">Job Role</label>
                        <textarea placeholder="you will be handling accounts; you will be dealing with reporting" className="admin-uploads-textarea" type="text" name="jobOpeningsRole" value={jobOpeningsRole} onChange={(e) => setJobOpeningsRole(e.target.value)}></textarea>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%" }}>
                        <label className="admin-uploads-label">Job Skills</label>
                        <textarea placeholder="good with excel; good communication skills" className="admin-uploads-textarea" type="text" name="jobOpeningsSkills" value={jobOpeningsSkills} onChange={(e) => setJobOpeningsSkills(e.target.value)}></textarea>
                    </div>
                    <Button type='submit' className="admin-uploads-submit">Submit</Button>
                </form>
            </Modal.Body>
        </Modal>

        <Modal show={articlesModalVisible} onHide={() => setArticlesModalVisible(false)} dialogClassName="modal-50w" centered>
            <Modal.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="admin-uploads-modal-heading">Enter Article Details</div>
                    <Button className="admin-uploads-modal-button" onClick={() => setArticlesModalVisible(false)}><FiX></FiX></Button>
                </div>
                <form className="admin-uploads-form" onSubmit={articlesHandler}>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", marginBottom: "2rem" }}>
                        <label className="admin-uploads-label">Article Name</label>
                        <input autoComplete="off" placeholder="2020 Crisis" className="admin-uploads-input" type="text" name="articlesName" value={articlesName} onChange={(e) => setArticlesName(e.target.value)}></input>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", marginBottom: "2rem" }}>
                        <label className="admin-uploads-label">Article Image</label>
                        {/* <input autoComplete="off" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg" className="admin-uploads-input" type="text" name="articlesImage" value={articlesImage} onChange={(e) => setArticlesImage(e.target.value)}></input> */}
                        <input
                            autoComplete="off"
                            type="file"
                            name="image1"
                            onChange={uploadImage4Handler}
                            className="admin-modal-form-input"
                        ></input>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%" }}>
                        <label className="admin-uploads-label">Article Info</label>
                        <textarea placeholder="Famroots provides..." className="admin-uploads-textarea" type="text" name="articlesInfo" value={articlesInfo} onChange={(e) => setArticlesInfo(e.target.value)}></textarea>
                    </div>
                    <Button type='submit' className="admin-uploads-submit">Submit</Button>
                </form>
            </Modal.Body>
        </Modal>

        <div className="main">
            <div className="d-flex">
                <UploadSidebar value="Careers"></UploadSidebar>
                <div className="admin-content">
                    {loading ? <div></div> :
                        error ? <div>{error.message}</div> :
                            <>
                                {!careers._id ? <div>
                                    <div className="admin-header">
                                        <div className="admin-header-text" style={{ marginLeft: "1rem" }}>Careers Data</div>
                                        <div className="d-flex align-items-center">
                                            <Button onClick={saveChanges} className="admin-header-button">Create Careers</Button>
                                        </div>
                                    </div>
                                    <form className="admin-form">
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Top Image</label>
                                            <input autoComplete="off" className="admin-form-input" value={topImage} onChange={(e) => setTopImage(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Life At Farmroots Image</label>
                                            <input autoComplete="off" className="admin-form-input" value={lifeAtFarmrootsImage} onChange={(e) => setLifeAtFarmrootsImage(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Life At Farmroots Heading</label>
                                            <input autoComplete="off" className="admin-form-input" value={lifeAtFarmrootsHeading} onChange={(e) => setLifeAtFarmrootsHeading(e.target.value)} type="text" placeholder="Eg. Life At Farmroots"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Life At Farmroots Text</label>
                                            <textarea className="admin-form-textarea" value={lifeAtFarmrootsText} onChange={(e) => setLifeAtFarmrootsText(e.target.value)} type="text" placeholder="Eg. Life at farmroots is..."></textarea>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Job Openings Email</label>
                                            <input autoComplete="off" className="admin-form-input" value={jobOpeningsEmail} onChange={(e) => setJobOpeningsEmail(e.target.value)} type="text" placeholder="Eg. abc@gmail.com"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Job Openings Heading</label>
                                            <input autoComplete="off" className="admin-form-input" value={jobOpeningsHeading} onChange={(e) => setJobOpeningsHeading(e.target.value)} type="text" placeholder="Eg. Job Openings"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Job Openings Slogan Text</label>
                                            <input autoComplete="off" className="admin-form-input" value={jobOpeningsSloganText} onChange={(e) => setJobOpeningsSloganText(e.target.value)} type="text" placeholder="Eg. We make work an adventure"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Job Openings Slogan Background Color</label>
                                            <input autoComplete="off" className="admin-form-input" value={jobOpeningsSloganBackgroundColor} onChange={(e) => setJobOpeningsSloganBackgroundColor(e.target.value)} type="text" placeholder="Eg. 000000 (Color hex code)"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Job Openings Slogan Color</label>
                                            <input autoComplete="off" className="admin-form-input" value={jobOpeningsSloganColor} onChange={(e) => setJobOpeningsSloganColor(e.target.value)} type="text" placeholder="Eg. ffffff (Color hex code)"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Articles Slogan Text</label>
                                            <input autoComplete="off" className="admin-form-input" value={articlesSloganText} onChange={(e) => setArticlesSloganText(e.target.value)} type="text" placeholder="Eg. Read, Lead, Achieve"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Articles Slogan Background Color</label>
                                            <input autoComplete="off" className="admin-form-input" value={articlesSloganBackgroundColor} onChange={(e) => setArticlesSloganBackgroundColor(e.target.value)} type="text" placeholder="Eg. 000000 (Color hex code)"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Articles Slogan Color</label>
                                            <input autoComplete="off" className="admin-form-input" value={articlesSloganColor} onChange={(e) => setArticlesSloganColor(e.target.value)} type="text" placeholder="Eg. ffffff (Color hex code)"></input>
                                        </div>
                                    </form>
                                </div> : editModalVisible ? <div>
                                    <div className="admin-header">
                                        <div className="admin-header-text" style={{ marginLeft: "1rem" }}>Careers Data</div>
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
                                            <label className="admin-form-label">Life At Farmroots Image</label>
                                            <input
                                                autoComplete="off"
                                                type="file"
                                                name="image1"
                                                onChange={uploadImage2Handler}
                                                className="admin-modal-form-input admin-form-div-input"
                                            ></input>
                                            {/* <input autoComplete="off" className="admin-form-input" value={lifeAtFarmrootsImage} onChange={(e) => setLifeAtFarmrootsImage(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input> */}
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Life At Farmroots Heading</label>
                                            <input autoComplete="off" className="admin-form-input" value={lifeAtFarmrootsHeading} onChange={(e) => setLifeAtFarmrootsHeading(e.target.value)} type="text" placeholder="Eg. Life At Farmroots"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Life At Farmroots Text</label>
                                            <textarea className="admin-form-textarea" value={lifeAtFarmrootsText} onChange={(e) => setLifeAtFarmrootsText(e.target.value)} type="text" placeholder="Eg. Life at farmroots is..."></textarea>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Job Openings Email</label>
                                            <input autoComplete="off" className="admin-form-input" value={jobOpeningsEmail} onChange={(e) => setJobOpeningsEmail(e.target.value)} type="text" placeholder="Eg. abc@gmail.com"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Job Openings Heading</label>
                                            <input autoComplete="off" className="admin-form-input" value={jobOpeningsHeading} onChange={(e) => setJobOpeningsHeading(e.target.value)} type="text" placeholder="Eg. Job Openings"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Job Openings Slogan Text</label>
                                            <input autoComplete="off" className="admin-form-input" value={jobOpeningsSloganText} onChange={(e) => setJobOpeningsSloganText(e.target.value)} type="text" placeholder="Eg. We make work an adventure"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Job Openings Slogan Background Color</label>
                                            <input autoComplete="off" className="admin-form-input" value={jobOpeningsSloganBackgroundColor} onChange={(e) => setJobOpeningsSloganBackgroundColor(e.target.value)} type="text" placeholder="Eg. 000000 (Color hex code)"></input>
                                            {/* <input type="color"></input> */}
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Job Openings Slogan Color</label>
                                            <input autoComplete="off" className="admin-form-input" value={jobOpeningsSloganColor} onChange={(e) => setJobOpeningsSloganColor(e.target.value)} type="text" placeholder="Eg. ffffff (Color hex code)"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Articles Slogan Text</label>
                                            <input autoComplete="off" className="admin-form-input" value={articlesSloganText} onChange={(e) => setArticlesSloganText(e.target.value)} type="text" placeholder="Eg. Read, Lead, Achieve"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Articles Slogan Background Color</label>
                                            <input autoComplete="off" className="admin-form-input" value={articlesSloganBackgroundColor} onChange={(e) => setArticlesSloganBackgroundColor(e.target.value)} type="text" placeholder="Eg. 000000 (Color hex code)"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Articles Slogan Color</label>
                                            <input autoComplete="off" className="admin-form-input" value={articlesSloganColor} onChange={(e) => setArticlesSloganColor(e.target.value)} type="text" placeholder="Eg. ffffff (Color hex code)"></input>
                                        </div>
                                    </form>
                                </div> : <div>
                                    <div className="admin-header">
                                        <div className="admin-header-text" style={{ marginLeft: "1rem" }}>Careers Data</div>
                                        <div className="d-flex align-items-center">
                                            <Button onClick={() => setArticlesModalVisible(true)} className="admin-header-button">Add Articles</Button>
                                            <Button onClick={() => setJobOpeningsModalVisible(true)} className="admin-header-button">Add Job Openings</Button>
                                            <Button onClick={() => openModal(careers)} className="admin-header-button">Edit Careers</Button>
                                        </div>
                                    </div>
                                    <table style={{ marginTop: "2rem" }} className="table table-striped table-bordered">
                                        <thead style={{ fontSize: "1.8rem" }}>
                                            <tr>
                                                <th>Job Openings ID</th>
                                                <th>Title</th>
                                                <th>Location</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {careers.jobOpeningsContent.map((jobOpenings, index) => (
                                                <tr key={jobOpenings._id}>
                                                    <td>{Number(index) + 1}</td>
                                                    <td>{jobOpenings.title}</td>
                                                    <td>{jobOpenings.location}</td>
                                                    <td className="d-flex">
                                                        <Button onClick={() => openJobOpeningsEditModal(jobOpenings)} className="admin-table-button">Edit</Button>
                                                        <Button onClick={() => confirmJobOpeningsModalHandler(jobOpenings)} className="admin-table-button">Delete</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <table style={{ marginTop: "2rem" }} className="table table-striped table-bordered">
                                        <thead style={{ fontSize: "1.8rem" }}>
                                            <tr>
                                                <th>Articles ID</th>
                                                <th>Name</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {careers.articlesContent.map((articles, index) => (
                                                <tr key={articles._id}>
                                                    <td>{Number(index) + 1}</td>
                                                    <td>{articles.name}</td>
                                                    <td className="d-flex">
                                                        <Button onClick={() => openArticlesEditModal(articles)} className="admin-table-button">Edit</Button>
                                                        <Button onClick={() => confirmArticlesModalHandler(articles)} className="admin-table-button">Delete</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <form className="admin-form">
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Top Image</label>
                                            <div className="admin-form-div-input">{careers.topImage}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Life At Farmroots Image</label>
                                            <div className="admin-form-div-input">{careers.lifeAtFarmrootsImage}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Life At Farmroots Heading</label>
                                            <div className="admin-form-div-input">{careers.lifeAtFarmrootsHeading}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Life At Farmroots Text</label>
                                            <div className="admin-form-textarea">{careers.lifeAtFarmrootsText}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Job Openings Heading</label>
                                            <div className="admin-form-div-input">{careers.jobOpeningsHeading}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Job Openings Email</label>
                                            <div className="admin-form-div-input">{careers.jobOpeningsEmail}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Job Openings Slogan Text</label>
                                            <div className="admin-form-div-input">{careers.jobOpeningsSloganText}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Job Openings Slogan Background Color</label>
                                            <div className="admin-form-div-input">{careers.jobOpeningsSloganBackgroundColor}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Job Openings Slogan Color</label>
                                            <div className="admin-form-div-input">{careers.jobOpeningsSloganColor}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Articles Slogan Text</label>
                                            <div className="admin-form-div-input">{careers.articlesSloganText}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Articles Slogan Background Color</label>
                                            <div className="admin-form-div-input">{careers.articlesSloganBackgroundColor}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Articles Slogan Color</label>
                                            <div className="admin-form-div-input">{careers.articlesSloganColor}</div>
                                        </div>
                                    </form>
                                </div>}
                            </>}
                </div>
            </div>
        </div>
    </div>
}

export default UploadCareersScreen;