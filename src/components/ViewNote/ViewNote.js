import Axios from 'axios';
import React from 'react';
import ActionButton from '../../helpers/ActionButton';
import "./ViewNote.css"

const ViewNote = (props) => {
    const {title, content, id} = props;
    const handleDelete = (delID) => {
        Axios.delete("/notes/" + delID).then(
          (resp) => {
            console.log(resp);
            window.location = window.location;
          },
          (error) => console.log(error)
        );
      };

    return (
        <div className="noteContainer">
            <div className="noteInputs">
                <div className="formTitle">{title}</div>
                <div className="formTitle noteContent" >{content}</div>
            </div>
            <div className="deleteButton" onClick={() => handleDelete(id)}>
                <ActionButton text="DELETE" />
            </div>
        </div>
    )
}

export default ViewNote;