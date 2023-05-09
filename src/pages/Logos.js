import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import api from "../Components/Api";

export default function Logos() {
  const [logos, setLogos] = useState([]);
  const [logo, setLogo] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/logos");
        setLogos(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const handelview = async (id) => {
    try {
      const res = await api.get(`/logos/${id}`);
      setLogo(res.data[0]);
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 401) {
        navigate("/login");
      }
    }
  };
  const handelDelete = async (id) => {
    try {
      await api.delete(`/logos/${id}`);
      window.location.reload();
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 401) {
        navigate("/login");
      }
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setLogo((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  const handelEdit = async (logo) => {
    try {
      await api.put(`/logos/${logo.ID}`, {
        company_name: logo.company_name,
        logo_url: logo.logo_url,
      });
      window.location.reload();
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 401) {
        navigate("/login");
      }
    }
  };
  const handelAdd = async (logo) => {
    try {
      await api.post(`/logos`, {
        company_name: logo.company_name,
        logo_url: logo.logo_url,
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
      <h2 className="text-center mt-3">Logos</h2>
      <div className="container">
        <div className="add-button-container">
          <button
            type="button"
            className="btn btn-primary add-button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add a logo
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
                  Logo URL:
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="description"
                  name="logo_url"
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
                  onClick={() => handelAdd(logo)}
                >
                  Add logo
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {logos.length !== 0 ? (
            logos.map((data) => {
              return (
                <div className="col" key={data.ID}>
                  <div className="card">
                    <img
                      src={data.logo_url}
                      className="card-img-top"
                      alt="company logo"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{data.company_name}</h5>
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
                                Edit logo
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
                                value={logo.company_name || ""}
                              />
                              <label
                                htmlFor="description"
                                className="col-form-label"
                              >
                                Logo URL
                              </label>
                              <input
                                required
                                type="text"
                                name="logo_url"
                                className="form-control"
                                id="companyName"
                                onChange={handleInput}
                                value={logo.logo_url || ""}
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
                                onClick={() => handelEdit(logo)}
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
                              {logo.company_name} logo?
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
                                onClick={() => handelDelete(logo.ID)}
                              >
                                YES I'M SURE
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
