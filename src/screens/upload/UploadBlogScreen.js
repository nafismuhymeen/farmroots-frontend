import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FiX, FiXCircle } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import UploadSidebar from '../../components/UploadSidebar';
import axios from "axios";
import { addBlogContent, createBlog, deleteBlogContent, editBlog, editBlogContent, getEmployeeBlog } from '../../actions/blogActions';

function UploadBlogScreen(props) {

    const [id, setId] = useState('');
    const [topImage, setTopImage] = useState('');
    const [uploading, setUploading] = useState(false);

    const [blogContentName, setBlogContentName] = useState('');
    const [blogContentImage, setBlogContentImage] = useState('');
    const [blogContentInfo, setBlogContentInfo] = useState('');
    const [blogContentModalVisible, setBlogContentModalVisible] = useState(false);
    const [blogContentId, setBlogContentId] = useState('');
    const [editContent, setEditContent] = useState(false);

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [edit, setEdit] = useState(false);

    const [confirmModalVisible, setConfirmModalVisible] = useState(false);

    const dispatch = useDispatch();

    const blogGet = useSelector(state => state.blogGet);
    const { loading, blog, error } = blogGet;

    const blogCreate = useSelector(state => state.blogCreate);
    const { success: successCreate } = blogCreate;

    const blogEdit = useSelector(state => state.blogEdit);
    const { success: successEdit } = blogEdit;

    const blogContentAdd = useSelector(state => state.blogContentAdd);
    const { success: successAddContent } = blogContentAdd;

    const blogContentEdit = useSelector(state => state.blogContentEdit);
    const { success: successEditContent } = blogContentEdit;

    const blogContentDelete = useSelector(state => state.blogContentDelete);
    const { success: successDeleteContent } = blogContentDelete;

    useEffect(() => {
        dispatch(getEmployeeBlog());
        if (successEdit) {
            setEditModalVisible(false);
        }
        if (successAddContent || successEditContent || successDeleteContent) {
            setBlogContentModalVisible(false);
            setEditContent(false);
            setBlogContentId('');
            setBlogContentImage('');
            setBlogContentInfo('');
            setBlogContentName('');
        }
        return () => {
            //
        };
    }, [successCreate, successEdit, successAddContent, successEditContent, successDeleteContent]);

    const saveChanges = () => {

        if (edit) {
            dispatch(editBlog({ _id: id, topImage }));
        }
        else {
            dispatch(createBlog({ topImage }));
        }
        window.location.reload();
    }

    const openModal = (blog) => {
        if (blog._id) {
            setId(blog._id);
            setTopImage(blog.topImage);
            setEdit(true);
            setEditModalVisible(true);
        }
    }

    const openBlogContentEditModal = (blogContent) => {
        setBlogContentName(blogContent.name);
        setBlogContentId(blogContent._id);
        setBlogContentImage(blogContent.image);
        setBlogContentInfo(blogContent.info);
        setEditContent(true);
        setBlogContentModalVisible(true);
    }

    const confirmModalHandler = (blogContent) => {
        setId(blogContent._id);
        setConfirmModalVisible(true);
    }

    const deleteHandler = () => {
        dispatch(deleteBlogContent({ id }));
        setConfirmModalVisible(false);
    }
    const uploadImage1Handler = (e) => {
        const file = e.target.files[0];
        setUploading(true);
        setBlogContentImage(file.name);
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
    const blogContentHandler = (e) => {

        e.preventDefault();
        if (!editContent) {
            dispatch(addBlogContent({
                name: blogContentName,
                image: blogContentImage,
                info: blogContentInfo
            }));
        }
        else {
            dispatch(editBlogContent({
                id: blogContentId,
                name: blogContentName,
                image: blogContentImage,
                info: blogContentInfo
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
                    <div className="confirm-text">Do you really want to delete this blog? This process cannot be undone.</div>
                    <div className="confirm-buttons">
                        <Button onClick={() => setConfirmModalVisible(false)} className="confirm-no-button">No</Button>
                        <Button onClick={deleteHandler} className="confirm-yes-button">Yes</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>

        <Modal show={blogContentModalVisible} onHide={() => setBlogContentModalVisible(false)} dialogClassName="modal-50w" centered>
            <Modal.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="admin-uploads-modal-heading">Enter Blog Content Details</div>
                    <Button className="admin-uploads-modal-button" onClick={() => setBlogContentModalVisible(false)}><FiX></FiX></Button>
                </div>
                <form className="admin-uploads-form" onSubmit={blogContentHandler}>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", marginBottom: "2rem" }}>
                        <label className="admin-uploads-label">Blog Content Name</label>
                        <input autoComplete="off" className="admin-uploads-input" type="text" name="blogContentName" value={blogContentName} onChange={(e) => setBlogContentName(e.target.value)}></input>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", marginBottom: "2rem" }}>
                        <label className="admin-uploads-label">Blog Content Image</label>
                        <input
                            autoComplete="off"
                            type="file"
                            name="image1"
                            onChange={uploadImage1Handler}
                            className="admin-modal-form-input admin-form-div-input"
                        ></input>
                        {/* <input autoComplete="off" className="admin-uploads-input" type="text" name="blogContentImage" value={blogContentImage} onChange={(e) => setBlogContentImage(e.target.value)}></input> */}
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: "100%" }}>
                        <label className="admin-uploads-label">Blog Content Info</label>
                        <textarea className="admin-uploads-textarea" type="text" name="blogContentInfo" value={blogContentInfo} onChange={(e) => setBlogContentInfo(e.target.value)}></textarea>
                    </div>
                    <Button type='submit' className="admin-uploads-submit">Submit</Button>
                </form>
            </Modal.Body>
        </Modal>

        <div className="main">
            <div className="d-flex">
                <UploadSidebar value="Blog"></UploadSidebar>
                <div className="admin-content">
                    {loading ? <div></div> :
                        error ? <div>{error.message}</div> :
                            <>
                                {!blog._id ? <div>
                                    <div className="admin-header">
                                        <div className="admin-header-text" style={{ marginLeft: "1rem" }}>Blog Data</div>
                                        <div className="d-flex align-items-center">
                                            <Button onClick={saveChanges} className="admin-header-button">Create Blog</Button>
                                        </div>
                                    </div>
                                    <form className="admin-form">
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Top Image</label>
                                            {/* <input
                                                autoComplete="off"
                                                type="file"
                                                name="image1"
                                                onChange={uploadImage1Handler}
                                                className="admin-modal-form-input admin-form-div-input"
                                            ></input> */}
                                            <input autoComplete="off" className="admin-form-input" value={topImage} onChange={(e) => setTopImage(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input>
                                        </div>
                                    </form>
                                </div> : editModalVisible ? <div>
                                    <div className="admin-header">
                                        <div className="admin-header-text" style={{ marginLeft: "1rem" }}>Blog Data</div>
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
                                            {/*                                             
                                            <input autoComplete="off" className="admin-form-input" value={topImage} onChange={(e) => setTopImage(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input> */}
                                        </div>
                                    </form>
                                </div> : <div>
                                    <div className="admin-header">
                                        <div className="admin-header-text" style={{ marginLeft: "1rem" }}>Blog Data</div>
                                        <div className="d-flex align-items-center">
                                            <Button onClick={() => setBlogContentModalVisible(true)} className="admin-header-button">Add Blog Content</Button>
                                            <Button onClick={() => openModal(blog)} className="admin-header-button">Edit Blog</Button>
                                        </div>
                                    </div>
                                    <table style={{ marginTop: "2rem" }} className="table table-striped table-bordered">
                                        <thead style={{ fontSize: "1.8rem" }}>
                                            <tr>
                                                <th>Blog Content ID</th>
                                                <th>Name</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {blog.blogContent.map((content, index) => (
                                                <tr key={content._id}>
                                                    <td>{Number(index) + 1}</td>
                                                    <td>{content.name}</td>
                                                    <td className="d-flex">
                                                        <Button onClick={() => openBlogContentEditModal(content)} className="admin-table-button">Edit</Button>
                                                        <Button onClick={() => confirmModalHandler(content)} className="admin-table-button">Delete</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <form className="admin-form">
                                        <div className="admin-form-input-div">
                                            <label className="admin-form-label">Top Image</label>
                                            <div className="admin-form-div-input">{blog.topImage}</div>
                                        </div>
                                    </form>
                                </div>}
                            </>}
                </div>
            </div>
        </div>
    </div>
}

export default UploadBlogScreen;