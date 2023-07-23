function To12HourFormat(timestamp) {
    var date = new Date(timestamp);
    var options = { month: "long", day: "numeric", year: "numeric" };
    var formattedDate = date.toLocaleDateString("en-NG", options);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var period = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
    return (
      formattedDate +
      " " +
      hours +
      ":" +
      (minutes < 10 ? "0" : "") +
      minutes +
      " " +
      period
    );
  }

  export default To12HourFormat;