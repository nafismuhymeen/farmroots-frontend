import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createSuggestProduct } from '../actions/suggestProductActions';
import Header from '../components/Header';
import { FiCheckCircle, FiX } from "react-icons/fi";
import axios from 'axios';

function SuggestProductScreen(props) {

    const [productName, setProductName] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [productImage, setProductImage] = useState('');
    const [userName, setUserName] = useState('');
    const [userContactNo, setUserContactNo] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    const suggestProductCreate = useSelector(state => state.suggestProductCreate);
    const {success} = suggestProductCreate;

    const dispatch = useDispatch();

    useEffect (() => {
        if(success)
        {
            setProductName('');
            setProductBrand('');
            setProductImage('');
            setUserName('');
            setUserContactNo('');
            setUserEmail('');
            setAdditionalInfo('');
            setModalVisible(true);
        }
        return () => {
            //
        };
    }, [success]);

    const uploadImageHandler = (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        axios.post("/api/uploads", bodyFormData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        }).then((response) => {
            setProductImage(response.data);
        }).catch((err) =>{
            console.log(err);
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createSuggestProduct({productName, productBrand, productImage, userName, userContactNo, userEmail, additionalInfo}))
    }

    return <div className="grid">

        <div className="grid-header">
            <Header></Header>
        </div>

        <Modal show={modalVisible} onHide={() => setModalVisible(false)} dialogClassName="modal-35w" centered>
            <Modal.Body>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setModalVisible(false)} className="suggest-product-modal-button"><FiX></FiX></Button>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <div className="suggest-product-modal-icon"><FiCheckCircle></FiCheckCircle></div>
                    <div className="suggest-product-modal-heading">Thank You!</div>
                    <div className="suggest-product-modal-text">Your suggestion has been submitted successfully</div>
                    <div className="suggest-product-modal-text">We will contact you as soon as possible</div>
                </div>
            </Modal.Body>
        </Modal>

        <div className="main">
            <div className="suggest-product-div">
                <div className="suggest-product-heading">Suggest a Product</div>
                <div className="suggest-product-text">If you cannot find any product on our site, please suggest in the below box. We will source it for you specially. Your comfort and satisfaction is most important to us.</div>
                <form onSubmit={submitHandler} className="suggest-product-form">
                    <div className="suggest-product-form-input-div">
                        <label className="suggest-product-form-label">Product You Want To Suggest</label>
                        <input autoComplete="off" className="suggest-product-form-input" value={productName} type="text" name="productName" onChange={(e) => setProductName(e.target.value)}></input>
                    </div>
                    <div className="suggest-product-form-input-div">
                        <label className="suggest-product-form-label">Any Preferred Brand</label>
                        <input autoComplete="off" className="suggest-product-form-input" value={productBrand} type="text" name="productBrand" onChange={(e) => setProductBrand(e.target.value)}></input>
                    </div>
                    <div className="suggest-product-form-input-div">
                        <label className="suggest-product-form-label">Any Image of the Suggested Product</label>
                        <input autoComplete="off" className="suggest-product-form-input" type="file" onChange={uploadImageHandler}></input>
                    </div>
                    <div className="suggest-product-form-input-div">
                        <label className="suggest-product-form-label">Your Name</label>
                        <input autoComplete="off" className="suggest-product-form-input" value={userName} type="text" name="userName" onChange={(e) => setUserName(e.target.value)}></input>
                    </div>
                    <div className="suggest-product-form-input-div">
                        <label className="suggest-product-form-label">Your Contact Number</label>
                        <input autoComplete="off" className="suggest-product-form-input" value={userContactNo} type="text" name="userContactNo" onChange={(e) => setUserContactNo(e.target.value)}></input>
                    </div>
                    <div className="suggest-product-form-input-div">
                        <label className="suggest-product-form-label">Your Email Address</label>
                        <input autoComplete="off" className="suggest-product-form-input" value={userEmail} type="text" name="userEmail" onChange={(e) => setUserEmail(e.target.value)}></input>
                    </div>
                    <div className="suggest-product-form-input-div">
                        <label className="suggest-product-form-label">Additional Info</label>
                        <textarea className="suggest-product-form-textarea" value={additionalInfo} type="text" name="additionalInfo" onChange={(e) => setAdditionalInfo(e.target.value)}></textarea>
                    </div>
                    <Button type="submit" className="suggest-product-form-button">Submit</Button>
                </form>
            </div>
        </div>
    </div>
}

export default SuggestProductScreen