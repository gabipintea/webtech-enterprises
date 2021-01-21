import React, { useEffect, useState } from "react";
import ViewNote from "../components/ViewNote/ViewNote";

const NavPage = (props) => {
  const {
    tagStyle,
    pageName,
    id,
    setId = () => {},
    clickId,
    isDropdown = false,
    isNote = false,
    list = [],
    navStyle = "",
    setContent = () => {},
    note = {title: "", content: ""}
  } = props;
  const [isSelected, setSelect] = useState(false);

  useEffect(() => {
    setSelect(id === clickId);
  }, [clickId, id]);

  return (
    <div>
      <div
        className={`navPage ${isSelected ? "navPageActive" : ""}`}
        onClick={() => {
          setId(id);
          if (isNote) {
            setContent(<ViewNote title={note.title} content={note.content} id={note.id} />);
          }
        }}
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
              pageName={item.title}
              note = {item}
              id={id}
              navStyle="dropItem"
              isNote={true}
              setContent={setContent}
            />
          );
        })}
    </div>
  );
};

export default NavPage;
