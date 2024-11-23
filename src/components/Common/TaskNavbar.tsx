import logo from "/dicLogo1.png";

const TaskNavbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="flex">
          <div>
            <img src={logo} className="h-[60px]" alt="logo" />
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskNavbar;
