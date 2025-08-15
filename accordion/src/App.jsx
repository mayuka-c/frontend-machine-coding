import { Accordion } from "./components/Accordion";

const accordionItems = [
  {
    title: "Item 1: Introduction",
    content: "This is the introduction section, where we provide an overview of the accordion functionality and its purpose in UI design."
  },
  {
    title: "Item 2: Features",
    content: "The accordion allows users to expand and collapse sections, enhancing user experience by displaying only relevant information at a time."
  },
  {
    title: "Item 3: Installation",
    content: "To install the accordion, simply include the necessary CSS and JavaScript files in your project. You can also use npm or yarn for package management."
  },
  {
    title: "Item 4: Usage",
    content: "To use the accordion, define the structure using HTML, then initialize it with JavaScript. The accordion component will automatically handle expand/collapse interactions."
  },
  {
    title: "Item 5: Customization",
    content: "The accordion can be customized in terms of animation speed, icons, and layout, allowing it to seamlessly fit into any website's design."
  }
];

export default function App() {
  return (
    <>
      <Accordion items={accordionItems}/>
    </>
  )
}