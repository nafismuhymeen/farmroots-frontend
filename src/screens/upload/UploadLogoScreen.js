import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import UploadSidebar from '../../components/UploadSidebar';
import { createLogo, editLogo, getEmployeeLogo } from '../../actions/logoActions';
import axios from "axios";


function UploadLogoScreen(props) {

    const [id, setId] = useState('');
    const [farmrootsLogo, setFarmrootsLogo] = useState('');
    const [farmrootsWhiteLogo, setFarmrootsWhiteLogo] = useState('');
    const [emptyCart, setEmptyCart] = useState('');
    const [vegIcon, setVegIcon] = useState('');
    const [nonVegIcon, setNonVegIcon] = useState('');
    const [productBackground, setProductBackground] = useState('');
    const [uploading, setUploading] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [edit, setEdit] = useState(false);

    const dispatch = useDispatch();

    const logoGet = useSelector(state => state.logoGet);
    const { loading, logo, error } = logoGet;

    const logoCreate = useSelector(state => state.logoCreate);
    const { success: successCreate } = logoCreate;

    const logoEdit = useSelector(state => state.logoEdit);
    const { success: successEdit } = logoEdit;
    useEffect(() => {
        dispatch(getEmployeeLogo());
        if (successEdit) {
            setEditModalVisible(false);
        }
        return () => {
            //
        };
    }, [successCreate, successEdit]);

    const saveChanges = () => {

        if (edit) {
            dispatch(editLogo({ _id: id, farmrootsLogo, farmrootsWhiteLogo, emptyCart, vegIcon, nonVegIcon, productBackground }));
        }
        else {
            dispatch(createLogo({ farmrootsLogo, farmrootsWhiteLogo, emptyCart, vegIcon, nonVegIcon, productBackground }));
        }
        window.location.reload();
    }

    const openModal = (logo) => {
        if (logo._id) {

            setId(logo._id);
            setFarmrootsLogo(logo.farmrootsLogo);
            setFarmrootsWhiteLogo(logo.farmrootsWhiteLogo);
            setEmptyCart(logo.emptyCart);
            setVegIcon(logo.vegIcon);
            setNonVegIcon(logo.nonVegIcon);
            setProductBackground(logo.productBackground);
            setEdit(true);
            setEditModalVisible(true);
        }
    }



    const uploadImage1Handler = (e) => {
        const file = e.target.files[0];
        setUploading(true);
        setFarmrootsLogo(file.name);
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
        setFarmrootsWhiteLogo(file.name);
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
        setEmptyCart(file.name);
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
        setVegIcon(file.name);
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
        setNonVegIcon(file.name);
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
        setProductBackground(file.name);
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

    return <div className="grid">
        <div className="grid-header">
            <Header></Header>
        </div>
        <div className="main">
            <div className="d-flex">
                <UploadSidebar value="Logo"></UploadSidebar>
                <div className="admin-content">
                    {loading ? <div></div> :
                        error ? <div>{error.message}</div> :
                            <>
                                {!logo._id ? <div>
                                    <div className="admin-header">
                                        <div className="admin-header-text" style={{ marginLeft: "1rem" }}>Logo Data</div>
                                        <div className="d-flex align-items-center">
                                            <Button onClick={saveChanges} className="admin-header-button">Create Logo</Button>
                                        </div>
                                    </div>
                                    <form className="admin-form">
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Farmroots Logo</label>
                                            <input autoComplete="off" className="admin-form-input" value={farmrootsLogo} onChange={(e) => setFarmrootsLogo(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Farmroots White Logo</label>
                                            <input autoComplete="off" className="admin-form-input" value={farmrootsWhiteLogo} onChange={(e) => setFarmrootsWhiteLogo(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Empty Cart Image</label>
                                            <input autoComplete="off" className="admin-form-input" value={emptyCart} onChange={(e) => setEmptyCart(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Veg Icon</label>
                                            <input autoComplete="off" className="admin-form-input" value={vegIcon} onChange={(e) => setVegIcon(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Non Veg Icon</label>
                                            <input autoComplete="off" className="admin-form-input" value={nonVegIcon} onChange={(e) => setNonVegIcon(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Product Background Image</label>
                                            <input autoComplete="off" className="admin-form-input" value={productBackground} onChange={(e) => setProductBackground(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input>
                                        </div>
                                    </form>
                                </div> : editModalVisible ? <div>
                                    <div className="admin-header">
                                        <div className="admin-header-text" style={{ marginLeft: "1rem" }}>Logo Data</div>
                                        <div className="d-flex align-items-center">
                                            <Button onClick={saveChanges} className="admin-header-button">Save Changes</Button>
                                        </div>
                                    </div>
                                    <form className="admin-form">
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Farmroots Logo</label>
                                            {/* <input autoComplete="off" className="admin-form-iput" value={farmrootsLogo} onChange={(e) => setFarmrootsLogo(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg">

                                            </input> */}

                                            <input
                                                autoComplete="off"
                                                type="file"
                                                name="image1"
                                                onChange={uploadImage1Handler}
                                                className="admin-modal-form-input admin-form-div-input"
                                            ></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Farmroots White Logo</label>
                                            {/* <input autoComplete="off" className="admin-form-input" value={farmrootsWhiteLogo} onChange={(e) => setFarmrootsWhiteLogo(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input>
                                             */}
                                            <input
                                                autoComplete="off"
                                                type="file"
                                                name="image1"
                                                onChange={uploadImage2Handler}
                                                className="admin-modal-form-input admin-form-div-input"
                                            ></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Empty Cart Image</label>
                                            {/* <input autoComplete="off" className="admin-form-input" value={emptyCart} onChange={(e) => setEmptyCart(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input> */}
                                            <input
                                                autoComplete="off"
                                                type="file"
                                                name="image1"
                                                onChange={uploadImage3Handler}
                                                className="admin-modal-form-input admin-form-div-input"
                                            ></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Veg Icon</label>
                                            {/* <input autoComplete="off" className="admin-form-input" value={vegIcon} onChange={(e) => setVegIcon(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input> */}
                                            <input
                                                autoComplete="off"
                                                type="file"
                                                name="image1"
                                                onChange={uploadImage4Handler}
                                                className="admin-modal-form-input admin-form-div-input"
                                            ></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Non Veg Icon</label>
                                            {/* <input autoComplete="off" className="admin-form-input" value={nonVegIcon} onChange={(e) => setNonVegIcon(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input> */}
                                            <input
                                                autoComplete="off"
                                                type="file"
                                                name="image1"
                                                onChange={uploadImage5Handler}
                                                className="admin-modal-form-input admin-form-div-input"
                                            ></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Product Background Image</label>
                                            {/* <input autoComplete="off" className="admin-form-input" value={productBackground} onChange={(e) => setProductBackground(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input> */}
                                            <input
                                                autoComplete="off"
                                                type="file"
                                                name="image1"
                                                onChange={uploadImage6Handler}
                                                className="admin-modal-form-input admin-form-div-input"
                                            ></input>
                                        </div>
                                    </form>
                                </div> : <div>
                                    <div className="admin-header">
                                        <div className="admin-header-text" style={{ marginLeft: "1rem" }}>Logo Data</div>
                                        <div className="d-flex align-items-center">
                                            <Button onClick={() => openModal(logo)} className="admin-header-button">Edit Logo</Button>
                                        </div>
                                    </div>
                                    <form className="admin-form">
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Farmroots Logo</label>
                                            <div className="admin-form-div-input">
                                                {logo.farmrootsLogo}
                                            </div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Farmroots White Logo</label>
                                            <div className="admin-form-div-input">{logo.farmrootsWhiteLogo}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Empty Cart Image</label>
                                            <div className="admin-form-div-input">{logo.emptyCart}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Veg Icon</label>
                                            <div className="admin-form-div-input">{logo.vegIcon}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Non Veg Icon</label>
                                            <div className="admin-form-div-input">{logo.nonVegIcon}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Product Background Image</label>
                                            <div className="admin-form-div-input">{logo.productBackground}</div>
                                        </div>
                                    </form>
                                </div>}
                            </>}
                </div>
            </div>
        </div>
    </div>
}

export default UploadLogoScreen;