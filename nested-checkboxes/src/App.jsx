import { useState } from "react";
import { Checkboxes } from "./components/Checkboxes";
import { checkboxesData } from "./data/checkboxesData";

export default function App() {
  const [checked, setChecked] = useState({});
  return (
    <Checkboxes
      data={checkboxesData}
      checked={checked}
      setChecked={setChecked}
    />
  );
}
