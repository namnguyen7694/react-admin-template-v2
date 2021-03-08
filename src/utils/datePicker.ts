import moment from "moment";

export const getDefaultDatePicker = () => {
  return {
    start_date: moment().clone().subtract(30, "day").format("YYYY-MM-DD"),
    end_date: moment().format("YYYY-MM-DD"),
  };
};
