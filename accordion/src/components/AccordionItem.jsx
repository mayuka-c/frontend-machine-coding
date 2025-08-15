import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./AccordionItem.css";

export function AccordionItem({ item, index, openIndex, setOpenIndex }) {
  const handleButtonClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div key={index} className="accordion-item">
      <button
        className="accordion-title"
        onClick={() => {
          handleButtonClick(index);
        }}
      >
        {item.title}
        {openIndex === index ? <FaChevronDown /> : <FaChevronUp />}
      </button>
      {openIndex === index && (
        <div className="accordion-content">{item.content}</div>
      )}
    </div>
  );
}
