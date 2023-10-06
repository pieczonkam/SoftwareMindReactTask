// Function returns YYYY-MM-DD string of today date
const getCurrentDateString = () => {
    var date  = new Date();
    var day   = String(date.getDate()).padStart(2, '0');
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var year  = date.getFullYear();
  
    return year + '-' + month + '-' + day;
}
  
// Function returns Date object (with year, month, day) of today date
const getCurrentDate = () => {
    var date  = new Date();
    var day   = date.getDate();
    var month = date.getMonth();
    var year  = date.getFullYear();

    return new Date(year, month, day);
}
  
// Function takes dayjs object, extracts year, month, day and returns Date object
const getDateFromDayjsObject = (obj) => {
    var day   = obj.get('D');
    var month = obj.get('M');
    var year  = obj.get('y');
  
    return new Date(year, month, day); 
}

export { getCurrentDate, getCurrentDateString, getDateFromDayjsObject };