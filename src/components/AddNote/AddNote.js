import React, { useCallback, useEffect, useRef, useState } from "react";
import ActionButton from "../../helpers/ActionButton";
import Input from "../../helpers/Input";
import "./AddNote.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";

const AddNote = (props) => {
  const { edit = false } = props;
  const redirect = useHistory();
  const [value, setValue] = useState("");
  const [request, setRequest] = useState({
    title: "Draft",
    content: "Draft",
    public: true,
    notebook: "",
  });

  let userEmail = JSON.parse(localStorage.getItem("user"));
  userEmail = userEmail.data.email;
  console.log(userEmail);
  const [id, setId] = useState("");
  const [init] = useState(true);
  const clickRef = useRef();
  const [clicked, setClicked] = useState(true);

  useEffect(() => {
    if (!edit) {
      axios.post("/notes/user/" + userEmail, request).then(
        (response) => {
          console.log(response);
          handleEdit();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [init]);

  const handleValue = (value, field) => {
    if (field === "title") {
      setRequest({
        title: value,
        content: request.content,
        public: request.public,
        notebook: request.notebook
      });
    } else if (field === "content") {
      setRequest({
        title: request.title,
        content: value,
        public: request.public,
        notebook: request.notebook
      });
    } else if (field === "notebook") {
      setRequest({
        title: request.title,
        content: request.content,
        public: request.public,
        notebook: value
      });
    }
  };

  const handleCreate = useCallback(() => {
    axios.put("/notes" + id, request).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [id, request, value]);

  const handleEdit = () => {
    axios.get("/notes/user/" + userEmail).then((resp) => {
      setId("/" + resp.data[resp.data.length - 1].id);
      console.log(resp.data);
    });
  };

  useEffect(() => {
    console.log(value);
    if (value !== "") {
      handleValue(value, "content");
    }
  }, [value]);

  useEffect(() => {
    const handleSave = () => {
      console.log(request);

      handleEdit();
      handleCreate();
    };
    if (request.content !== "Draft") handleSave();
  }, [request]);

  const handleClick = (e) => {
    if (!clickRef.current.contains(e.target)) {
      setClicked(false);
    } else {
      setClicked(true);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  });

  return (
    <div ref={clickRef} className="noteContainer">
      <Input
        type="text"
        defaultValue="Title"
        handleValue={handleValue}
        field="title"
      />
      {clicked ? (
        <MDEditor
          preview="edit"
          height="90vh"
          onChange={setValue}
          value={value}
        />
      ) : (
        <MDEditor.Markdown height="90vh" source={value} />
      )}
      <Input
        type="input"
        defaultValue="Notebook"
        handleValue={handleValue}
        field="notebook"
      />
    </div>
  );
};

export default AddNote;
