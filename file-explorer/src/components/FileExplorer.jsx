import { useState } from "react";
import json from "../data/data.json";
import folderIcon from "../assets/folder-icon.png";
import fileIcon from "../assets/file-icon.png";
import deleteIcon from "../assets/delete-icon.png";
import "./FileExplorer.css";

const List = ({ data, addNodeToList, deleteNodeFromList }) => {
  const [isExpanded, setIsExpanded] = useState({});
  return (
    <div className="container">
      {data.map((node) => {
        return (
          <div key={node.id} className="item-container">
            {node.isFolder && (
              <span
                onClick={() =>
                  setIsExpanded((prev) => ({
                    ...prev,
                    [node.name]: !prev[node.name],
                  }))
                }
              >
                {isExpanded[node.name] ? "- " : "+ "}
              </span>
            )}
            <span>{node.name}</span>
            <div className="icons-container">
              {node.isFolder && (
                <span onClick={() => addNodeToList(node.id, true)}>
                  {" "}
                  <img src={folderIcon} alt="add folder" className="icon" />
                </span>
              )}
              {node.isFolder && (
                <span onClick={() => addNodeToList(node.id, false)}>
                  {" "}
                  <img src={fileIcon} alt="add file" className="icon" />
                </span>
              )}
              <span onClick={() => deleteNodeFromList(node.id)}>
                {" "}
                <img src={deleteIcon} alt="delete file" className="icon" />
              </span>
            </div>
            {isExpanded[node.name] && node?.children && (
              <List
                data={node.children}
                addNodeToList={addNodeToList}
                deleteNodeFromList={deleteNodeFromList}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export function FileExplorer() {
  const [data, setData] = useState(json);

  const addNodeToList = (id, isFolder) => {
    const name = prompt("Enter Name");
    if (!name || name?.trim() === "") {
      return;
    }

    const updateTree = (list) => {
      return list.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            children: [
              ...node.children,
              {
                id: Date.now() + Math.random(), // generate unique key
                name: name,
                isFolder: isFolder,
                children: isFolder ? [] : null,
              },
            ],
          };
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    };

    setData((prev) => updateTree(prev));
  };

  const deleteNodeFromList = (id) => {
    const updateTree = (list) => {
      return list
        .filter((node) => node.id !== id)
        .map((node) => {
          if (node.children) {
            return { ...node, children: updateTree(node.children) };
          }
          return node;
        });
    };

    setData((prev) => updateTree(prev));
  };

  return (
    <div className="app">
      <h1>File Explorer</h1>
      <List
        data={data}
        addNodeToList={addNodeToList}
        deleteNodeFromList={deleteNodeFromList}
      />
    </div>
  );
}
