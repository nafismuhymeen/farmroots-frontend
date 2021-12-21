import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FiX, FiXCircle } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { createCarousel, deleteCarousel, editCarousel, listEmployeeCarousel } from '../../actions/productCarouselActions';
import Header from '../../components/Header';
import UploadSidebar from '../../components/UploadSidebar';
import axios from 'axios';

function UploadProductCarouselScreen (props) {

    const [carouselModalVisible, setCarouselModalVisible] = useState(false);
    const [productId, setProductId] = useState('');
    const [image, setImage] = useState('');
    const [position, setPosition] = useState('');
    const [id, setId] = useState('');
    const [edit, setEdit] = useState(false);

    const [confirmModalVisible, setConfirmModalVisible] = useState(false);

    const dispatch = useDispatch();

    const carouselList = useSelector(state =>state.carouselList);
    const {loading, carousels, error} = carouselList;

    const carouselCreate = useSelector(state => state.carouselCreate);
    const {success: successCreate} = carouselCreate;

    const carouselEdit = useSelector(state => state.carouselEdit);
    const {success: successEdit} = carouselEdit;

    const carouselDelete = useSelector(state => state.carouselDelete);
    const {success: successDelete} = carouselDelete;

    useEffect (() => {
        if(successCreate || successEdit)
        {
            setCarouselModalVisible(false);
        }
        dispatch(listEmployeeCarousel());
        return () => {
            //
        };
    }, [successCreate, successEdit, successDelete]);

    const openCreateModal = () => {
        setProductId('');
        setPosition('');
        setEdit(false);
        setCarouselModalVisible(true);
    }

    const openEditModal = (carousel) => {
        setProductId(carousel.productId);
        setPosition(carousel.position);
        setImage(carousel.image);
        setId(carousel._id);
        setEdit(true);
        setCarouselModalVisible(true);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(edit === false)
        {
            dispatch(createCarousel({productId, image, position}));
        }
        else
        {
            dispatch(editCarousel({_id: id, productId, image, position}))
        }
    }

    const confirmModalHandler = (carousel) => {
        setId(carousel._id);
        setConfirmModalVisible(true);
    }

    const deleteHandler = () => {
        dispatch(deleteCarousel(id));
        setConfirmModalVisible(false);
    }

    const uploadImageHandler = (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        axios.post("/api/uploads", bodyFormData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        }).then((response) => {
            setImage(response.data);
        }).catch((err) =>{
        });
    };

    return <div className="grid">
        <div className="grid-header">
            <Header></Header>
        </div>

        <Modal show={confirmModalVisible} onHide={() => setConfirmModalVisible(false)} centered dialogClassName="modal-35w">
            <Modal.Body>
                <div className="confirm-container">
                    <div className="confirm-no-icon"><FiXCircle></FiXCircle></div>
                    <div className="confirm-heading">Are you sure?</div>
                    <div className="confirm-text">Do you really want to delete this carousel? This process cannot be undone.</div>
                    <div className="confirm-buttons">
                        <Button onClick={() => setConfirmModalVisible(false)} className="confirm-no-button">No</Button>
                        <Button onClick = {deleteHandler} className="confirm-yes-button">Yes</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>

        <Modal show={carouselModalVisible} onHide={() => setCarouselModalVisible(false)} dialogClassName="modal-25w" centered>
            <Modal.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="admin-uploads-modal-heading">Enter Carousel Details</div>
                    <Button className="admin-uploads-modal-button" onClick={() => setCarouselModalVisible(false)}><FiX></FiX></Button>
                </div>
                <form className="admin-uploads-form" onSubmit={submitHandler}>
                    <div className="d-flex justify-content-between align-items-center" style={{width: "100%", marginBottom: "2rem"}}>
                        <label className="admin-uploads-label">Product Id</label>
                        <input autoComplete="off" placeholder="farmroots1" className="admin-uploads-input" type="text" name="productId" value={productId} onChange={(e) => setProductId(e.target.value)}></input>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{width: "100%", marginBottom: "2rem"}}>
                        <label className="admin-uploads-label">Image</label>
                        <input autoComplete="off" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg" className="admin-uploads-input" type="file" onChange={uploadImageHandler}></input>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{width: "100%"}}>
                        <label className="admin-uploads-label">Position</label>
                        <select className="admin-uploads-select" value={position} onChange={(e) => setPosition(e.target.value)}>
                            <option value="">Please select your option</option>
                            <option value="Left">Left</option>
                            <option value="Right">Right</option>
                        </select>
                    </div>
                    <Button type='submit' className="admin-uploads-submit">Submit</Button>
                </form>
            </Modal.Body>
        </Modal>

        <div className="main">
            <div className="d-flex">
                <UploadSidebar value="Carousel"></UploadSidebar>
                <div className="admin-content">
                    {loading ? <div></div> : 
                    error ? <div>{error.message}</div> : 
                    <>
                        <div className="d-flex justify-content-between align-items-center" style={{marginBottom: "2rem"}}>
                            <div className="admin-uploads-heading">Product Carousel</div>
                            <Button onClick={openCreateModal} className="admin-uploads-button">Create New Carousel</Button>
                        </div>
                        <table className="table table-striped table-bordered">
                            <thead style={{fontSize: "1.8rem"}}>
                                <tr>
                                    <th>ID</th>
                                    <th>Product Id</th>
                                    <th>Product Name</th>
                                    <th>Position</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carousels.map((carousel, index) => (<tr key = {carousel._id}>
                                    <td>{Number(index) + 1}</td>
                                    <td>{carousel.productId}</td>
                                    <td>{carousel.productName}</td>
                                    <td>{carousel.position}</td>
                                    <td>
                                        <Button onClick={() => openEditModal(carousel)} className="admin-table-button">Edit</Button>
                                        <Button onClick={() => confirmModalHandler(carousel)} className="admin-table-button">Delete</Button>
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

export default UploadProductCarouselScreen;