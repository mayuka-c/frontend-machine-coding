import { checkboxesData } from "../data/checkboxesData";
import "./Checkboxes.css";

export function Checkboxes({ data, checked, setChecked }) {
  const handleChange = (e, node) => {
    setChecked((prev) => {
      const newState = { ...prev, [node.id]: e.target.checked };

      // Top down check
      const updateChildren = (node) => {
        node.children?.forEach((child) => {
          newState[child.id] = e.target.checked;
          child.children && updateChildren(child);
        });
      };
      updateChildren(node);

      // Bottom up check -> run for all the nodes
      const verifyChecked = (node) => {
        if (!node.children) return newState[node.id] || false;
        newState[node.id] = node.children.every((child) =>
          verifyChecked(child)
        );
        return newState[node.id];
      };
      checkboxesData.forEach((node) => verifyChecked(node));

      return newState;
    });
  };

  return (
    <div>
      {data.map((node) => (
        <div key={node.id} className="parent">
          <input
            type="checkbox"
            checked={checked[node.id] || false}
            onChange={(e) => handleChange(e, node)}
          />
          <span>{node.name}</span>
          {node.children && (
            <Checkboxes
              data={node.children}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </div>
      ))}
    </div>
  );
}
