import { Input, Menu, Pagination } from "antd";
import React, { Component } from "react";
import _ from "lodash";
import CustomerCard from "app/components/CustomListCard/CustomerCard";
import { CustomerListReducerType } from "app/store/customer/customerTypes";
import NullListing from "app/components/EmptyListing/NullListing";
import { commonRequestFilter } from "models/requets.model";
import CustomRangePicker from "app/components/RangePicker/RangePicker";

export interface Props {
  customerList: CustomerListReducerType;
  loadListing: (
    payload: commonRequestFilter,
    filter?: { [key: string]: string | number | boolean | undefined }
  ) => void;
}
export interface State {
  selectingItem: string[];
  page_number: number;
  page_size: number;
  keyword?: string;
  end_date?: string;
  start_date?: string;
}

class CustomerListing extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectingItem: [],
      page_number: this.props.customerList.listing.page_number,
      page_size: this.props.customerList.listing.page_size,
      keyword: this.props.customerList.listing.keyword,
      start_date: this.props.customerList.listing.start_date,
      end_date: this.props.customerList.listing.end_date,
    };
  }

  handleSearch = (keyword: string | undefined) => {
    this.setState({ keyword, page_number: 1 }, () => this.loadListing());
  };
  debounceSearch = _.debounce(this.handleSearch, 800);

  handleSelectItem = (id: string, type: "check" | "uncheck") => {
    if (type === "uncheck") {
      let copyArr = this.state.selectingItem;
      copyArr.splice(
        copyArr.findIndex((elm) => elm === id),
        1
      );
      this.setState({ selectingItem: copyArr });
    } else {
      this.setState({
        selectingItem: [...this.state.selectingItem, id],
      });
    }
  };

  handleChangeDateRange = (val: any) => {
    if (val) {
      const start_date = val![0]?.format("YYYY-MM-DD");
      const end_date = val![1]?.format("YYYY-MM-DD");
      this.setState({ end_date, start_date }, () => {
        this.loadListing();
      });
    } else {
      this.setState({ end_date: undefined, start_date: undefined }, () => {
        this.loadListing();
      });
    }
  };

  onShowSizeChange = (current: number, pageSize: number) => {
    this.setState({ page_number: current, page_size: pageSize }, () => this.loadListing());
  };

  loadListing = () => {
    this.props.loadListing({
      page_number: this.state.page_number,
      page_size: this.state.page_size,
      keyword: this.state.keyword,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    });
  };

  renderOptions = () => (
    <Menu>
      <Menu.Item key="1">Active</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">Inactive</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">Create new</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4">Delete</Menu.Item>
    </Menu>
  );

  componentDidMount() {
    this.loadListing();
  }

  render() {
    const customerList = this.props.customerList.listing.data;
    return (
      <div className="customer-list">
        <div className="customer-list__toolbar">
          <div className="customer-list__toolbar-control">
            <CustomRangePicker
              startDate={this.state.start_date}
              endDate={this.state.end_date}
              handleChangeDateRange={this.handleChangeDateRange}
              title="Date create:"
            />
            <Input
              placeholder="Search by name, email"
              allowClear
              defaultValue={this.state.keyword!}
              onChange={(event) => {
                let key = event.target.value;
                if (key.trim() !== "") {
                  this.debounceSearch(key);
                } else {
                  this.debounceSearch(undefined);
                }
              }}
            />
          </div>
          {customerList.length > 0 && (
            <div className="customer-list__toolbar-options">
              {/* <Dropdown getPopupContainer={(node) => node} overlay={this.renderOptions} trigger={["click"]}>
                <div onClick={(e) => e.preventDefault()}>
                  Option <span style={{ fontSize: "8px", marginLeft: "1rem" }}>▼</span>{" "}
                </div>
              </Dropdown> */}
              <div></div>
              <Pagination
                showSizeChanger
                onShowSizeChange={this.onShowSizeChange}
                onChange={(page_number) => this.setState({ page_number }, () => this.loadListing())}
                defaultCurrent={this.props.customerList.listing.page_number}
                total={this.props.customerList.listing.total}
                defaultPageSize={this.props.customerList.listing.page_size}
              />
            </div>
          )}
        </div>
        {customerList.length > 0 && (
          <div className="custom-list-heading">
            {/* <Checkbox
              onChange={(e) => {
                if (e.target.checked === true) {
                  this.setState({ selectingItem: customerList.map((elm) => elm.id.toString()) });
                } else {
                  this.setState({ selectingItem: [] });
                }
              }}
              style={{ width: "5rem" }}
              indeterminate={
                this.state.selectingItem.length > 0 && this.state.selectingItem.length !== customerList.length
              }
              checked={this.state.selectingItem.length === customerList.length}
            /> */}
            <div>
              <div style={{ width: "30rem" }}>Identity</div>
              <div style={{ textAlign: "center" }}>KYC Verified</div>
              <div style={{ textAlign: "center" }}>Status</div>
              <div>Date create</div>
            </div>
          </div>
        )}
        {customerList.length > 0 && (
          <div className="customer-list__list">
            {customerList?.map((ctm, index) => (
              <CustomerCard
                key={index}
                data={ctm}
                handleSelectItem={this.handleSelectItem}
                defaulSelect={this.state.selectingItem.includes(ctm.id.toString())}
              />
            ))}
          </div>
        )}
        {customerList.length === 0 && !this.props.customerList.loading && <NullListing type="customer-list" />}
      </div>
    );
  }
}

export default CustomerListing;
