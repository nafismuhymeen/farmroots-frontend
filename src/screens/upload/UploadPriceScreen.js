import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import UploadSidebar from '../../components/UploadSidebar';
import {
    createPrice, editPrice, getEmployeePrice, addDeliveryCharges, editDeliveryCharges,
    deleteDeliveryCharges, addProductDiscount, editProductDiscount,
    deleteProductDiscount, addUserDiscount, editUserDiscount,
    deleteUserDiscount
} from '../../actions/priceActions';
import { listUploadProductNames } from '../../actions/productActions';
import { FiXCircle } from "react-icons/fi";
import axios from "axios";

function UploadPriceScreen(props) {

    const [id, setId] = useState('');
    const [tax, setTax] = useState(0);
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [newUserPopupImage, setNewUserPopupImage] = useState('');
    const [newUserPopupHeading, setNewUserPopupHeading] = useState('');
    const [newUserPopupText, setNewUserPopupText] = useState('');
    const [registeredUserPopupImage, setRegisteredUserPopupImage] = useState('');
    const [registeredUserPopupHeading, setRegisteredUserPopupHeading] = useState('');
    const [registeredUserPopupText, setRegisteredUserPopupText] = useState('');
    const [uploading, setUploading] = useState(false);

    const [deliveryChargesDistrict, setDeliveryChargesDistrict] = useState('');
    const [deliveryChargesWeight, setDeliveryChargesWeight] = useState(0);
    const [deliveryChargesValue, setDeliveryChargesValue] = useState(0);
    const [deliveryChargesModalVisible, setDeliveryChargesModalVisible] = useState(false);
    const [deliveryChargesId, setDeliveryChargesId] = useState('');
    const [deliveryChargesEdit, setDeliveryChargesEdit] = useState(false);

    const [productDiscountProductId, setProductDiscountProductId] = useState('');
    const [productDiscountProductName, setProductDiscountProductName] = useState('');
    const [productDiscountType, setProductDiscountType] = useState('');
    const [productDiscountDistrict, setProductDiscountDistrict] = useState('');
    const [productDiscountValue, setProductDiscountValue] = useState(0);
    const [productDiscountModalVisible, setProductDiscountModalVisible] = useState(false);
    const [productDiscountId, setProductDiscountId] = useState('');
    const [productDiscountEdit, setProductDiscountEdit] = useState(false);

    const [userDiscountUserType, setUserDiscountUserType] = useState('');
    const [userDiscountPromoCode, setUserDiscountPromoCode] = useState('');
    const [userDiscountType, setUserDiscountType] = useState('');
    const [userDiscountValue, setUserDiscountValue] = useState(0);
    const [userDiscountCondition, setUserDiscountCondition] = useState('');
    const [userDiscountConditionValue, setUserDiscountConditionValue] = useState(0);
    const [userDiscountMax, setUserDiscountMax] = useState(0);
    const [userDiscountModalVisible, setUserDiscountModalVisible] = useState(false);
    const [userDiscountId, setUserDiscountId] = useState('');
    const [userDiscountEdit, setUserDiscountEdit] = useState(false);

    const [confirmDeliveryModalVisible, setConfirmDeliveryModalVisible] = useState(false);
    const [confirmProductModalVisible, setConfirmProductModalVisible] = useState(false);
    const [confirmUserModalVisible, setConfirmUserModalVisible] = useState(false);

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [edit, setEdit] = useState(false);

    const dispatch = useDispatch();

    const priceGet = useSelector(state => state.priceGet);
    const { loading, price, error } = priceGet;

    const priceCreate = useSelector(state => state.priceCreate);
    const { success: successCreate } = priceCreate;

    const priceEdit = useSelector(state => state.priceEdit);
    const { success: successEdit } = priceEdit;

    const priceDeliveryChargesAdd = useSelector(state => state.priceDeliveryChargesAdd);
    const { success: successAddDeliveryCharges } = priceDeliveryChargesAdd;

    const priceDeliveryChargesEdit = useSelector(state => state.priceDeliveryChargesEdit);
    const { success: successEditDeliveryCharges } = priceDeliveryChargesEdit;

    const priceDeliveryChargesDelete = useSelector(state => state.priceDeliveryChargesDelete);
    const { success: successDeleteDeliveryCharges } = priceDeliveryChargesDelete;

    const priceProductDiscountAdd = useSelector(state => state.priceProductDiscountAdd);
    const { success: successAddProductDiscount } = priceProductDiscountAdd;

    const priceProductDiscountEdit = useSelector(state => state.priceProductDiscountEdit);
    const { success: successEditProductDiscount } = priceProductDiscountEdit;

    const priceProductDiscountDelete = useSelector(state => state.priceProductDiscountDelete);
    const { success: successDeleteProductDiscount } = priceProductDiscountDelete;

    const priceUserDiscountAdd = useSelector(state => state.priceUserDiscountAdd);
    const { success: successAddUserDiscount } = priceUserDiscountAdd;

    const priceUserDiscountEdit = useSelector(state => state.priceUserDiscountEdit);
    const { success: successEditUserDiscount } = priceUserDiscountEdit;

    const priceUserDiscountDelete = useSelector(state => state.priceUserDiscountDelete);
    const { success: successDeleteUserDiscount } = priceUserDiscountDelete;

    const productUploadName = useSelector(state => state.productUploadName);
    const { loading: loadingProductUploadNames, productUploadNames, error: errorProductUploadNames } = productUploadName;

    const [priceSearchNamesCheck, setPriceSearchNamesCheck] = useState(false);
    const [priceSearchArray, setPriceSearchArray] = useState([]);

    useEffect(() => {
        dispatch(getEmployeePrice());
        if (successEdit) {
            setEditModalVisible(false);
        }
        if (successAddDeliveryCharges || successEditDeliveryCharges || successDeleteDeliveryCharges) {
            setDeliveryChargesModalVisible(false);
            setDeliveryChargesEdit(false);
            setDeliveryChargesId('');
            setDeliveryChargesDistrict('');
            setDeliveryChargesWeight('');
            setDeliveryChargesValue(0);
        }
        if (successAddProductDiscount || successEditProductDiscount || successDeleteProductDiscount) {
            setProductDiscountProductId('');
            setProductDiscountProductName('');
            setProductDiscountModalVisible(false);
            setProductDiscountEdit(false);
            setProductDiscountId('');
            setProductDiscountValue(0);
            setProductDiscountType('');
            setProductDiscountDistrict('');
        }
        if (successAddUserDiscount || successEditUserDiscount || successDeleteUserDiscount) {
            setUserDiscountModalVisible(false);
            setUserDiscountEdit(false);
            setUserDiscountId('');
            setUserDiscountUserType('');
            setUserDiscountPromoCode('');
            setUserDiscountType('');
            setUserDiscountValue(0);
            setUserDiscountCondition('');
            setUserDiscountConditionValue(0);
            setUserDiscountMax(0);
        }
        return () => {
            //
        };
    }, [successCreate, successEdit, successAddDeliveryCharges, successEditDeliveryCharges, successDeleteDeliveryCharges
        , successAddProductDiscount, successEditProductDiscount, successDeleteProductDiscount
        , successAddUserDiscount, successEditUserDiscount, successDeleteUserDiscount]);

    const priceSearchNamesHandler = () => {
        if (!priceSearchNamesCheck) {
            dispatch(listUploadProductNames());
            setPriceSearchNamesCheck(true);
        }
    }

    const autoPriceSearchHandler = (searchItem) => {
        setPriceSearchArray([]);
        closePriceSearchDropdown();
        setProductDiscountProductId(searchItem.product);
        setProductDiscountProductName(`${searchItem.name} (${searchItem.netWeight})`);
    }

    const openPriceSearchDropdown = () => {
        document.querySelector(".admin-price-searchbar-dropdown").classList.add("open");
    }

    const closePriceSearchDropdown = () => {
        document.querySelector(".admin-price-searchbar-dropdown").classList.remove("open");
    }

    function getPriceProductNames(keyword) {
        keyword = keyword.toLowerCase();
        var array = [];
        for (const product of productUploadNames) {
            var temp = product.name.toLowerCase();
            if (temp.indexOf(keyword) !== -1) {
                array.push(product);
            }
            if (array.length === 6) {
                break;
            }
        }
        setPriceSearchArray(array);
    }

    const autoCompletePriceSearch = (keyword) => {
        setProductDiscountProductName(keyword);
        if (keyword === '') {
            closePriceSearchDropdown();
        }
        else {
            openPriceSearchDropdown();
            getPriceProductNames(keyword);
        }
    }

    const saveChanges = () => {

        if (edit) {
            dispatch(editPrice({
                _id: id, tax, addressLine1, addressLine2, newUserPopupImage, newUserPopupHeading, newUserPopupText
                , registeredUserPopupImage, registeredUserPopupHeading, registeredUserPopupText
            }));
        }
        else {
            dispatch(createPrice({
                tax, addressLine1, addressLine2, newUserPopupImage, newUserPopupHeading, newUserPopupText
                , registeredUserPopupImage, registeredUserPopupHeading, registeredUserPopupText
            }));
        }
    }

    const openModal = (price) => {
        if (price._id) {
            setId(price._id);
            setTax(price.tax);
            setAddressLine1(price.addressLine1);
            setAddressLine2(price.addressLine2);
            setNewUserPopupImage(price.newUserPopupImage);
            setNewUserPopupHeading(price.newUserPopupHeading);
            setNewUserPopupText(price.newUserPopupText);
            setRegisteredUserPopupImage(price.registeredUserPopupImage);
            setRegisteredUserPopupHeading(price.registeredUserPopupHeading);
            setRegisteredUserPopupText(price.registeredUserPopupText);
            setEdit(true);
            setEditModalVisible(true);
        }
    }

    const openDeliveryChargesEditModal = (deliveryCharge) => {
        setDeliveryChargesValue(deliveryCharge.value);
        setDeliveryChargesId(deliveryCharge._id);
        setDeliveryChargesDistrict(deliveryCharge.district);
        setDeliveryChargesWeight(deliveryCharge.weight);
        setDeliveryChargesEdit(true);
        setDeliveryChargesModalVisible(true);
    }

    const confirmDeliveryModalHandler = (deliveryCharges) => {
        setDeliveryChargesId(deliveryCharges._id);
        setConfirmDeliveryModalVisible(true);
    }

    const deleteDeliveryChargesHandler = () => {
        dispatch(deleteDeliveryCharges({ id: deliveryChargesId }));
        setConfirmDeliveryModalVisible(false);
    }

    const deliveryChargesHandler = (e) => {

        e.preventDefault();
        if (!deliveryChargesEdit) {
            dispatch(addDeliveryCharges({
                value: deliveryChargesValue,
                district: deliveryChargesDistrict,
                weight: deliveryChargesWeight
            }));
        }
        else {
            dispatch(editDeliveryCharges({
                id: deliveryChargesId,
                value: deliveryChargesValue,
                district: deliveryChargesDistrict,
                weight: deliveryChargesWeight
            }));
        }
    }

    const openProductDiscountEditModal = (productDiscount) => {
        setProductDiscountValue(productDiscount.value);
        setProductDiscountId(productDiscount._id);
        setProductDiscountType(productDiscount.discountType);
        setProductDiscountDistrict(productDiscount.district);
        setProductDiscountProductId(productDiscount.productId);
        setProductDiscountProductName(productDiscount.productName);
        setProductDiscountEdit(true);
        setProductDiscountModalVisible(true);
    }

    const confirmProductModalHandler = (productDiscount) => {
        setProductDiscountId(productDiscount._id);
        setConfirmProductModalVisible(true);
    }

    const deleteProductDiscountHandler = () => {
        dispatch(deleteProductDiscount({ id: productDiscountId }));
        setConfirmProductModalVisible(false);
    }

    const productDiscountHandler = (e) => {

        e.preventDefault();
        if (!productDiscountEdit) {
            dispatch(addProductDiscount({
                productName: productDiscountProductName,
                productId: productDiscountProductId,
                value: productDiscountValue,
                discountType: productDiscountType,
                district: productDiscountDistrict
            }));
        }
        else {
            dispatch(editProductDiscount({
                id: productDiscountId,
                productName: productDiscountProductName,
                productId: productDiscountProductId,
                value: productDiscountValue,
                district: productDiscountDistrict,
                discountType: productDiscountType
            }));
        }
    }

    const openUserDiscountEditModal = (userDiscount) => {
        setUserDiscountId(userDiscount._id);
        setUserDiscountUserType(userDiscount.userType);
        setUserDiscountPromoCode(userDiscount.promoCode);
        setUserDiscountType(userDiscount.discountType);
        setUserDiscountValue(userDiscount.value);
        setUserDiscountCondition(userDiscount.condition);
        setUserDiscountConditionValue(userDiscount.conditionValue);
        setUserDiscountMax(userDiscount.maxDiscount);
        setUserDiscountEdit(true);
        setUserDiscountModalVisible(true);
    }

    const confirmUserModalHandler = (userDiscount) => {
        setUserDiscountId(userDiscount._id);
        setConfirmUserModalVisible(true);
    }

    const deleteUserDiscountHandler = () => {
        dispatch(deleteUserDiscount({ id: userDiscountId }));
        setConfirmUserModalVisible(false);
    }

    const userDiscountHandler = (e) => {

        e.preventDefault();
        if (!userDiscountEdit) {
            dispatch(addUserDiscount({
                userType: userDiscountUserType,
                promoCode: userDiscountPromoCode,
                discountType: userDiscountType,
                value: userDiscountValue,
                condition: userDiscountCondition,
                conditionValue: userDiscountConditionValue,
                maxDiscount: userDiscountMax
            }));
        }
        else {
            dispatch(editUserDiscount({
                id: userDiscountId,
                userType: userDiscountUserType,
                promoCode: userDiscountPromoCode,
                discountType: userDiscountType,
                value: userDiscountValue,
                condition: userDiscountCondition,
                conditionValue: userDiscountConditionValue,
                maxDiscount: userDiscountMax
            }));
        }
    }


    const uploadImage1Handler = (e) => {
        const file = e.target.files[0];
        setUploading(true);
        setNewUserPopupImage(file.name);
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
        setRegisteredUserPopupImage(file.name);
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
            })
            .catch((err) => {
                setUploading(false);
            });
    };



    return <div className="grid">

        <div className="grid-header">
            <Header></Header>
        </div>

        <Modal show={confirmDeliveryModalVisible} onHide={() => setConfirmDeliveryModalVisible(false)} centered dialogClassName="modal-35w">
            <Modal.Body>
                <div className="confirm-container">
                    <div className="confirm-no-icon"><FiXCircle></FiXCircle></div>
                    <div className="confirm-heading">Are you sure?</div>
                    <div className="confirm-text">Do you really want to delete this delivery charge? This process cannot be undone.</div>
                    <div className="confirm-buttons">
                        <Button onClick={() => setConfirmDeliveryModalVisible(false)} className="confirm-no-button">No</Button>
                        <Button onClick={deleteDeliveryChargesHandler} className="confirm-yes-button">Yes</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>

        <Modal show={confirmProductModalVisible} onHide={() => setConfirmProductModalVisible(false)} centered dialogClassName="modal-35w">
            <Modal.Body>
                <div className="confirm-container">
                    <div className="confirm-no-icon"><FiXCircle></FiXCircle></div>
                    <div className="confirm-heading">Are you sure?</div>
                    <div className="confirm-text">Do you really want to delete this product discount? This process cannot be undone.</div>
                    <div className="confirm-buttons">
                        <Button onClick={() => setConfirmProductModalVisible(false)} className="confirm-no-button">No</Button>
                        <Button onClick={deleteProductDiscountHandler} className="confirm-yes-button">Yes</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>

        <Modal show={confirmUserModalVisible} onHide={() => setConfirmUserModalVisible(false)} centered dialogClassName="modal-35w">
            <Modal.Body>
                <div className="confirm-container">
                    <div className="confirm-no-icon"><FiXCircle></FiXCircle></div>
                    <div className="confirm-heading">Are you sure?</div>
                    <div className="confirm-text">Do you really want to delete this user discount? This process cannot be undone.</div>
                    <div className="confirm-buttons">
                        <Button onClick={() => setConfirmUserModalVisible(false)} className="confirm-no-button">No</Button>
                        <Button onClick={deleteUserDiscountHandler} className="confirm-yes-button">Yes</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>

        <Modal show={deliveryChargesModalVisible} onHide={() => setDeliveryChargesModalVisible(false)} dialogClassName="modal-50w" centered>
            <Modal.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="admin-uploads-modal-heading">Enter Discount Charges Details</div>
                    <Button className="admin-uploads-modal-button" onClick={() => setDeliveryChargesModalVisible(false)}><FiX></FiX></Button>
                </div>
                <form className="admin-uploads-form" onSubmit={deliveryChargesHandler}>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", marginBottom: "2rem" }}>
                        <label className="admin-uploads-label">District</label>
                        <select className="admin-uploads-select" type="text" name="deliveryChargesDistrict" value={deliveryChargesDistrict} onChange={(e) => setDeliveryChargesDistrict(e.target.value)}>
                            <option value="">Select District</option>
                            <option value="Inside Dhaka">Inside Dhaka</option>
                            <option value="Outside Dhaka">Outside Dhaka</option>
                        </select>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", marginBottom: "2rem" }}>
                        <div style={{ width: "29%" }}>
                            <label className="admin-uploads-label">Weight (in gm)</label>
                            <label className="admin-uploads-label">Greater Than Equal To</label>
                        </div>
                        <input autoComplete="off" className="admin-uploads-input" type="text" name="deliveryChargesWeight" value={deliveryChargesWeight} onChange={(e) => setDeliveryChargesWeight(e.target.value)}></input>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%" }}>
                        <label className="admin-uploads-label">Delivery Charge Value</label>
                        <input autoComplete="off" className="admin-uploads-input" type="text" name="deliveryChargesValue" value={deliveryChargesValue} onChange={(e) => setDeliveryChargesValue(e.target.value)}></input>
                    </div>
                    <Button type='submit' className="admin-uploads-submit">Submit</Button>
                </form>
            </Modal.Body>
        </Modal>

        <Modal show={productDiscountModalVisible} onHide={() => setProductDiscountModalVisible(false)} dialogClassName="modal-50w" centered>
            <Modal.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="admin-uploads-modal-heading">Enter Product Discount Details</div>
                    <Button className="admin-uploads-modal-button" onClick={() => setProductDiscountModalVisible(false)}><FiX></FiX></Button>
                </div>
                <form className="admin-uploads-form" onSubmit={productDiscountHandler}>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", marginBottom: "2rem" }}>
                        <label className="admin-uploads-label">Product Name</label>
                        <div style={{ width: "70%" }}>
                            <input autoComplete="off" style={{ width: "100%" }} type="text" name="productDiscountProductId" value={productDiscountProductName}
                                onChange={(e) => autoCompletePriceSearch(e.target.value)} onClick={priceSearchNamesHandler}></input>
                            <div className="admin-price-searchbar-dropdown">
                                {loadingProductUploadNames ? <div></div> :
                                    errorProductUploadNames ? <div>{errorProductUploadNames.message}</div> : <>
                                        {priceSearchArray.length === 0 ? <div className="admin-price-searchbar-dropdown-text">No Results Found</div>
                                            : priceSearchArray.map(searchItem => <Button onClick={() => autoPriceSearchHandler(searchItem)} className="admin-price-searchbar-dropdown-button">{`${searchItem.name} (${searchItem.netWeight})`}</Button>)}
                                    </>}
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", marginBottom: "2rem" }}>
                        <label className="admin-uploads-label">Discount Type</label>
                        <select className="admin-uploads-select" type="text" name="productDiscountType" value={productDiscountType} onChange={(e) => setProductDiscountType(e.target.value)}>
                            <option value="">Select Discount Type</option>
                            <option value="Free Delivery">Free Delivery</option>
                            <option value="Delivery Time">Delivery Time (hrs)</option>
                            <option value="Percentage">Percentage</option>
                            <option value="Flat">Flat</option>
                        </select>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", marginBottom: "2rem" }}>
                        <label className="admin-uploads-label">District</label>
                        <select className="admin-uploads-select" type="text" name="productDiscountDistrict" value={productDiscountDistrict} onChange={(e) => setProductDiscountDistrict(e.target.value)}>
                            <option value="">Select District</option>
                            <option value="Inside Dhaka">Inside Dhaka</option>
                            <option value="Outside Dhaka">Outside Dhaka</option>
                        </select>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%" }}>
                        <label className="admin-uploads-label">Discount Value</label>
                        <input autoComplete="off" className="admin-uploads-input" type="text" name="productDiscountValue" value={productDiscountValue} onChange={(e) => setProductDiscountValue(e.target.value)}></input>
                    </div>
                    <Button type='submit' className="admin-uploads-submit">Submit</Button>
                </form>
            </Modal.Body>
        </Modal>

        <Modal show={userDiscountModalVisible} onHide={() => setUserDiscountModalVisible(false)} dialogClassName="modal-50w" centered>
            <Modal.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="admin-uploads-modal-heading">Enter User Discount Details</div>
                    <Button className="admin-uploads-modal-button" onClick={() => setUserDiscountModalVisible(false)}><FiX></FiX></Button>
                </div>
                <form className="admin-uploads-form" onSubmit={userDiscountHandler}>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", marginBottom: "2rem" }}>
                        <label className="admin-uploads-label">User Type</label>
                        <select className="admin-uploads-select" type="text" name="userDiscountUserType" value={userDiscountUserType} onChange={(e) => setUserDiscountUserType(e.target.value)}>
                            <option value="">Select User Type</option>
                            <option value="Registered">Registered</option>
                            <option value="Not Registered">Not Registered</option>
                        </select>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", marginBottom: "2rem" }}>
                        <label className="admin-uploads-label">Promo Code</label>
                        <input autoComplete="off" className="admin-uploads-input" type="text" name="userDiscountPromoCode" value={userDiscountPromoCode} onChange={(e) => setUserDiscountPromoCode(e.target.value)}></input>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", marginBottom: "2rem" }}>
                        <label className="admin-uploads-label">Discount Type</label>
                        <select className="admin-uploads-select" type="text" name="userDiscountType" value={userDiscountType} onChange={(e) => setUserDiscountType(e.target.value)}>
                            <option value="">Select Discount Type</option>
                            <option value="Free Delivery">Free Delivery</option>
                            <option value="Percentage">Percentage</option>
                            <option value="Flat">Flat</option>
                        </select>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", marginBottom: "2rem" }}>
                        <label className="admin-uploads-label">Discount Value</label>
                        <input autoComplete="off" className="admin-uploads-input" type="text" name="userDiscountValue" value={userDiscountValue} onChange={(e) => setUserDiscountValue(e.target.value)}></input>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", marginBottom: "2rem" }}>
                        <label className="admin-uploads-label">Discount Condition</label>
                        <select className="admin-uploads-select" type="text" name="userDiscountCondition" value={userDiscountCondition} onChange={(e) => setUserDiscountCondition(e.target.value)}>
                            <option value="">Select Discount Condition</option>
                            <option value="Order Items Price Greater">Order Items Price Greater Than</option>
                            <option value="Order Items Price Less">Order Items Price Less Than</option>
                        </select>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", marginBottom: "2rem" }}>
                        <label className="admin-uploads-label">Discount Condition Value</label>
                        <input autoComplete="off" className="admin-uploads-input" type="text" name="userDiscountConditionValue" value={userDiscountConditionValue} onChange={(e) => setUserDiscountConditionValue(e.target.value)}></input>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%" }}>
                        <label className="admin-uploads-label">Max Discount Value</label>
                        <input autoComplete="off" className="admin-uploads-input" type="text" name="userDiscountMax" value={userDiscountMax} onChange={(e) => setUserDiscountMax(e.target.value)}></input>
                    </div>
                    <Button type='submit' className="admin-uploads-submit">Submit</Button>
                </form>
            </Modal.Body>
        </Modal>

        <div className="main">
            <div className="d-flex">
                <UploadSidebar value="Price"></UploadSidebar>
                <div className="admin-content">
                    {loading ? <div></div> :
                        error ? <div>{error.message}</div> :
                            <>
                                {!price._id ? <div>
                                    <div className="admin-header">
                                        <div className="admin-header-text" style={{ marginLeft: "1rem" }}>Price Data</div>
                                        <div className="d-flex align-items-center">
                                            <Button onClick={saveChanges} className="admin-header-button">Create Price Data</Button>
                                        </div>
                                    </div>
                                    <form className="admin-form">
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Tax (In Percentage)</label>
                                            <input autoComplete="off" className="admin-form-input" value={tax} onChange={(e) => setTax(e.target.value)} type="text" placeholder="Eg. 0"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Address Line 1</label>
                                            <input autoComplete="off" className="admin-form-input" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} type="text" placeholder="Eg. Farmroots Ltd."></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Address Line 2</label>
                                            <input autoComplete="off" className="admin-form-input" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} type="text" placeholder="Eg. Dhaka, Bangladesh"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">New User Popup Image</label>
                                            <input autoComplete="off" className="admin-form-input" value={newUserPopupImage} onChange={(e) => setNewUserPopupImage(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">New User Popup Heading</label>
                                            <input autoComplete="off" className="admin-form-input" value={newUserPopupHeading} onChange={(e) => setNewUserPopupHeading(e.target.value)} type="text" placeholder="Eg. 20% OFF"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">New User Popup Text</label>
                                            <textarea className="admin-form-textarea" value={newUserPopupText} onChange={(e) => setNewUserPopupText(e.target.value)} type="text" placeholder="Eg. Sign up now to avail..."></textarea>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Registered User Popup Image</label>
                                            <input autoComplete="off" className="admin-form-input" value={registeredUserPopupImage} onChange={(e) => setRegisteredUserPopupImage(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Registered User Popup Heading</label>
                                            <input autoComplete="off" className="admin-form-input" value={registeredUserPopupHeading} onChange={(e) => setRegisteredUserPopupHeading(e.target.value)} type="text" placeholder="Eg. Get Free Delivery"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Registered User Popup Text</label>
                                            <textarea className="admin-form-textarea" value={registeredUserPopupText} onChange={(e) => setRegisteredUserPopupText(e.target.value)} type="text" placeholder="Eg. Order now to avail..."></textarea>
                                        </div>
                                    </form>
                                </div> : editModalVisible ? <div>
                                    <div className="admin-header">
                                        <div className="admin-header-text" style={{ marginLeft: "1rem" }}>Price Data</div>
                                        <div className="d-flex align-items-center">
                                            <Button onClick={saveChanges} className="admin-header-button">Save Changes</Button>
                                        </div>
                                    </div>
                                    <form className="admin-form">
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Tax (In Percentage)</label>
                                            <input autoComplete="off" className="admin-form-input" value={tax} onChange={(e) => setTax(e.target.value)} type="text" placeholder="Eg. 0"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Address Line 1</label>
                                            <input autoComplete="off" className="admin-form-input" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} type="text" placeholder="Eg. Farmroots Ltd."></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Address Line 2</label>
                                            <input autoComplete="off" className="admin-form-input" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} type="text" placeholder="Eg. Dhaka, Bangladesh"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">New User Popup Image </label>
                                            {/* <input autoComplete="off" className="admin-form-input" value={newUserPopupImage} onChange={(e) => setNewUserPopupImage(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input> */}
                                            <input
                                                autoComplete="off"
                                                type="file"
                                                name="image1"
                                                onChange={uploadImage1Handler}
                                                className="admin-modal-form-input admin-form-div-input"
                                            ></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">New User Popup Heading</label>
                                            <input autoComplete="off" className="admin-form-input" value={newUserPopupHeading} onChange={(e) => setNewUserPopupHeading(e.target.value)} type="text" placeholder="Eg. 20% OFF"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">New User Popup Text</label>
                                            <textarea className="admin-form-textarea" value={newUserPopupText} onChange={(e) => setNewUserPopupText(e.target.value)} type="text" placeholder="Eg. Sign up now to avail..."></textarea>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Registered User Popup Image</label>
                                            {/* <input autoComplete="off" className="admin-form-input" value={registeredUserPopupImage} onChange={(e) => setRegisteredUserPopupImage(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input> */}
                                            <input
                                                autoComplete="off"
                                                type="file"
                                                name="image1"
                                                onChange={uploadImage2Handler}
                                                className="admin-modal-form-input admin-form-div-input"
                                            ></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Registered User Popup Heading</label>
                                            <input autoComplete="off" className="admin-form-input" value={registeredUserPopupHeading} onChange={(e) => setRegisteredUserPopupHeading(e.target.value)} type="text" placeholder="Eg. Get Free Delivery"></input>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Registered User Popup Text</label>
                                            <textarea className="admin-form-textarea" value={registeredUserPopupText} onChange={(e) => setRegisteredUserPopupText(e.target.value)} type="text" placeholder="Eg. Order now to avail..."></textarea>
                                        </div>
                                    </form>
                                </div> : <div>
                                    <div className="admin-header">
                                        <div className="admin-header-text" style={{ marginLeft: "1rem" }}>Price Data</div>
                                        <div className="d-flex align-items-center">
                                            <Button onClick={() => setUserDiscountModalVisible(true)} className="admin-header-button">Add User Discount</Button>
                                            <Button onClick={() => setProductDiscountModalVisible(true)} className="admin-header-button">Add Product Discount</Button>
                                            <Button onClick={() => setDeliveryChargesModalVisible(true)} className="admin-header-button">Add Delivery Charges</Button>
                                            <Button onClick={() => openModal(price)} className="admin-header-button">Edit Price</Button>
                                        </div>
                                    </div>
                                    <table style={{ marginTop: "2rem" }} className="table table-striped table-bordered">
                                        <thead style={{ fontSize: "1.8rem" }}>
                                            <tr>
                                                <th>Product Discount ID</th>
                                                <th>Product Name</th>
                                                <th>Discount Type</th>
                                                <th>District</th>
                                                <th>Discount Value</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {price.productDiscounts.map((productDiscount, index) => (
                                                <tr key={productDiscount._id}>
                                                    <td>{Number(index) + 1}</td>
                                                    <td>{productDiscount.productName}</td>
                                                    <td>{productDiscount.discountType}</td>
                                                    <td>{productDiscount.district}</td>
                                                    <td>{productDiscount.value}</td>
                                                    <td className="d-flex">
                                                        <Button onClick={() => openProductDiscountEditModal(productDiscount)} className="admin-table-button">Edit</Button>
                                                        <Button onClick={() => confirmProductModalHandler(productDiscount)} className="admin-table-button">Delete</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <table style={{ marginTop: "2rem" }} className="table table-striped table-bordered">
                                        <thead style={{ fontSize: "1.8rem" }}>
                                            <tr>
                                                <th>User Discount ID</th>
                                                <th>User Type</th>
                                                <th>Promo Code</th>
                                                <th>Discount Type</th>
                                                <th>Value</th>
                                                <th>Max Discount</th>
                                                <th>No. Of Users</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {price.userDiscounts.map((userDiscount, index) => (
                                                <tr key={userDiscount._id}>
                                                    <td>{Number(index) + 1}</td>
                                                    <td>{userDiscount.userType}</td>
                                                    <td>{userDiscount.promoCode}</td>
                                                    <td>{userDiscount.discountType}</td>
                                                    <td>{userDiscount.value}</td>
                                                    <td>{userDiscount.maxDiscount}</td>
                                                    {userDiscount.userType === "Registered" ?
                                                        <td>All</td> :
                                                        <td>{userDiscount.allowedUsersList.length}</td>}
                                                    <td className="d-flex">
                                                        <Button onClick={() => openUserDiscountEditModal(userDiscount)} className="admin-table-button">Edit</Button>
                                                        <Button onClick={() => confirmUserModalHandler(userDiscount)} className="admin-table-button">Delete</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <table style={{ marginTop: "2rem" }} className="table table-striped table-bordered">
                                        <thead style={{ fontSize: "1.8rem" }}>
                                            <tr>
                                                <th>Delivery Charge ID</th>
                                                <th>Condition Type</th>
                                                <th>Weight (in gms) Greater Than Equal To</th>
                                                <th>Delivery Charge</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {price.deliveryCharges.map((deliveryCharge, index) => (
                                                <tr key={deliveryCharge._id}>
                                                    <td>{Number(index) + 1}</td>
                                                    <td>{deliveryCharge.district}</td>
                                                    <td>{deliveryCharge.weight}</td>
                                                    <td>{deliveryCharge.value}</td>
                                                    <td className="d-flex">
                                                        <Button onClick={() => openDeliveryChargesEditModal(deliveryCharge)} className="admin-table-button">Edit</Button>
                                                        <Button onClick={() => confirmDeliveryModalHandler(deliveryCharge)} className="admin-table-button">Delete</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <form className="admin-form">
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Tax (In Percentage)</label>
                                            <div className="admin-form-div-input">{price.tax}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Address Line 1</label>
                                            <div className="admin-form-div-input">{price.addressLine1}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Address Line 2</label>
                                            <div className="admin-form-div-input">{price.addressLine2}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">New User Popup Image</label>
                                            <div className="admin-form-div-input">{price.newUserPopupImage}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">New User Popup Heading</label>
                                            <div className="admin-form-div-input">{price.newUserPopupHeading}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">New User Popup Text</label>
                                            <div className="admin-form-textarea">{price.newUserPopupText}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Registered User Popup Image</label>
                                            <div className="admin-form-div-input">{price.registeredUserPopupImage}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Registered User Popup Heading</label>
                                            <div className="admin-form-div-input">{price.registeredUserPopupHeading}</div>
                                        </div>
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Registered User Popup Text</label>
                                            <div className="admin-form-textarea">{price.registeredUserPopupText}</div>
                                        </div>
                                    </form>
                                </div>}
                            </>}
                </div>
            </div>
        </div>
    </div>
}

export default UploadPriceScreen;