import { Plus } from "lucide-react";
import logo from "/dicLogo1.png";
import { useDispatch } from "react-redux";
import { setDialog } from "../../features/DialogBox/DialogSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(setDialog(true));
  };
  return (
    <>
      <div className="navbar">
        {/* <div className=""> */}
        <div className="flex">
          <div>
            <img src={logo} className="h-[60px]" alt="" />
          </div>

          {/* <div>
            <h3 className="logo-text">MB</h3>
          </div> */}
        </div>
        {/* </div> */}
        <div className="button-section">
          <button className="create-button ">
            <Plus className="plus-icon" />
            <span className="btn-text" onClick={handleToggle}>
              Create Project
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
