import React from "react";
import AdminNavbar from "./components/AdminNavbar";
import { GiHamburgerMenu } from "react-icons/gi";
import { toggle } from "../../redux/slices/navSlice";
import { useDispatch, useSelector } from "react-redux";
import CreateProject from "./components/CreateProject";
import CreateSkill from "./components/CreateSkill";
import AllProjects from "./components/AllProjects";
import AllSkills from "./components/AllSkills";
function AdminDashboard() {
  const { toggleNav } = useSelector((store) => store.nav);
  const {page} = useSelector(store => store.page)
  const dispatch = useDispatch();
  return (
    <div>
      <AdminNavbar />
      <GiHamburgerMenu
        onClick={() => dispatch(toggle())}
        className={`fixed top-5 right-5 z-10 text-xl hover:scale-125 cursor-pointer text-white hover:text-red-400  ${
          toggleNav ? "hidden z-0" : "block"
        }`}
      />
      <div className="">
        {
          (() => {
            switch(page){
              case "createProject":
                return <CreateProject/>
              case "createSkill":
                return <CreateSkill/>
              case "AllProjects":
                return <AllProjects/>
              case "AllSkills":
                return <AllSkills/>
                default :
                return <CreateProject/>
            }
          })()
        }
      </div>
    </div>
  );
}

export default AdminDashboard;
