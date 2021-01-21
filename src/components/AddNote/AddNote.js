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
    content: "",
    public: true,
  });

  const [id, setId] = useState("");
  const [init] = useState(true);
  const mdRef = useRef();
  const [created, setCreated] = useState(edit);

  useEffect(() => {
    if (!edit) {
      axios.post("/notes", request).then(
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
      });
    } else if (field === "content") {
      setRequest({
        title: request.title,
        content: value,
        public: request.public,
      });
    }
  };

  const handleCreate = useCallback(() => {
    console.log("ID", id);
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
    axios.get("/notes").then((resp) => {
      setId("/" + resp.data.length);
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
    if (request.content !== "defContent") handleSave();
  }, [request]);

  return (
    <div className="noteContainer">
      <Input
        type="text"
        defaultValue="Title"
        handleValue={handleValue}
        field="title"
      />
      <MDEditor ref={mdRef} preview="edit" height="90vh" onChange={setValue} />
    </div>
  );
};

export default AddNote;
