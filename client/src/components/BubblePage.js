import React, { useState, useEffect } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [updating, setUpdating] = useState(false);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    axiosWithAuth()
      .get("/api/colors")
      .then(res => {
        setColorList(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }, [updating]);

  return (
    <>
      <ColorList
        colors={colorList}
        updateColors={setColorList}
        setUpdating={setUpdating}
        updating={updating}
      />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
