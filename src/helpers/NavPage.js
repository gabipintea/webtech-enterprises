import React, { useEffect, useState } from "react";

const NavPage = (props) => {
  const {
    tagStyle,
    pageName,
    id,
    setId = () => {},
    clickId,
    isDropdown = false,
    list = [],
    navStyle = "",
  } = props;
  const [isSelected, setSelect] = useState(false);

  useEffect(() => {
    setSelect(id === clickId);
  }, [clickId, id]);

  return (
    <div>
      <div
        className={`navPage ${isSelected ? "navPageActive" : ""}`}
        onClick={() => setId(id)}
        id={navStyle}
      >
        <div className="iconContainer" id={tagStyle} />
        <div className="pageName">{pageName}</div>
      </div>
      {isDropdown &&
        isSelected &&
        list.map((item, index) => {
          return (
            <NavPage
              key={index}
              tagID={item.tagStyle}
              pageName={item.pageName}
              id={id}
              navStyle="dropItem"
            />
          );
        })}
    </div>
  );
};

export default NavPage;