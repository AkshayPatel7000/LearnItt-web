import { makeAutoObservable } from "mobx";

class Student {
  instituteId = "";
  isLoading = false;
  filterData = {
    pricingFilter: 0,
    statusFilter: 0,
    languageFilter: 0,
  };
  selectedData = {
    pricingFilter: 0,
    statusFilter: 0,
    languageFilter: 0,
  };
  instituteList = [{ text: "Other", id: "689bd5a2-25c7-4366-db39-08daf9363e44" }];
  // instituteList = [{ text: "Other", id: "689bd5a2-25c7-4366-db39-08daf9363e44" }];
  constructor() {

    makeAutoObservable(this);

  }

  setInstituteId = (Id) => {
    this.instituteId = Id;
  };
  setfilterData = (data) => {
    console.log("first",data)
    this.filterData = { ...this.filterData, ...data }
  }

  setInstituteList = (data) => {
    this.instituteList = data
  }
  setSelectedValue = (data) => {
    this.selectedValue = data
  }
  setSelectedFilter=(data)=>{
    this.selectedData={...this.selectedData,...data}
  }


}
const StudentStore = new Student();
export default StudentStore;
