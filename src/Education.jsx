import "./css/swap.css";
import { BsFillBellFill } from "react-icons/bs";
function Swap(props) {
  return (
    <div className="col-md-9">
      <div className="header">
        <h3>Gas Tank</h3>
        <div className="bg-rounded bg-rounded-icon">
          <BsFillBellFill style={{ color: "white" }} />
        </div>
        <div className="bg-block"></div>
        <div className="name-addr">
          <h6>{props.address.substring(0, 16)}</h6>
        </div>
        <div className="hrz-separator"></div>
      </div>
      <div className="hrz-separator"></div>
      <div className="content education-content">
        <div className="main-heading">
          <h1>Education</h1>
          <h6>Coming Soon</h6>
        </div>
      </div>
    </div>
  );
}
export default Swap;
