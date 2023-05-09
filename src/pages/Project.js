import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Components/Api";

export default function Project() {
  const navigate = useNavigate();
  const [project, setProject] = useState();
  const [categories, setCategories] = useState([]);
  const [inputCount, setInputCount] = useState(0);
  const [inputValues, setInputValues] = useState([]);
  const [category, setCategory] = useState();
  const { id } = useParams();

  useEffect(() => {
    const handleView = async () => {
      return new Promise((resolve, reject) => {
        api
          .get(`/projects/${id}`)
          .then((res) => {
            setProject(res.data.projectData[0]);
            const data = res.data.projectImagesData.map((image) => ({
              ...image,
            }));
            setInputValues(data);
            resolve(res.data.projectData[0]);
          })
          .catch((error) => {
            if (
              error.response
                ? error.response.status === 403 || error.response.status === 401
                : false
            ) {
              navigate("/login");
            } else {
              console.log(error);
            }
            reject(error);
          });
      });
    };

    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    handleView()
      .then(async (projectData) => {
        try {
          const res = await api.get(
            `/categories/${projectData.project_category_ID}`
          );
          setCategory(res.data);
        } catch (error) {
          if (
            error.response &&
            (error.response.status === 403 || error.response.status === 401)
          ) {
            navigate("/login");
          } else {
            console.log(error);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    fetchCategories();
  }, [id, navigate]);
  const handleCategory = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");
    setProject((prevInputs) => ({
      ...prevInputs,
      project_category_ID: option,
    }));
  };
  const handleAddInput = () => {
    setInputCount(inputCount + 1); // Increment input count
    setInputValues([...inputValues, {}]); // Add an empty string to input values array
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setProject((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  const handleInputChange = (index, e) => {
    const newInputValues = [...inputValues];
    newInputValues[index].img_URL = e.target.value; // Update input value at the specified index
    setInputValues(newInputValues); // Update input values state
  };
  const handelEdit = async () => {
    try {
      await api.put(`/projects/${id}`, {
        project_name: project.project_name,
        project_cover_URL: project.project_cover_URL,
        project_category_ID: project.project_category_ID,
        project_ID: project.project_ID,
        img_URL: inputValues,
      });
      window.location.reload();
    } catch (error) {
      if (
        error.response
          ? error.response.status === 403 || error.response.status === 401
          : false
      ) {
        navigate("/login");
      } else {
        console.log(error);
      }
    }
  };
  const handleDeleteInput = (index) => {
    setInputCount(inputCount - 1); // Decrement input count
    const newInputValues = [...inputValues];
    newInputValues.splice(index, 1); // Remove input value at the specified index
    setInputValues(newInputValues); // Update input values state
  };

  const handelDelete = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      navigate("/projects");
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="container mt-3">
      {project ? (
        <div className="d-flex justify-content-center flex-column">
          <div className="card" style={{ width: "18rem" }}>
            <img
              src={project.project_cover_URL}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title fw-bold">
                Project name: {project.project_name}
              </h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item fw-bold">
                Category: {category ? category[0].category_name : null}
              </li>
            </ul>
            <div className="card-body">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Edit Project
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
                        value={project.project_name || ""}
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
                        value={project.project_cover_URL}
                        onChange={handleInput}
                      />
                      <label htmlFor="description" className="col-form-label">
                        Project category :
                      </label>
                      <select
                        name="project_category_ID"
                        onChange={handleCategory}
                        defaultValue={
                          category
                            ? category[0].category_name
                            : "Select a category"
                        }
                      >
                        <option value="Select a category" disabled>
                          Select a category
                        </option>
                        {categories ? (
                          categories.map((e) => {
                            return (
                              <option
                                key={e.ID}
                                id={e.ID}
                                value={e.category_name}
                              >
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
                      <button
                        onClick={handleAddInput}
                        className="btn btn-info ms-3"
                      >
                        Add Image
                      </button>
                      <div>
                        {inputValues.map((value, index) => (
                          <div className="ms-3" key={index}>
                            <label
                              htmlFor={index}
                              className="col-form-label ms-1"
                            >
                              Image URL {index}
                            </label>
                            <input
                              id={index}
                              type="text"
                              value={value.img_URL}
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
                        onClick={() => handelEdit(project)}
                      >
                        Update Project
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
                      <h1 className="modal-title fs-5" id="deleteConfirmation">
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
                      Are you sure you want to delete "{project.project_name}"
                      project?
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
                        onClick={() => handelDelete(id)}
                      >
                        YES I'M SURE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {inputValues.map((img, i) => {
            return <img src={img.img_URL} alt="project_image" key={i} />;
          })}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
