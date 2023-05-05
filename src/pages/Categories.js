import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const handelview = async (id) => {
    try {
      const res = await axios.get(`/categories/${id}`);
      setCategory(res.data[0]);
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 401) {
        navigate("/login");
      }
    }
  };
  const handelDelete = async (id) => {
    try {
      await axios.delete(`/categories/${id}`);
      window.location.reload();
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 401) {
        navigate("/login");
      }
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setCategory((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  const handelEdit = async (category) => {
    try {
      await axios.put(`/categories/${category.ID}`, {
        category_name: category.category_name,
      });
      window.location.reload();
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 401) {
        navigate("/login");
      }
    }
  };
  const handelAdd = async (category) => {
    console.log(category);
    try {
      await axios.post(`/categories`, {
        category_name: category.category_name,
      });
      window.location.reload();
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <h2 className="text-center mt-3">Categories</h2>
      <div className="container">
        <div className="add-button-container">
          <button
            type="button"
            className="btn btn-primary add-button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add a category
          </button>
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Add a category
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <label htmlFor="company-name" className="col-form-label">
                  Category name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="company-name"
                  name="category_name"
                  required
                  onChange={handleInput}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handelAdd(category)}
                >
                  Add category
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-2 mb-5">
          {categories.length !== 0 ? (
            categories.map((data) => {
              return (
                <div className="col" key={data.ID}>
                  <div className="card me-5 mt-5" style={{ width: " 18rem" }}>
                    <div className="card-body">
                      <h5 className="card-title">{data.category_name}</h5>
                      <button
                        type="button"
                        className="btn btn-primary card-link me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#editModal"
                        onClick={() => handelview(data.ID)}
                      >
                        Edit
                      </button>

                      <div
                        className="modal fade"
                        id="editModal"
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        tabIndex="-1"
                        aria-labelledby="editText"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="editText">
                                Edit category
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <label
                                htmlFor="companyName"
                                className="col-form-label"
                              >
                                Category name
                              </label>
                              <input
                                required
                                type="text"
                                name="category_name"
                                className="form-control"
                                id="description"
                                onChange={handleInput}
                                value={category.category_name || ""}
                              />
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => handelEdit(category)}
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-danger card-link me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                        onClick={() => handelview(data.ID)}
                      >
                        DELETE
                      </button>

                      <div
                        className="modal fade"
                        id="deleteModal"
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        tabIndex="-1"
                        aria-labelledby="deleteConfirmation"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1
                                className="modal-title fs-5"
                                id="deleteConfirmation"
                              >
                                ARE YOU SURE YOU WANT TO DELETE?
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              Are you sure you want to delete{" "}
                              {category.category_name} category?
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={() => handelDelete(category.ID)}
                              >
                                YES I'M SURE
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary card-link"
                        data-bs-toggle="modal"
                        data-bs-target="#viewModal"
                        onClick={() => {
                          handelview(data.ID);
                        }}
                      >
                        View
                      </button>
                      <div
                        className="modal fade"
                        id="viewModal"
                        tabIndex="-1"
                        aria-labelledby="viewCompanyName"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1
                                className="modal-title fs-5"
                                id="viewCompanyName"
                              >
                                {category.category_name}
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              {category.category_name}
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={() => setCategory([])}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>Nothing to show</h1>
          )}
        </div>
      </div>
    </div>
  );
}
