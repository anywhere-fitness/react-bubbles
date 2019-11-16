import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addedColor, setAddedColor] = useState(initialColor)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    let activeColor = colors.filter(color => color.id === colorToEdit.id)
    console.log(activeColor[0])
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${activeColor[0].id}`, colorToEdit)
      .then(res => {
        console.log("PUT response:" , res)
        colors = colors.filter(color => color.id !== res.data.id)
        updateColors([...colors, res.data])        
        setEditing(false)
      })
      .catch(err => console.log(err))
  };

  const addColor = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post(`http://localhost:5000/api/colors/`, addedColor)
      .then(res => {
        console.log("POST response:" , res)
        updateColors(res.data)
        setAddedColor(initialColor)        
        setEditing(false)
      })
      .catch(err => console.log(err))
  }

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res => { console.log("Delete Response:", res)
    updateColors(colors.filter(item => `${item.id}` !== `${color.id}`))
    setColorToEdit(initialColor)
  })
    .catch(err => console.log(err))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
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
        onSubmit={e => addColor(e)}>
        <legend>add a color</legend>
        <label>
            color name:
            <input
              onChange={e =>
                setAddedColor({ ...addedColor, color: e.target.value })
              }
              value={addedColor.color}
            />
          </label>
        <label>
          hex code:
          <input
              onChange={e =>
                setAddedColor({
                  ...addedColor,
                  code: { hex: e.target.value }
                })
              }
              value={addedColor.code.hex}
            />
        </label>
        <div className="button-row">
          <button type="submit">save</button>
          <button onClick={() => setEditing(false)}>cancel</button>
        </div>
      </form>
      <div className="spacer" />
    </div>
  );
};

export default ColorList;