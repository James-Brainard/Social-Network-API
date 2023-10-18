const format_date = (date) => {
  let timeStamp = new Date(date);
  let monthNum = timeStamp.getMonth();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let currentMonth = months[monthNum];
  let day = timeStamp.getDate();
  let year = timeStamp.getFullYear();

  const time = format_timeStamp(timeStamp);

  return `${currentMonth} ${day}, ${year} ${time}`;
}

const format_timeStamp = (date) => {
  let timeStamp = new Date(date);
  let hours = timeStamp.getHours();
  let minutes = timeStamp.getMinutes();
  let amOrPm = hours >= 12 ? 'PM' : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${minutes} ${amOrPm}`;
};

module.exports = { format_date };