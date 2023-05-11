import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import api from "../Components/Api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [inputCount, setInputCount] = useState(0);
  const [inputValues, setInputValues] = useState([]);
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProjects();
    fetchCategories();
  }, []);
  const handleAddInput = () => {
    setInputCount(inputCount + 1); // Increment input count
    setInputValues([...inputValues, ""]); // Add an empty string to input values array
  };
  const handleInputChange = (index, e) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = e.target.value; // Update input value at the specified index
    setInputValues(newInputValues); // Update input values state
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setProject((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  const handleCategory = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");
    setProject((prevInputs) => ({
      ...prevInputs,
      category_ID: option,
    }));
  };
  const handelAdd = async (project) => {
    try {
      await api.post(
        `/projects`,
        {
          project_name: project.project_name,
          project_cover_URL: project.project_cover_URL,
          project_category_ID: project.category_ID,
          time: new Date().toISOString().slice(11, 19),
          date: new Date().toISOString().slice(0, 10),
          project_ID: project.project_ID,
          img_URL: inputValues,
        },
        { withCredentials: true }
      );
      window.location.reload();
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 401) {
        navigate("/login");
      }
    }
  };
  const handleDeleteInput = (index) => {
    setInputCount(inputCount - 1); // Decrement input count
    const newInputValues = [...inputValues];
    newInputValues.splice(index, 1); // Remove input value at the specified index
    setInputValues(newInputValues); // Update input values state
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="add-button-container">
          <button
            type="button"
            className="btn btn-primary add-button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add a project
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
                  Add Project
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
                  Project name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="company-name"
                  name="project_name"
                  required
                  onChange={handleInput}
                />
                <label htmlFor="description" className="col-form-label">
                  Project cover URL:
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="description"
                  name="project_cover_URL"
                  onChange={handleInput}
                />
                <label htmlFor="description" className="col-form-label">
                  Project category :
                </label>
                <select
                  name="project_category_ID"
                  onChange={handleCategory}
                  defaultValue="Select a category"
                >
                  <option value="Select a category" disabled>
                    Select a category
                  </option>
                  {categories ? (
                    categories.map((e) => {
                      return (
                        <option key={e.ID} id={e.ID} value={e.category_name}>
                          {e.category_name}
                        </option>
                      );
                    })
                  ) : (
                    <option value="">No categories found</option>
                  )}
                </select>
              </div>
              <div>
                <button onClick={handleAddInput} className="btn btn-info ms-3">
                  Add Image
                </button>
                <div>
                  {inputValues.map((value, index) => (
                    <div className="ms-3" key={index}>
                      <label htmlFor={index} className="col-form-label ms-1">
                        Image URL {index}
                      </label>
                      <input
                        id={index}
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                      <button onClick={() => handleDeleteInput(index)}>
                        Delete
                      </button>
                    </div>
                  ))}
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
                  onClick={() => handelAdd(project)}
                >
                  Add Project
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {projects.length !== 0 ? (
            projects.map((data) => {
              return (
                <Link state={project} to={`/project/${data.ID}`} key={data.ID}>
                  <div className="col">
                    <div className="card">
                      <img
                        src={data.project_cover_URL}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">{data.project_name}</h5>
                      </div>
                    </div>
                  </div>
                </Link>
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
