import { Divider, Input } from "antd";
import React, { Component } from "react";
import _ from "lodash";
import CustomerCard from "app/components/CustomListCard/CustomerCard";
import { CustomerListReducerType } from "app/store/customer/customerTypes";
import NullListing from "app/components/CustomListing/NullListing";
import { commonRequestFilter } from "models/requets.model";
import CustomRangePicker from "app/components/RangePicker/RangePicker";
import icon_filter from "assets/images/icon/ic_filter.svg";
import ListHeading from "app/components/CustomListing/ListHeading";
import ListPagination from "app/components/CustomListing/ListPagination";
import CustomButton from "app/components/CustomButton/CustomButton";

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

  componentDidMount() {
    this.loadListing();
  }

  render() {
    const customerList = this.props.customerList.listing.data;
    return (
      <div className="listing">
        <div className="listing-toolbar">
          <h2>Customer list</h2>
          <div className="listing-toolbar__filter">
            <img src={icon_filter} alt="filter" />
            <h3>Filter Setting</h3>
            <CustomButton
              onClick={() => this.setState({ page_number: 1 }, () => this.loadListing())}
              item="Apply filter"
              type="secondary"
              size="medium"
              style={{ width: "100%" }}
            />

            <Divider />
            <div style={{ marginTop: "4rem" }}>
              <CustomRangePicker
                startDate={this.state.start_date}
                endDate={this.state.end_date}
                handleChangeDateRange={this.handleChangeDateRange}
                title="Date create:"
              />
            </div>
            <Divider />
          </div>
        </div>

        <div className="listing-main">
          <ListPagination
            pageNumber={this.state.page_number}
            total={this.props.customerList.listing.total}
            pageSize={this.state.page_size}
            onShowSizeChange={this.onShowSizeChange}
            handleChangePage={(page_number) => this.setState({ page_number }, () => this.loadListing())}
            length={this.props.customerList.listing.data.length}
          />
          <div className="listing-main__container">
            <div className="d_flex sp_bw">
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
              {/* <CustomButton item={"+ Create"} type="primary" size="small" style={{ width: "16rem" }} /> */}
            </div>
            <ListHeading
              column={[
                { name: "Identity", width: "30rem" },
                { name: "KYC Verified" },
                { name: "Status", align: "center" },
                { name: "Date create" },
              ]}
              useCheckAll={false}
            />

            {customerList.length > 0 && (
              <div className="listing-main__container--listing">
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
            {customerList.length === 0 && !this.props.customerList.loading && <NullListing type="customer" />}
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerListing;
