import { useDispatch, useSelector } from "react-redux";
import logo from "/dicLogo1.png";
import { RootState } from "../../app/store";
import { setDialog } from "../../features/DialogBox/DialogSlice";
import { useState, useEffect } from "react";
import {
  setTitleDescription,
  setTitleValue,
} from "../../features/TextValue/TextValueSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [errorTitle, setErrorTitle] = useState<string>("");
  const [errorDescription, setErrorDescription] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Dialog = useSelector((state: RootState) => state.dialogBox.value);
  const title = useSelector((state: RootState) => state.text.Textvalue);
  const description = useSelector(
    (state: RootState) => state.text.TextDescription
  );

  useEffect(() => {
    const savedTitle = localStorage.getItem("projectTitle");
    const savedDescription = localStorage.getItem("projectDescription");

    if (savedTitle) {
      dispatch(setTitleValue(savedTitle));
    }
    if (savedDescription) {
      dispatch(setTitleDescription(savedDescription));
    }
  }, [dispatch]);

  const handleToggle = () => {
    dispatch(setDialog(true));
  };

  const handleClose = () => {
    dispatch(setDialog(false));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;
    if (title.trim().length === 0) {
      setErrorTitle("Title is required!");
      valid = false;
    } else {
      setErrorTitle("");
    }

    if (description.trim().length === 0) {
      setErrorDescription("Description is required!");
      valid = false;
    } else {
      setErrorDescription("");
    }

    if (valid) {
      localStorage.setItem("projectTitle", title);
      localStorage.setItem("projectDescription", description);
      dispatch(setDialog(false));
      navigate("/projectTask");
    }
  };

  return (
    <>
      <div
        className={`main-section relative ${
          Dialog ? "blur-sm" : "blur-none"
        } transition-all`}
      >
        <div className="image-container">
          <img src={logo} className="main-logo" alt="Logo" />
        </div>
        <div className="heading-section">
          <p className="heading1">Think, plan, and track</p>
          <p className="heading2">all in one place</p>
          <p className="head-text">
            Efficiently manage your tasks and boost productivity
          </p>
        </div>
        <button className="create-button" onClick={handleToggle}>
          Create Project
        </button>
      </div>

      {Dialog && (
        <div className="main-dialog-section">
          <div className="dialog-section">
            <button className="cross-icon" onClick={handleClose}>
              ✖
            </button>
            <h3 className="text-heading ">Create New Project</h3>
            <form className="form-section" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="project-title"
                  className="block font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  id="project-title"
                  name="project-title" // Added name attribute
                  type="text"
                  className="title-input"
                  placeholder="Enter project title"
                  value={title}
                  onChange={(e) => dispatch(setTitleValue(e.target.value))}
                />
              </div>
              <span>
                {errorTitle && (
                  <span className="text-red-500">{errorTitle}</span>
                )}
              </span>
              <div>
                <label
                  htmlFor="project-description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="project-description"
                  name="project-description" // Added name attribute
                  rows={3}
                  className="title-description"
                  placeholder="Enter project description"
                  value={description}
                  onChange={(e) =>
                    dispatch(setTitleDescription(e.target.value))
                  }
                ></textarea>
                {errorDescription && (
                  <span className="text-red-500">{errorDescription}</span>
                )}
              </div>
              <button type="submit" className="btn">
                Create Project
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;
