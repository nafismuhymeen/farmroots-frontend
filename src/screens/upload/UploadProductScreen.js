import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import {
  saveProduct,
  listEmployeeProducts,
  deleteProduct,
  outOfStockProduct,
  saveProductFromCsv,
} from '../../actions/productActions';
import axios from 'axios';
import Header from '../../components/Header';
import UploadSidebar from '../../components/UploadSidebar';
import Switch from 'react-switch';
import { FiX, FiXCircle } from 'react-icons/fi';
import { listCategories } from '../../actions/productCategoryActions';
import { CSVReader } from 'react-papaparse';
import { toast } from 'react-toastify';
import { CSVLink } from 'react-csv';

function UploadProductScreen(props) {
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState('');
  const [originalId, setoriginalId] = useState('');
  const [name, setName] = useState('');
  const [liftingPrice, setLiftingPrice] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [netWeight, setNetWeight] = useState('');
  const [vegan, setVegan] = useState('');
  const [smallDescription, setSmallDescription] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [recommendedProduct1, setRecommendedProduct1] = useState('');
  const [recommendedProduct2, setRecommendedProduct2] = useState('');
  const [recommendedProduct3, setRecommendedProduct3] = useState('');
  const [recommendedProduct4, setRecommendedProduct4] = useState('');
  const [nutrientValues, setNutrientValues] = useState('');
  // const [popupVideo, setPopupVideo] = useState('');
  // const [popupProductId, setPopupProductId] = useState('');

  const [subCategoryArray, setSubCategoryArray] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: loadingCategories,
    categories,
    error: errorCategories,
  } = categoryList;

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  const productOutOfStock = useSelector((state) => state.productOutOfStock);
  const { success: successOutOfStock } = productOutOfStock;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      closeModal();
    }
    dispatch(listEmployeeProducts());
    dispatch(listCategories());
    return () => {
      //
    };
  }, [successSave, successDelete, successOutOfStock]);

  const openAddModal = () => {
    setEdit(false);
    setId('');
    setName('');
    setPrice('');
    setLiftingPrice('');
    setStock('');
    setSellerName('');
    setImage1('');
    setImage2('');
    setImage3('');
    setImage4('');
    setCategory('');
    setSubCategory('');
    setNetWeight('');
    setVegan('');
    setSmallDescription('');
    setDetailedDescription('');
    // setPopupVideo('');
    // setPopupProductId('');
    setRecommendedProduct1('');
    setRecommendedProduct2('');
    setRecommendedProduct3('');
    setRecommendedProduct4('');
    setNutrientValues('');
    openModal();
  };

  const openEditModal = (product) => {
    console.log('product>>>>>>', product);
    setEdit(true);
    setId(product.id);
    setoriginalId(product._id);
    setName(product.name);
    setLiftingPrice(product.liftingPrice);
    setPrice(product.price);
    setStock(product.stock);
    setSellerName(product.sellerName);
    setImage1(product.image1);
    setImage2(product.image2);
    setImage3(product.image3);
    setImage4(product.image4);
    setCategory(product.category);
    setSubCategory(product.subCategory);
    setNetWeight(product.netWeight);
    setVegan(product.vegan);
    setSmallDescription(product.smallDescription);
    setDetailedDescription(product.detailedDescription);
    // setPopupVideo(product.popupVideo);
    // setPopupProductId(product.popupProductId);
    setRecommendedProduct1(product.recommendedProducts[0].id);
    setRecommendedProduct2(product.recommendedProducts[1].id);
    setRecommendedProduct3(product.recommendedProducts[2].id);
    setRecommendedProduct4(product.recommendedProducts[3].id);
    var nutrientValues = '';
    for (const nutrientValue of product.nutrientValues) {
      nutrientValues =
        nutrientValues + nutrientValue.name + ': ' + nutrientValue.value + '; ';
    }
    nutrientValues = nutrientValues.substr(0, nutrientValues.length - 2);
    setNutrientValues(nutrientValues);
    for (var Category of categories) {
      if (Category.name === product.category) {
        setSubCategoryArray(Category.subCategories);
        break;
      }
    }
    openModal();
  };

  const openModal = () => {
    document.querySelector('.admin-modal-background').classList.add('open');
  };

  const closeModal = () => {
    document.querySelector('.admin-modal-background').classList.remove('open');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    var nutrientValuesArray = [];
    var tempNutrientValuesArray = nutrientValues
      .split(';')
      .map((item) => item.trim());
    for (var nutrientValue of tempNutrientValuesArray) {
      nutrientValue = nutrientValue.trim();
      var tempNutrientValues = nutrientValue
        .split(':')
        .map((item) => item.trim());
      nutrientValuesArray.push({
        name: tempNutrientValues[0],
        value: tempNutrientValues[1],
      });
    }
    let recommendedProducts = JSON.stringify([
      { id: recommendedProduct1 },
      { id: recommendedProduct2 },
      { id: recommendedProduct3 },
      { id: recommendedProduct4 },
    ]);
    if (
      name &&
      image1 &&
      // image2 &&
      // image3 &&
      // image4 &&
      price &&
      liftingPrice &&
      stock &&
      sellerName &&
      category &&
      subCategory &&
      vegan &&
      netWeight &&
      smallDescription &&
      detailedDescription &&
      recommendedProduct1 &&
      recommendedProduct2 &&
      recommendedProduct3 &&
      recommendedProduct4 &&
      !nutrientValuesArray.find((val) => !val.name || !val.value)
    ) {
      dispatch(
        saveProduct({
          id,
          originalId,
          name,
          image1,
          image2,
          image3,
          image4,
          price,
          liftingPrice,
          stock,
          sellerName,
          category,
          subCategory,
          vegan,
          netWeight,
          smallDescription,
          detailedDescription,
          recommendedProducts,
          nutrientValues: JSON.stringify(nutrientValuesArray),
          edit,
        })
      );
    } else {
      setErrorMessage('All fields are mandatory.');
    }
  };

  const setErrorMessage = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      pauseOnHover: false,
      autoClose: 3500,
    });
  };

  const confirmModalHandler = (product) => {
    setId(product.id);
    setConfirmModalVisible(true);
  };

  const deleteHandler = () => {
    dispatch(deleteProduct(id));
    setConfirmModalVisible(false);
  };

  const handleOutOfStock = (product) => {
    dispatch(outOfStockProduct(product.id));
  };

  const uploadImage1Handler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImage1(response.data);
        setUploading(false);
      })
      .catch((err) => {
        setUploading(false);
      });
  };

  const uploadImage2Handler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImage2(response.data);
        setUploading(false);
      })
      .catch((err) => {
        setUploading(false);
      });
  };

  const uploadImage3Handler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImage3(response.data);
        setUploading(false);
      })
      .catch((err) => {
        setUploading(false);
      });
  };

  const uploadImage4Handler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImage4(response.data);
        setUploading(false);
      })
      .catch((err) => {
        setUploading(false);
      });
  };

  const handleOnDrop = (data) => {
    for (const index in data) {
      if (index > 0 && data[index].data.length > 1) {
        var nutrientValues = [];
        for (var i = 20; i < data[index].data.length; i++) {
          if (data[index].data[i].length > 1) {
            var nutrientValue = data[index].data[i]
              .split(':')
              .map((item) => item.trim());
            nutrientValues.push({
              name: nutrientValue[0],
              value: nutrientValue[1],
            });
          }
        }

        dispatch(
          saveProductFromCsv({
            id: data[index].data[0],
            name: data[index].data[1],
            liftingPrice: data[index].data[2],
            price: data[index].data[3],
            stock: data[index].data[4],
            sellerName: data[index].data[5],
            image1: data[index].data[6],
            image2: data[index].data[7],
            image3: data[index].data[8],
            image4: data[index].data[9],
            category: data[index].data[10].replace(' & ', ' and '),
            subCategory: data[index].data[11].replace(' & ', ' and '),
            netWeight: data[index].data[12],
            vegan: data[index].data[13],
            smallDescription: data[index].data[14],
            detailedDescription: data[index].data[15],
            recommendedProducts: [
              { id: data[index].data[16] },
              { id: data[index].data[17] },
              { id: data[index].data[18] },
              { id: data[index].data[19] },
            ],
            nutrientValues: nutrientValues,
          })
        );
      }
    }
  };

  const handleOnError = (err, file, inputElem, reason) => {};

  const handleOnRemoveFile = (data) => {};

  const categoryHandler = (category) => {
    setCategory(category);
    for (var Category of categories) {
      if (Category.name === category) {
        setSubCategoryArray(Category.subCategories);
        break;
      }
    }
  };

  const headers = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Price', key: 'price' },
    { label: 'Net Weight', key: 'netWeight' },
    { label: 'Category', key: 'category' },
    { label: 'Sub Category', key: 'subCategory' },
    { label: 'Stock', key: 'stock' },
    { label: 'Out of Stock', key: 'OutofStock' },
    { label: 'Action', key: 'Action' },
  ];

  let products2 = products.map((x) => {
    // {"id" : x.id}
  });

  const csvReport = {
    headers: headers,
    filename: 'Product_CSV.csv',
  };

  return (
    <div className="grid">
      <div className="grid-header">
        <Header></Header>
      </div>

      <Modal
        show={confirmModalVisible}
        onHide={() => setConfirmModalVisible(false)}
        centered
        dialogClassName="modal-35w"
      >
        <Modal.Body>
          <div className="confirm-container">
            <div className="confirm-no-icon">
              <FiXCircle></FiXCircle>
            </div>
            <div className="confirm-heading">Are you sure?</div>
            <div className="confirm-text">
              Do you really want to delete this product? This process cannot be
              undone.
            </div>
            <div className="confirm-buttons">
              <Button
                onClick={() => setConfirmModalVisible(false)}
                className="confirm-no-button"
              >
                No
              </Button>
              <Button onClick={deleteHandler} className="confirm-yes-button">
                Yes
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="admin-modal-background">
        {loadingCategories ? (
          <div></div>
        ) : errorCategories ? (
          <div>{errorCategories.message}</div>
        ) : (
          <div className="admin-modal">
            <div className="d-flex justify-content-between align-items-center">
              <div className="admin-modal-heading">Enter Product Details</div>
              <Button onClick={closeModal} className="admin-modal-close-button">
                <FiX></FiX>
              </Button>
            </div>
            <div className="admin-modal-div">
              <form
                className="admin-modal-form"
                onSubmit={(e) => {
                  submitHandler(e);
                  setoriginalId();
                }}
              >
                <div className="admin-modal-form-div">
                  <label className="admin-modal-form-label">
                    ID<span className="asterisk-mandatory">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="ID"
                    value={id}
                    placeholder="Eg. farmroots1"
                    onChange={(e) => setId(e.target.value)}
                    className="admin-modal-form-input"
                  ></input>
                </div>
                <div className="admin-modal-form-div">
                  <label className="admin-modal-form-label">
                    Name<span className="asterisk-mandatory">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Eg. Jeera"
                    onChange={(e) => setName(e.target.value)}
                    className="admin-modal-form-input"
                  ></input>
                </div>
                <div className="admin-modal-form-div">
                  <label className="admin-modal-form-label">
                    Image 1<span className="asterisk-mandatory">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="file"
                    name="image1"
                    onChange={uploadImage1Handler}
                    className="admin-modal-form-input"
                  ></input>
                </div>
                <div className="admin-modal-form-div">
                  <label className="admin-modal-form-label">
                    Image 2<span className="asterisk-mandatory">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="file"
                    name="image2"
                    onChange={uploadImage2Handler}
                    className="admin-modal-form-input"
                  ></input>
                </div>
                <div className="admin-modal-form-div">
                  <label className="admin-modal-form-label">
                    Image 3<span className="asterisk-mandatory">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="file"
                    name="image3"
                    onChange={uploadImage3Handler}
                    className="admin-modal-form-input"
                  ></input>
                </div>
                <div className="admin-modal-form-div">
                  <label className="admin-modal-form-label">
                    Image 4<span className="asterisk-mandatory">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="file"
                    name="image4"
                    onChange={uploadImage4Handler}
                    className="admin-modal-form-input"
                  ></input>
                </div>
                <div className="admin-modal-form-div">
                  <label className="admin-modal-form-label">
                    Lifting Price<span className="asterisk-mandatory">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="price"
                    value={liftingPrice}
                    placeholder="Eg. 350"
                    onChange={(e) => setLiftingPrice(e.target.value)}
                    className="admin-modal-form-input"
                  ></input>
                </div>
                <div className="admin-modal-form-div">
                  <label className="admin-modal-form-label">
                    Selling Price<span className="asterisk-mandatory">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="price"
                    value={price}
                    placeholder="Eg. 350"
                    onChange={(e) => setPrice(e.target.value)}
                    className="admin-modal-form-input"
                  ></input>
                </div>
                <div className="admin-modal-form-div">
                  <label className="admin-modal-form-label">
                    Stock<span className="asterisk-mandatory">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="price"
                    value={stock}
                    placeholder="Eg. 350"
                    onChange={(e) => setStock(e.target.value)}
                    className="admin-modal-form-input"
                  ></input>
                </div>
                <div className="admin-modal-form-div">
                  <label className="admin-modal-form-label">
                    Seller Name<span className="asterisk-mandatory">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="price"
                    value={sellerName}
                    placeholder="Eg. Aakash"
                    onChange={(e) => setSellerName(e.target.value)}
                    className="admin-modal-form-input"
                  ></input>
                </div>
                <div className="admin-modal-form-div">
                  <label className="admin-modal-form-label">
                    Category<span className="asterisk-mandatory">*</span>
                  </label>
                  <select
                    name="category"
                    value={category}
                    onChange={(e) => categoryHandler(e.target.value)}
                    className="admin-modal-form-select"
                  >
                    <option value="">Please select your option</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="admin-modal-form-div">
                  <label className="admin-modal-form-label">
                    Sub Category<span className="asterisk-mandatory">*</span>
                  </label>
                  <select
                    name="category"
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="admin-modal-form-select"
                  >
                    <option value="">Please select your option</option>
                    {subCategoryArray.map((category) => (
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="admin-modal-form-div">
                  <label className="admin-modal-form-label">
                    Net Weight<span className="asterisk-mandatory">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="netWeight"
                    value={netWeight}
                    placeholder="Eg. 400 grams"
                    onChange={(e) => setNetWeight(e.target.value)}
                    className="admin-modal-form-input"
                  ></input>
                </div>
                <div className="admin-modal-form-div">
                  <label className="admin-modal-form-label">
                    Vegan<span className="asterisk-mandatory">*</span>
                  </label>
                  <select
                    name="vegan"
                    value={vegan.toUpperCase()}
                    onChange={(e) => setVegan(e.target.value)}
                    className="admin-modal-form-select"
                  >
                    <option value="">Please select your option</option>
                    <option value="TRUE">True</option>
                    <option value="FALSE">False</option>
                  </select>
                </div>
                <div className="admin-modal-form-div">
                  <label className="admin-modal-form-label">
                    Small Description
                    <span className="asterisk-mandatory">*</span>
                  </label>
                  <textarea
                    type="text"
                    name="smallDescription"
                    value={smallDescription}
                    placeholder="Eg. Natural and fresh product"
                    onChange={(e) => setSmallDescription(e.target.value)}
                    className="admin-modal-form-textarea-small"
                  ></textarea>
                </div>
                <div className="admin-modal-form-div">
                  <label className="admin-modal-form-label">
                    Detailed Description
                    <span className="asterisk-mandatory">*</span>
                  </label>
                  <textarea
                    type="text"
                    name="detailedDescription"
                    value={detailedDescription}
                    placeholder="Eg. This ingredient is mostly used for cooking spicy food..."
                    onChange={(e) => setDetailedDescription(e.target.value)}
                    className="admin-modal-form-textarea-detail"
                  ></textarea>
                </div>
                <div className="admin-modal-form-div">
                  <label className="admin-modal-form-label">
                    Recommended Product 1 ID
                    <span className="asterisk-mandatory">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="recommendedProduct1"
                    value={recommendedProduct1}
                    placeholder="Eg. farmroots1"
                    onChange={(e) => setRecommendedProduct1(e.target.value)}
                    className="admin-modal-form-input"
                  ></input>
                </div>
                <div className="admin-modal-form-div">
                  <label className="admin-modal-form-label">
                    Recommended Product 2 ID
                    <span className="asterisk-mandatory">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="recommendedProduct2"
                    value={recommendedProduct2}
                    placeholder="Eg. farmroots2"
                    onChange={(e) => setRecommendedProduct2(e.target.value)}
                    className="admin-modal-form-input"
                  ></input>
                </div>
                <div className="admin-modal-form-div">
                  <label className="admin-modal-form-label">
                    Recommended Product 3 ID
                    <span className="asterisk-mandatory">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="recommendedProduct3"
                    value={recommendedProduct3}
                    placeholder="Eg. farmroots3"
                    onChange={(e) => setRecommendedProduct3(e.target.value)}
                    className="admin-modal-form-input"
                  ></input>
                </div>
                <div className="admin-modal-form-div">
                  <label className="admin-modal-form-label">
                    Recommended Product 4 ID
                    <span className="asterisk-mandatory">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="recommendedProduct4"
                    value={recommendedProduct4}
                    placeholder="Eg. farmroots4"
                    onChange={(e) => setRecommendedProduct4(e.target.value)}
                    className="admin-modal-form-input"
                  ></input>
                </div>
                {/* <div className="admin-modal-form-div">
                            <label className="admin-modal-form-label">Popup Video</label>
                            <input autoComplete="off" type="text" name="popupVideo" value={popupVideo} placeholder="Eg. C:/Users/Admin/Desktop/test.png" onChange={(e) => setPopupVideo(e.target.value)} className="admin-modal-form-input"></input>
                        </div>
                        <div className="admin-modal-form-div">
                            <label className="admin-modal-form-label">Popup Product ID</label>
                            <input autoComplete="off" type="text" name="popupProductId" value={popupProductId} placeholder="Eg. farmroots1" onChange={(e) => setPopupProductId(e.target.value)} className="admin-modal-form-input"></input>
                        </div> */}
                <div className="admin-modal-form-div">
                  <label className="admin-modal-form-label">
                    Nutrient Values<span className="asterisk-mandatory">*</span>
                  </label>
                  <textarea
                    type="text"
                    name="nutrientValues"
                    value={nutrientValues}
                    placeholder="Eg. Fat:9 grams; Protein:20 grams; Carbohydrates:30 grams"
                    onChange={(e) => setNutrientValues(e.target.value)}
                    className="admin-modal-form-textarea-small"
                  ></textarea>
                </div>
                <div className="admin-modal-form-div d-flex justify-content-end">
                  <Button type="submit" className="admin-modal-form-submit">
                    Submit
                  </Button>
                </div>
              </form>
              <div className="admin-modal-image-div">
                <img src={image1} className="admin-modal-image"></img>
                <img src={image2} className="admin-modal-image"></img>
                <img src={image3} className="admin-modal-image"></img>
                <img src={image4} className="admin-modal-image"></img>
                {/* {popupVideo !== '' && <video width="272" height="153" autoPlay="true" loop="true" muted="true">
                            <source src={popupVideo} type="video/mp4"></source>
                        </video>} */}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="main">
        <div className="d-flex">
          <UploadSidebar value="Product"></UploadSidebar>
          <div className="admin-content">
            {loading ? (
              <div></div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              <div>
                <div className="admin-header">
                  <div className="admin-header-text">Products</div>
                  <div className="d-flex align-items-center">
                    <div
                      className="admin-uploads-div"
                      style={{ margin: '0rem' }}
                    >
                      <CSVReader
                        onDrop={handleOnDrop}
                        onError={handleOnError}
                        noDrag
                        addRemoveButton
                        onRemoveFile={handleOnRemoveFile}
                      >
                        <span>Click to upload CSV</span>
                      </CSVReader>
                    </div>
                    {/* <CSVLink>
                      {" "}
                      <Button
                        className="admin-header-button"
                        onClick={openAddModal}
                      >
                        Download CSV
                      </Button>
                    </CSVLink> */}
                    <csvlink {...csvReport} target="_blank">
                      <button className="admin-header-button">
                        Export to CSV
                      </button>
                    </csvlink>
                    <Button
                      className="admin-header-button"
                      onClick={openAddModal}
                    >
                      Create Product
                    </Button>
                  </div>
                </div>
                <div>
                  <table className="table table-striped table-bordered">
                    <thead style={{ fontSize: '1.8rem' }}>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Net Weight</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Stock</th>
                        <th>Out of Stock</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{product.netWeight}</td>
                          <td>{product.category}</td>
                          <td>{product.subCategory}</td>
                          <td>{product.stock}</td>
                          <td>
                            <Switch
                              onChange={() => handleOutOfStock(product)}
                              checked={product.outOfStock}
                            ></Switch>
                          </td>
                          <td className="d-flex">
                            <Button
                              className="admin-table-button"
                              onClick={() => openEditModal(product)}
                            >
                              Edit
                            </Button>
                            <Button
                              className="admin-table-button"
                              onClick={() => confirmModalHandler(product)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default UploadProductScreen;
