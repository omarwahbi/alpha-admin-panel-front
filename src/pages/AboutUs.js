import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import api from "../Components/Api";

export default function AboutUs() {
  const navigate = useNavigate();
  const [aboutUs, setAboutUs] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/aboutUs");
        setAboutUs(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handelInput = (e) => {
    const { name, value } = e.target;
    setAboutUs((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const handelEdit = async () => {
    try {
      await api.put("/aboutUs/edit", {
        company_description: aboutUs.company_description,
        years_experince: aboutUs.years_experince,
        num_projects: aboutUs.num_projects,
      });
      window.location.reload();
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        navigate("/login");
      }
    }
  };
  return (
    <div>
      <Navbar />
      <div className="card text-center w-50 m-auto mt-5">
        <div className="card-header fw-bold">About Us</div>
        <div className="card-body">
          <h5 className="card-title">
            Years of experince: {aboutUs.years_experince}
          </h5>
          <h5 className="card-title">
            Number of projects: {aboutUs.num_projects}
          </h5>
          <p className="card-text">{aboutUs.company_description}</p>

          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Edit
          </button>

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
                    Edit about us information
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="years_experince" className="col-form-label">
                      Years of experince:
                    </label>
                    <input
                      type="number"
                      name="years_experince"
                      className="form-control"
                      id="years_experince"
                      value={aboutUs.years_experince || ""}
                      onChange={handelInput}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="num_projects" className="col-form-label">
                      Number of projects:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="num_projects"
                      name="num_projects"
                      value={aboutUs.num_projects || ""}
                      onChange={handelInput}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="col-form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      value={aboutUs.company_description || ""}
                      name="company_description"
                      onChange={handelInput}
                    ></textarea>
                  </div>
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
                    onClick={handelEdit}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
