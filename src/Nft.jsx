import { BsFillBellFill } from "react-icons/bs";
import "./css/swap.css";

function Swap(props) {
  return (
    <div className="col-md-9">
      <div className="header">
        <h3>
          Gas Tank <br />
          {props.bal?.slice(0, 7)}
        </h3>

        <div className="bg-rounded">
          <img className="vector" src={require("./images/Vector.png")} alt="" />
          <BsFillBellFill style={{ color: "white" }} />
        </div>
        <div className="bg-block"></div>
        <div className="name-addr">
          <h6>{props.address.substring(0, 16)}</h6>
        </div>
        <div className="hrz-separator"></div>
      </div>
      <div className="hrz-separator"></div>
      <div className="nft-content">
        <div
          className="cards"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center !important",
            margin: "auto",
            marginLeft: "120px",
          }}
        >
          {props.nfts?.map((employee) => {
            return (
              <>
                <div
                  className="card"
                  style={{
                    width: "259px",
                    height: "350px",
                    borderRadius: "10PX",
                    margin: "30px",
                    textAlign: "center",
                    border: "1px solid #000",
                  }}
                >
                  <img
                    src="https://bafybeifygtp7aorvxqyhjggy5phoxpnucwaywebjanmpt42qyc6kpqfh4m.ipfs.nftstorage.link/"
                    alt=""
                    style={{ width: "400", height: "900" }}
                  />

                  <br />
                  <h3>NFT ID : {employee.token_id}</h3>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Swap;
