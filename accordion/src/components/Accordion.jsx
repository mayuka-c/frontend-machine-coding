import { useState } from "react";
import { AccordionItem } from "./AccordionItem";
import "./Accordion.css";

export function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return !items || items.length == 0 ? (
    "No items available"
  ) : (
    <div className="accordion">
      {items.map((item, index) => (
        <AccordionItem
          item={item}
          index={index}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
        />
      ))}
    </div>
  );
}
