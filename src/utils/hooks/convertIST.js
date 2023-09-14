import moment from "moment/moment"

export  const converttoUTC=(data)=>{
    //  var date = new Date(data)
    //  date.setHours(date.getHours() + 5)
    //  date.setHours(date.getHours() + 5)
    //  date.setMinutes(date.getMinutes() + 30)
    
    //  return date.toISOString();
   return moment.utc(data).local().format('DD MMM YYYY | hh:mm a')
     
 }