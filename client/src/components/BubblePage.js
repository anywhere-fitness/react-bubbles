import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import axiosWithAuth from "../utils/axiosWithAuth";

const BubblePage = () => {
  let initialState = [];
  axiosWithAuth()
      .get("http://localhost:5000/api/colors")
      .then(res => {
        console.log(res)
        let initialState = res.data
      })
      .catch(err => console.log(err))
   
  const [colorList, setColorList] = useState(initialState);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth()
      .get("http://localhost:5000/api/colors")
      .then(res => {
        console.log(res)
        setColorList(res.data)
      })
      .catch(err => console.log(err))
    }, [setColorList])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;