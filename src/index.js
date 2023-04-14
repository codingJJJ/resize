import React from "react";
import { createRoot } from "react-dom/client";
import Demo1 from "./Demo1";
import Demo2 from "./Demo2";
import "antd/dist/antd.css";

const DemoList = () => {
  return (
    <>
      <Demo1 />
      <Demo2 />
    </>
  );
};

createRoot(document.getElementById("root")).render(<DemoList />);
