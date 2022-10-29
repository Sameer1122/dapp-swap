import Faq from "react-faq-component";
import "./Faq.css";

const data = {
  title: "FAQ",
  rows: [
    {
      title: "Lorem ipsum dolor sit amet,",
      content: "Lorem ipsum dolor sit amet, consectetur ",
    },
    {
      title: "Nunc maximus, magna at ultricies elementum",
      content:
        "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam.",
    },
    {
      title: "Curabitur laoreet, mauris vel blandit fringilla",
      content:
        "Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc",
    },
    {
      title: "What is the package version",
      content: "v1.0.5",
    },
  ],
};
const styles = {
  bgColor: "#000",
  titleTextColor: "#fff",
  rowTitleColor: "#FFF",
  rowContentColor: "#fff",
  arrowColor: "#fff",
};

export default function App() {
  return <Faq data={data} styles={styles} />;
}
