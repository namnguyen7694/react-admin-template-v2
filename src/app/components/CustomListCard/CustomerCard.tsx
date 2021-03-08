import React from "react";
import { Card, Avatar } from "antd";
import { Link } from "react-router-dom";
import { buildDetailRoute } from "utils/other.util";
import { ROUTES } from "routes/appRoutes";
import { UserOutlined } from "@ant-design/icons";
import { CustomerOutputModel } from "app/store/customer/customerTypes";
import moment from "moment";
interface Props {
  data: CustomerOutputModel;
  handleSelectItem: (id: string, type: "check" | "uncheck") => void;
  defaulSelect: boolean;
}
// const statusList = ["problem", "reported", "deleted"];
const CustomerCard: React.FC<Props> = (props) => {
  const { data } = props;

  const ctmStatus = data.is_active ? "verified" : "problem";
  const kycStatus = data.kyc_verified ? "verified" : "not_verified";
  return (
    <Card className="custom-item-card">
      {/* <Checkbox
        onChange={(e) => {
          if (e.target.checked === true) {
            props.handleSelectItem(data.id.toString(), "check");
          } else {
            props.handleSelectItem(data.id.toString(), "uncheck");
          }
        }}
        style={{ width: "5rem" }}
        checked={props.defaulSelect}
      /> */}
      <Link to={buildDetailRoute(ROUTES.CUSTOMER?.subMenu?.INFO.path.DETAIL!, data.id.toString())}>
        <Card.Meta
          className="custom-item-card--meta"
          avatar={<Avatar icon={<UserOutlined />} src={data.avatar_url} />}
          title={data.user_identity}
        />
        <Card.Meta
          className={`custom-item-card--info customer-card-status ${kycStatus}`}
          title={kycStatus.replace("_", " ")}
        />
        {/* <Card.Meta className="custom-item-card--info" title={data.profile.gender ? GENDER[data.profile.gender] : "-"} /> */}
        <Card.Meta className={`custom-item-card--info customer-card-status ${ctmStatus}`} title={ctmStatus} />
        <Card.Meta className="custom-item-card--info" title={moment(data.created_at).format("DD/MM/YYYY")} />
      </Link>
    </Card>
  );
};

export default CustomerCard;
