import { Button } from "react-bootstrap";
import logoutIcon from "./logout.png";

const LogOut = (props) => {
  return (
    <Button variant="secondary" style={{ width: "40px" }}>
      <img src={logoutIcon} width="110%" />
    </Button>
  );
};

export default LogOut;
