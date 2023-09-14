import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CourseIcon } from "../../assets/icon/inputIcon";
import img from "../../assets/images/Group33631.png";
import CustomButton from "../../customComponents/button/customButton";
import CustomCard from "../../customComponents/card/CustomCard";
import Dropdown from "../../customComponents/dropdown/dropdown";
import AuthServices from "../../services/AuthService";
import StudentDetail from "../../services/StudentService";
import { ThemeColors } from "../../theme/theme";
import CheckAuth from "../../utils/hooks/checkAuth";
import { RouteConstant } from "../../utils/routes/constant";
import { CardHeading } from "../../customComponents/Header/cardheader";
/* eslint-disable */
export default function SelectCourse() {
  const user = JSON.parse(localStorage.getItem("key"))?.user;
  const location = useLocation()
  const [course, setCourse] = useState([]);
  const [subcourse, setsubcourse] = useState([]);
  const navigate = useNavigate()
  const isVerifiedUser = CheckAuth();
  const divCenter = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
  };

  useEffect(() => {
    getCourseByInstitute();
  }, [location?.state])


  const getCourseByInstitute = async () => {
    const res = await StudentDetail?.getCourseByInstitute(location?.state?.instituteId || user?.instituteId);
    let course = res?.instituteDataLists?.map((elm) => {
      return {
        id: elm?.courseId,
        Title: elm?.courseName,
        code: "",
        label: "Course"
      };
    });
    setCourse(course);
  }

  const getSubCourseById = async (Id) => {
    const res = await StudentDetail?.getSubCourseById(Id);
    let subcourse = res?.subCourses?.map((elm) => {
      return {
        id: elm?.id,
        Title: elm?.subCourseName,
        code: "",
        label: "SubCourse"
      };
    });
    setsubcourse(subcourse);
  }

  const finalSignedUp = async (value) => {
    let payload = {
      //id: user?.userid,
      id: user?.userId,
      email: user?.email,
      isVerified: user?.isVerified,
      mobileNumber: user?.mobileNumber,
      fullName: user?.name,
      profileImage: "",
      instituteId: location?.state?.instituteId,
      subcourseId: value?.subcourseId
    }
    const updateProfile = await AuthServices?.updateProfile(payload);
    if (updateProfile) {
      if (isVerifiedUser && user?.instituteId) {
        navigate(RouteConstant?.dashboard)

      } else {
        navigate(RouteConstant?.verification)
      }
    }
  }

  return (
    <section>
      <div className="outerflex">
        <div className="left-flex">
          <div className="container" style={divCenter}>
            <CustomCard>
              <div
                className="card px-3 py-3"
                style={{
                  textAlign: "start",
                  width: "100%",
                  maxHeight: "507px",
                  borderRadius: "20px",
                  border: "1px solid #D9E3EE",
                }}
              >
                <div className="card-body">
                  <CardHeading text="Select Course" />
                  <p
                    className="mt-2"
                    style={{
                      color: " #465567",
                      fontWeight: "400",
                      fontSize: "calc(6.40px + 1vmin)",
                    }}
                  >
                    Choose your course and sub-course
                  </p>
                  <Formik
                    initialValues={{ course: "", subcourse: "", courseId: "", subcourseId: "" }}
                    onSubmit={(values) => {

                      finalSignedUp(values)
                    }}
                  >
                    {(props) => {
                      const {
                        values,
                        handleSubmit,
                        setFieldValue,
                      } = props;
                      return (
                        <form onSubmit={handleSubmit}>
                          <Dropdown
                            name="course"
                            name1="courseId"
                            placeholder="Select Course"
                            label="Course"
                            option={course}
                            lefticon={<CourseIcon />}
                            handlefunc={(data) => { getSubCourseById(data?.id); setFieldValue("courseId", data?.id); setFieldValue("course", data?.Title) }}
                            selectedEntity={values?.course}
                            marginBottom="10px "
                          />
                          <Dropdown
                            name="subcourse"
                            name1="subcourseId"
                            placeholder="Select Sub-Course"
                            label="Sub Course"
                            option={subcourse}
                            lefticon={<CourseIcon />}
                            handlefunc={(data) => { setFieldValue("subcourseId", data?.id); setFieldValue("subcourse", data?.Title) }}
                            selectedEntity={values?.subcourse}
                          />
                          
                          <div className="mt-3">
                            {" "}
                            <CustomButton
                              title="Continue"
                              disable={!values?.course || !values.subcourse}
                              background={
                                values?.course && values.subcourse
                                  ? ThemeColors?.primary
                                  : ThemeColors?.disable
                              }
                            />
                          </div>
                        </form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </CustomCard>
          </div>
        </div>
        <img src={img} alt="" className="right-flex" />
      </div>
    </section>
  );
}
