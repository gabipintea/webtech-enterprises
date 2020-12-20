import React, { useState } from "react";
import "./Navbar.css";
import NavPage from "./NavPage";

const Navbar = () => {
    const op_list = [
        {
            id: 0,
            pageName: "NoteBook 1",
        },
    ];

    const NAV_DATA = [
        {
            id: 0,
            pageName: "Notebooks",
            tagStyle: "accounts",
            isDropdown: true,
            list: op_list
        },
        {
            id: 1,
            pageName: "Trash",
            tagStyle: "accounts",
        },
    ];

    const [clickId, setId] = useState();

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
            <div className="contentContainer">
            </div>
        </div>
    );
};

export default Navbar;