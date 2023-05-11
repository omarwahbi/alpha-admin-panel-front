import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import api from "../Components/Api";

export default function ContactUs() {
  const [forms, setForms] = useState([]);
  const [form, setForm] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/contactUs");
        setForms(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const handelview = async (id) => {
    try {
      const res = await api.get(`/contactUs/${id}`);
      setForm(res.data[0]);
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 401) {
        navigate("/login");
      }
    }
  };
  const handelDelete = async (id) => {
    try {
      await api.delete(`/contactUs/${id}`, { withCredentials: true });
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
      <h2 className="text-center mt-3">Contact us requests</h2>
      <div className="container">
        <div class="row row-cols-1 row-cols-md-3 g-4">
          {forms.length !== 0 ? (
            forms.map((data) => {
              return (
                <div class="col mt-5">
                  <div class="card" style={{ width: "18rem" }}>
                    <div class="card-body">
                      <h5 class="card-title">{data.project_name}</h5>
                      <h6 class="card-subtitle mb-2 text-body-secondary">
                        {data.name}
                      </h6>
                      <p class="card-text">{data.description}</p>
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
                                {form.project_name}
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div
                              class="card modal-body"
                              style={{ width: "18rem;" }}
                            >
                              <ul class="list-group list-group-flush">
                                <li class="list-group-item">
                                  Company name: {form.project_name}
                                </li>
                                <li class="list-group-item">
                                  Name: {form.name}
                                </li>
                                <li class="list-group-item">
                                  Position: {form.position}
                                </li>
                                <li class="list-group-item">
                                  Phone number: {form.phone_number}
                                </li>
                                <li class="list-group-item">
                                  Email: {form.email}
                                </li>
                                <li class="list-group-item">
                                  Description: {form.description}
                                </li>
                              </ul>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={() => setForm([])}
                              >
                                Close
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
                              {data.project_name} request?
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
                                onClick={() => handelDelete(data.ID)}
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
            <h1>Nothing to show (No requests YET)</h1>
          )}
        </div>
      </div>
    </div>
  );
}
