import React, { useCallback, useState } from "react";
import ActionButton from "../../helpers/ActionButton";
import Input from "../../helpers/Input";
import "./AddNote.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddNote = () => {
  const redirect = useHistory();
  const [request, setRequest] = useState({
    title: "defTitle",
    content: "defContent",
    public: true,
  });
  const handleValue = (value, field) => {
    if (field === "title") {
      setRequest({
        title: value,
        content: request.content,
        public: request.public,
      });
    } else if (field === "content") {
      setRequest({
        title: request.title,
        content: value,
        public: request.public,
      });
    }
  };

  const handleRequest = useCallback(() => {
    axios.post("/notes", request).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    redirect.go(0);
  }, [request]);

  return (
    <div className="noteContainer">
      <div className="noteInputs">
        <div className="formTitle">Add Note</div>
        <div className="noteInput">
          <Input
            type="text"
            defaultValue="Note Title"
            handleValue={handleValue}
            field="title"
          />
        </div>
        <div className="noteInput ">
          <Input
            type="text"
            defaultValue="Note Content"
            handleValue={handleValue}
            field="content"
          />
        </div>
        <div className="submitContainer">
          <div className="submit" onClick={() => handleRequest()}>
            <ActionButton text="SUBMIT" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
