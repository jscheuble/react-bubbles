import React, { useState } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updating, setUpdating }) => {
  console.log("***colors", colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [id, setId] = useState(0);
  const [newColor, setNewColor] = useState({
    color: "",
    code: {
      hex: ""
    },
    id: 0
  });

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/colors/${id}`, colorToEdit)
      .then(res => {
        console.log("put", res);
        setUpdating(!updating);
      })
      .catch(err => console.log(err));
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        console.log(res);
        setUpdating(!updating);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    setNewColor({
      ...newColor,
      id: Date.now()
    });
    axiosWithAuth()
      .post("/api/colors", newColor)
      .then(res => {
        console.log(res);
        setUpdating(!updating);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li
            key={color.color}
            onClick={() => {
              editColor(color);
              setId(color.id);
            }}
          >
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <legend>add new color</legend>
        <label>
          color name:
          <input
            onChange={e => {
              setNewColor({
                ...newColor,
                color: e.target.value
              });
            }}
            value={newColor.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={e => {
              setNewColor({
                ...newColor,
                code: { hex: e.target.value }
              });
            }}
          />
        </label>
        <div className="button-row">
          <button type="submit">add new color</button>
        </div>
      </form>
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
