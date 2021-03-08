import * as React from "react";
import { Row, Col, Spin, Menu, Tabs, Divider } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import moment from "moment";
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
/**Component */
import { ROUTES } from "routes/appRoutes";
/* Icon*/
import { CustomerService } from "services";
import { CustomerDetailOutputModel, GENDER } from "app/store/customer/customerTypes";
import { buildAddressAcivation, getUserIdentity } from "utils/other.util";
import { BlockInfoItem } from "app/components/BlockInfo/BlockInfoItem";

const { TabPane } = Tabs;
export interface Props {
  match: any;
  history: any;
}
export interface State {
  activeMenu: string;
  loading: boolean;
  customerDetail: CustomerDetailOutputModel;
  confirmLoading: boolean;
  option: "block" | "delete" | undefined;
  activationImages: string[];
}

class CustomerDetail extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeMenu: "profile",
      loading: false,
      customerDetail: new CustomerDetailOutputModel().deserialize!({}),
      confirmLoading: false,
      option: undefined,
      activationImages: [],
    };
  }

  gallery: Viewer;

  loadItemById = async (id: string) => {
    const res = await CustomerService.getCustomerById(id);
    if (res && res.status === 200) {
      this.setState(
        {
          loading: false,
          customerDetail: res.data,
        },
        () => {
          const kyc = this.state.customerDetail.kyc;
          const activationImages = [
            kyc?.sim_card_img!,
            kyc?.id_front_img!,
            kyc?.id_back_img!,
            kyc?.selfie_img!,
            kyc?.signature_img!,
          ].filter((img) => img !== "");
          this.setState({ activationImages });
        }
      );
    } else {
      this.setState({ loading: false });
      this.props.history.push(ROUTES.CUSTOMER?.subMenu?.INFO.path.BASE);
    }
  };

  renderOptions = () => (
    <Menu>
      <Menu.Item key="1">View SIM Info</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">Report</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">Chat with customer</Menu.Item>
    </Menu>
  );

  onViewImg = () => {
    const container = document.createElement("div");
    const list = document.createElement("ul");
    for (let image of this.state.activationImages) {
      const item = document.createElement("li");
      const img = document.createElement("img");
      img.setAttribute("src", image!);
      img.setAttribute("width", "304");
      img.setAttribute("height", "228");
      img.setAttribute("alt", image!);
      item.appendChild(img);
      list.appendChild(item);
    }
    container.appendChild(list);
    if (this.gallery) return;
    this.gallery = new Viewer(container, { title: false });
  };

  componentDidMount() {
    const userId = this.props.match.params.id as string;
    if (userId !== "") {
      this.setState({ loading: true }, () => {
        this.loadItemById(userId);
      });
    }
  }

  render() {
    const customerDetail = this.state.customerDetail;
    const kyc = this.state.customerDetail.kyc;
    return (
      <Spin spinning={this.state.loading} style={{ width: "100%", height: "80rem", margin: "10rem auto" }}>
        <div className="customer-detail__header">
          <div onClick={() => this.props.history.push(ROUTES.CUSTOMER?.subMenu?.INFO.path.BASE)}>
            <ArrowLeftOutlined /> Back
          </div>
          {/* <Dropdown getPopupContainer={(node) => node} overlay={this.renderOptions} trigger={["click"]}>
            <div onClick={(e) => e.preventDefault()}>
              Option <span style={{ fontSize: "8px", marginLeft: "1rem" }}>▼</span>{" "}
            </div>
          </Dropdown> */}
        </div>
        <Row gutter={[20, 20]} className="customer-detail__profile">
          <Col span={12}>
            <div className="info-block">
              <div className="info-block__header">Customer Info - ID #{customerDetail.id}</div>
              <Row gutter={20}>
                <BlockInfoItem title="Account" info={getUserIdentity(customerDetail)} />
                <BlockInfoItem
                  title="Gender"
                  info={customerDetail.profile.gender ? GENDER[customerDetail.profile.gender] : "-"}
                />
                <BlockInfoItem
                  title="Date of birth"
                  info={customerDetail.profile.dob ? moment(customerDetail.profile.dob).format("MMMM DD, YYYY") : "-"}
                  md_width={24}
                />
                <BlockInfoItem title="Email" info={customerDetail.email ?? "-"} />
                <BlockInfoItem title="Phone number" info={customerDetail.phone_number ?? "-"} />
                <BlockInfoItem title="Device S/N" info={customerDetail.device_sn ?? "-"} />
              </Row>

              <Divider />
              <div className="info-block__header">Personal Info</div>
              {kyc ? (
                <Row gutter={20}>
                  <BlockInfoItem title="Fullname" info={kyc.fullname ?? "-"} />
                  <BlockInfoItem title="ID card/ Passport No." info={kyc.id_number ?? "-"} />
                  <BlockInfoItem title="Nationality" info={kyc.nationality ?? "-"} />
                  <BlockInfoItem title="Place of Issue" info={kyc.issue_place ?? "-"} />
                  <BlockInfoItem title="Date of Issue" info={moment(kyc.issue_date).format("DD/MM/YYYY") ?? "-"} />
                  <BlockInfoItem title="Date of birth" info={moment(kyc.dob).format("DD/MM/YYYY") ?? "-"} />
                  <BlockInfoItem title="Gender" info={GENDER[kyc?.gender] ?? "-"} />
                  <BlockInfoItem title="Arrival Destination" info={kyc.arrival_destination ?? "-"} />
                  <BlockInfoItem
                    title="Permanent Address"
                    info={kyc && Boolean(buildAddressAcivation(kyc)) ? buildAddressAcivation(kyc) : "-"}
                  />
                </Row>
              ) : (
                <div className="info-block__title">This user has not verified personal info</div>
              )}
              {/* <Divider />
              <div className="info-block__header">Report (1)</div>
              <Row gutter={20}>
                <BlockInfoItem
                  title="by Danh N. Bui - 09:09 - 20/11/2020"
                  info="This profile use ID card and portrait photo of 2 persons"
                  md_width={24}
                />
              </Row> */}
            </div>
          </Col>

          <Col span={12}>
            <Tabs className="custom-tabs" type="card">
              <TabPane tab="Activation Data" key="1"></TabPane>
              {/* <TabPane tab="History" key="2">
                History
              </TabPane>
              <TabPane tab="SIM own (2)" key="3">
                History
              </TabPane> */}
            </Tabs>
          </Col>
        </Row>
      </Spin>
    );
  }
}

export default CustomerDetail;
