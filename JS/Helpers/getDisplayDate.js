export const getDisplayDate = (date) => {
  const day = date.slice(8, 10);
  const month = date.slice(5, 7);
  let month_names = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };
  let month_name = month_names[month];
  let displayDate = `${day} ${month_name}`;
  return displayDate;
};
