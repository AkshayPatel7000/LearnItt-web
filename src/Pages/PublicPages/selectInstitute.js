import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { InstituteIcon } from "../../assets/icon/inputIcon";
import img from "../../assets/images/Group33631.png";
import CustomButton from "../../customComponents/button/customButton";
import CustomCard from "../../customComponents/card/CustomCard";
import CustomInput from "../../customComponents/customTextInput";
import Dropdown from "../../customComponents/dropdown/dropdown";
import ErrorMsg from "../../customComponents/errorMessage/ErrorMessage";
import { CardHeading } from "../../customComponents/Header/cardheader";
import StudentDetail from "../../services/StudentService";
import { ThemeColors } from "../../theme/theme";
import { RouteConstant } from "../../utils/routes/constant";

const SelectInstitute = () => {
  const [institute, setInstitute] = useState([]);
  const navigate = useNavigate();
  const divCenter = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
  };

  useEffect(() => {
    getAllInstitute();
  }, []);

  const getAllInstitute = async () => {
    const res = await StudentDetail?.getAllInstitute();
    let inst = res.institutes?.map((elm) => {
      return {
        id: elm?.id,
        Title: elm?.instituteName,
        code: elm?.instituteCode,
        label: "Institute",
      };
    });
    setInstitute(inst);
  };

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
                  <CardHeading text="Select Institute" />
                  <p
                    className="mt-2"
                    style={{
                      color: " #465567",
                      fontWeight: "400",
                      fontSize: "calc(6.40px + 1vmin)",
                    }}
                  >
                    Choose your institute
                  </p>
                  <Formik
                    initialValues={{
                      institute: "",
                      institutecode: "",
                      instituteId: "",
                      code: "",
                    }}
                    onSubmit={(values) => {

                      navigate(RouteConstant.course, { state: values })
                    }}
                    validationSchema={Yup.object().shape({
                      institutecode: Yup.string().when("code", {
                        is: (val) => (val && val.length > 0 ? true : false),
                        then: Yup.string().oneOf(
                          [Yup.ref("code")],
                          "Please enter valid Institute code"
                        ),
                      }),
                    })}
                  >
                    {(props) => {
                      const {
                        values,
                        errors,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                      } = props;
                      return (
                        <form onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <Dropdown
                              name="institute"
                              placeholder="Select Institute"
                              label="Institute"
                              option={institute}
                              name1="instituteId"
                              name2="code"
                              handlefunc={(data) => {
                                setFieldValue("instituteId", data?.id);
                                setFieldValue("institute", data?.Title);
                                setFieldValue("code", data?.code);
                              }}
                              selectedEntity={values?.institute}
                              lefticon={<InstituteIcon />}
                            />
                          </div>
                          {values?.institute !== "Other" && (
                            <CustomInput
                              name="institutecode"
                              value={values?.institutecode}
                              type="text"
                              lefticon={<InstituteIcon />}
                              label={"Institute Code"}
                              placeholder={"Institute Code"}
                              onChange={handleChange}
                            />
                          )}
                          {errors?.institutecode && (
                            <ErrorMsg text={errors?.institutecode} />
                          )}

                          <div className="mt-3">
                            <CustomButton
                              title="Continue"
                              type="submit"
                              disable={(values?.institute !== "Other" ? (!values?.institute || !values?.institutecode) : !values?.institute )}
                              background={
                              (values?.institute !== "Other" ? (values?.institute && values?.institutecode) :(values?.institute)) ? ThemeColors?.primary: ThemeColors?.disable
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
};

export default SelectInstitute;
