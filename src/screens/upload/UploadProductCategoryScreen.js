import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FiX, FiXCircle } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, deleteCategory, editCategory, listEmployeeCategories } from '../../actions/productCategoryActions';
import UploadSidebar from '../../components/UploadSidebar';
import Header from '../../components/Header';

function UploadProductCategoryScreen (props) {

    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [subCategories, setSubCategories] = useState('');
    const [id, setId] = useState('');
    const [edit, setEdit] = useState(false);

    const [confirmModalVisible, setConfirmModalVisible] = useState(false);

    const dispatch = useDispatch();

    const categoryList = useSelector(state =>state.categoryList);
    const {loading, categories, error} = categoryList;

    const categoryCreate = useSelector(state => state.categoryCreate);
    const {success: successCreate} = categoryCreate;

    const categoryEdit = useSelector(state => state.categoryEdit);
    const {success: successEdit} = categoryEdit;

    const categoryDelete = useSelector(state => state.categoryDelete);
    const {success: successDelete} = categoryDelete;

    useEffect (() => {
        if(successCreate || successEdit)
        {
            setCategoryModalVisible(false);
        }
        dispatch(listEmployeeCategories());
        return () => {
            //
        };
    }, [successCreate, successEdit, successDelete]);

    const openCreateModal = () => {
        setName('');
        setSubCategories('');
        setEdit(false);
        setCategoryModalVisible(true);
    }

    function getCategoriesFromArray(category)
    {
        var subCategories = ""
        for(const subCategory of category.subCategories)
        {
            subCategories = subCategories + "; " + subCategory.name.replace(" and ", " & ");
        }
        subCategories = subCategories.slice(1);
        return subCategories;
    }

    const openEditModal = (category) => {
        setName(category.name.replace(" and ", " & "));
        setId(category._id);
        setSubCategories(getCategoriesFromArray(category));
        setEdit(true);
        setCategoryModalVisible(true);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        var subCategoriesArray = subCategories.split(";").map(item => item.trim());
        var subcategories = []

        for(const category of subCategoriesArray)
        {
            subcategories.push({name: category.replace(" & ", " and ")});
        }

        if(edit === false)
        {
            dispatch(createCategory({name: name.replace(" & ", " and "), subCategories: subcategories}));
        }
        else
        {
            dispatch(editCategory({_id: id, name: name.replace(" & ", " and "), subCategories: subcategories}))
        }
    }

    const confirmModalHandler = (category) => {
        setId(category._id);
        setConfirmModalVisible(true);
    }

    const deleteHandler = () => {
        dispatch(deleteCategory(id));
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
                    <div className="confirm-text">Do you really want to delete this category? This process cannot be undone.</div>
                    <div className="confirm-buttons">
                        <Button onClick={() => setConfirmModalVisible(false)} className="confirm-no-button">No</Button>
                        <Button onClick = {deleteHandler} className="confirm-yes-button">Yes</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>

        <Modal show={categoryModalVisible} onHide={() => setCategoryModalVisible(false)} dialogClassName="modal-35w" centered>
            <Modal.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="admin-uploads-modal-heading">Enter Category Details</div>
                    <Button className="admin-uploads-modal-button" onClick={() => setCategoryModalVisible(false)}><FiX></FiX></Button>
                </div>
                <form className="admin-uploads-form" onSubmit={submitHandler}>
                    <div className="d-flex justify-content-between align-items-center" style={{width: "100%", marginBottom: "2rem"}}>
                        <label className="admin-uploads-label">Name</label>
                        <input autoComplete="off" placeholder="Eg. Daily Fresh Needs" className="admin-uploads-input" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{width: "100%"}}>
                        <label className="admin-uploads-label">Sub Categories</label>
                        <textarea placeholder="Meats; Fish; Vegetables; Eggs; Fruits" className="admin-uploads-textarea" type="text" name="subCategories" value={subCategories} onChange={(e) => setSubCategories(e.target.value)}></textarea>
                    </div>
                    <Button type='submit' className="admin-uploads-submit">Submit</Button>
                </form>
            </Modal.Body>
        </Modal>

        <div className="main">
            <div className="d-flex">
                <UploadSidebar value="Category"></UploadSidebar>
                <div className="admin-content">
                    {loading ? <div></div> : 
                    error ? <div>{error.message}</div> : 
                    <>
                        <div className="d-flex justify-content-between align-items-center" style={{marginBottom: "2rem"}}>
                            <div className="admin-uploads-heading">Product Categories</div>
                            <Button onClick={openCreateModal} className="admin-uploads-button">Create New Category</Button>
                        </div>
                        <table className="table table-striped table-bordered">
                            <thead style={{fontSize: "1.8rem"}}>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Sub Cateogries</th>                                    
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, index) => (<tr key = {category._id}>
                                    <td>{Number(index) + 1}</td>
                                    <td>{category.name.replace(" and ", " & ")}</td>
                                    <td>{getCategoriesFromArray(category)}</td>
                                    <td className="d-flex">
                                        <Button onClick={() => openEditModal(category)} className="admin-table-button">Edit</Button>
                                        <Button onClick={() => confirmModalHandler(category)} className="admin-table-button">Delete</Button>
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

export default UploadProductCategoryScreen;