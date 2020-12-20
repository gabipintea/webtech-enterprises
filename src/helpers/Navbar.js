import React, { useEffect, useState } from "react";
import AddNote from "../components/AddNote/AddNote";
import DemoPage from "../components/DemoPage/DemoPage";
import ActionButton from "./ActionButton";
import "./Navbar.css";
import NavPage from "./NavPage";
import axios from "axios";

const Navbar = () => {
  const [op_list, setList] = useState();


  const NAV_DATA = [
    {
      id: 0,
      pageName: "Notes",
      tagStyle: "accounts",
      isDropdown: true,
      list: op_list,
    },
    {
      id: 1,
      pageName: "Trash",
      tagStyle: "accounts",
    },
  ];
  const [trigger, setTrigger] = useState()
  const [clickId, setId] = useState();
  const [content, setContent] = useState(<DemoPage />);

  useEffect(() => {
    axios.get("/notes").then((resp) => {
      setList(resp.data);
    });
    console.log(op_list);
  }, [trigger]);

  return (
    <div className="pageContainer">
      <div className="fullHeight">
        <div className="navContainer">
          <div className="navGroup">
            <div className="accountContainer">
              <div className="navInfo">
                <div className="profilePic" />
                <div className="navUser">Ion Popescu</div>
              </div>
            </div>
            <div
              className="addNotebook"
              onClick={() => setContent(<AddNote />)}
            >
              <ActionButton text="Add Note" />
            </div>
            <div className="navPages">
              {NAV_DATA.map((item, index) => {
                return (
                  <NavPage
                    pageName={item.pageName}
                    tagID={item.tagID}
                    id={item.id}
                    key={item.id}
                    setId={setId}
                    clickId={clickId}
                    isDropdown={item.isDropdown}
                    list={item.list}
                    setContent={setContent}
                  />
                );
              })}
            </div>
            <div className="navLogo">
              <div className="logo" />
            </div>
          </div>
        </div>
      </div>
      <div className="contentContainer">{content}</div>
    </div>
  );
};

export default Navbar;
