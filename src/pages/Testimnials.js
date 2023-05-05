import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Testimnials() {
  const [testimonials, setTestimonials] = useState([]);
  const [testimonial, setTestimonial] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/testimonials");
        setTestimonials(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const handelview = async (id) => {
    try {
      const res = await axios.get(`/testimonials/${id}`);
      setTestimonial(res.data[0]);
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 401) {
        navigate("/login");
      }
    }
  };
  const handelDelete = async (id) => {
    try {
      await axios.delete(`/testimonials/${id}`);
      window.location.reload();
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 401) {
        navigate("/login");
      }
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setTestimonial((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  const handelEdit = async (testimonial) => {
    try {
      await axios.put(`/testimonials/${testimonial.ID}`, {
        company_name: testimonial.company_name,
        text: testimonial.text,
      });
      window.location.reload();
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 401) {
        navigate("/login");
      }
    }
  };
  const handelAdd = async (testimonial) => {
    console.log(testimonial);
    try {
      await axios.post(`/testimonials`, {
        company_name: testimonial.company_name,
        text: testimonial.text,
      });
      window.location.reload();
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 401) {
        navigate("/login");
      }
    }
  };
  // useEffect(() => {
  //   console.log(testimonial);
  // }, [testimonial]);
  return (
    <div>
      <Navbar />
      <h2 className="text-center mt-3">Testimonials</h2>
      <div className="container">
        <div className="add-button-container">
          <button
            type="button"
            className="btn btn-primary add-button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add a testimonial
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
                  Add Testimonial
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
                  Company name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="company-name"
                  name="company_name"
                  required
                  onChange={handleInput}
                />
                <label htmlFor="description" className="col-form-label">
                  Description:
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="description"
                  name="text"
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
                  onClick={() => handelAdd(testimonial)}
                >
                  Add testimonial
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-2 mb-5">
          {testimonials.length !== 0 ? (
            testimonials.map((data) => {
              return (
                <div className="col" key={data.ID}>
                  <div className="card me-5 mt-5" style={{ width: " 18rem" }}>
                    <div className="card-body">
                      <h5 className="card-title">{data.company_name}</h5>
                      <p className="card-text">{data.text}</p>
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
                                Edit testimonial
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
                                company name
                              </label>
                              <input
                                required
                                type="text"
                                name="company_name"
                                className="form-control"
                                id="description"
                                onChange={handleInput}
                                value={testimonial.company_name || ""}
                              />
                              <label
                                htmlFor="description"
                                className="col-form-label"
                              >
                                Description
                              </label>
                              <input
                                required
                                type="text"
                                name="text"
                                className="form-control"
                                id="companyName"
                                onChange={handleInput}
                                value={testimonial.text || ""}
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
                                onClick={() => handelEdit(testimonial)}
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
                              {testimonial.company_name} testimonial?
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
                                onClick={() => handelDelete(testimonial.ID)}
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
                                {testimonial.company_name}
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">{testimonial.text}</div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={() => setTestimonial([])}
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
