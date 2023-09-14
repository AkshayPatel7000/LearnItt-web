import React from "react";
import {
  AboutText,
  CardSubHeading1,
} from "../../../customComponents/Header/cardheader";
import img1 from "../../../assets/images/Arunaboutus.png";
import img from "../../../assets/images/Shaliniaboutus.png";
import { ThemeColors } from "../../../theme/theme";
export default function AboutUs() {
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 30px 30px",
    gap: "20px",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.03)",
    borderRadius: "10px",
    background: '#FAFAFA'
  };

  const para = {
    fontFamily: "Outfit",
    fontSize: "14px",
  };

  return (
    <div style={{ background: "#FFFFFF" }} className='p-4'>
          <p style={para}>
            <span style={ThemeColors?.font?.aboutText}>Krackitt</span> &nbsp; is
            founded by educational experts who have been teachers themselves
            with over 20 years of teaching experience. At KRACKITT you will get
            the best faculty for learning. Our group of faculty members and
            their experience sets us apart from our competitors and will set you
            a part from yours. The closer you look at KRACKITT the more
            confident you will be in your decision to join.
          </p>
          <p style={para}>
            At KRACKITT we have restructured our subject courses to incorporate
            the preparation of entrance examinations like IIT- JEE, NEET, KVPY,
            NTSE, Olympiads etc. We believe that this approach will cut down
            duplicity of effort of students and will maximize their efficiency.
            KRACKITT faculties are themselves leaders, people who have changed
            not only the way of teaching but the success rate of competitive
            examinations.
          </p>

          <p style={para}>
            At KRACKITT user can get our study material, E-Books, videos, Live
            Classes etc the preparation of entrance examinations like IIT- JEE,
            NEET, KVPY, NTSE, Olympiads etc. In any E-learning institution, the
            quality of faculty is most important. At KRACKITT, we provide
            ourselves in having some of the most talented and dedicated faculty.
            Not only they are well experienced and academically amongst the
            best, but have high standards of moral and ethical values.
          </p>

          <p className="mt-3">
            <AboutText text="Our Services" textTransform={"capitalize"} />
          </p>
          <p style={para}>
            We provide Free Study Material, E-Books, Student Notes, Video
            Lectures for aspirants of various competitive Examinations like JEE
            Mains, JEE Advance, NEET, AIIMS, KVPY, Olympiads as well as School
            Board Exams. Best designed content for Easy learning and lots of
            Free Mock Tests for All Subjects are available.  
          </p>
  

        <p>
          <AboutText text="Our Founders" textTransform={"capitalize"} />
        </p>

        <div className="row gap-5 m-0">
          <div className="col-md-4 col-lg-3 col-sm-12 col-xl-3 card" style={cardStyle}>
            <div className="justify-content-center">
              <img src={img1} alt="background" />
            </div>

            <div className="justify-content-center">
              <CardSubHeading1
                text="Arun Kumar Sharma"
                color={ThemeColors?.black}
              />
            </div>

            <div className="justify-content-center d-flex flex-column gap-2">
              <span style={ThemeColors.font.AboutCard}>
                {" "}
                <span style={{ color: ThemeColors?.lightBlue }}>
                  Qualification :
                </span>{" "}
                B.Tech(Comp. Science).{" "}
              </span>
              <span style={ThemeColors.font.AboutCard}>
                {" "}
                <span style={{ color: ThemeColors?.lightBlue }}>
                  Email :
                </span>{" "}
                arun.sharma.1780@gmail.com{" "}
              </span>
              <span style={ThemeColors.font.AboutCard}>
                {" "}
                <span style={{ color: ThemeColors?.lightBlue }}>
                  Contact No :
                </span>{" "}
                +91 -9200425737{" "}
              </span>
            </div>
          </div>

          <div className="col-md-4 col-lg-3 col-sm-12 col-xl-3  card" style={cardStyle}>
            <div className="justify-content-center">
              <img src={img} alt="background" />
            </div>

            <div className="justify-content-center">
              <CardSubHeading1
                text="Shalini Sharma"
                color={ThemeColors?.black}
              />
            </div>

            <div className="justify-content-center d-flex flex-column gap-2">
              <span style={ThemeColors.font.AboutCard}>
                {" "}
                <span style={{ color: ThemeColors?.lightBlue }}>
                  Qualification :
                </span>{" "}
                M.Sc. (Mathematics)/ MA(English).{" "}
              </span>
              <span style={ThemeColors.font.AboutCard}>
                {" "}
                <span style={{ color: ThemeColors?.lightBlue }}>
                  Email :
                </span>{" "}
                shalinisharma@gmail.com{" "}
              </span>
              <span style={ThemeColors.font.AboutCard}>
                {" "}
                <span style={{ color: ThemeColors?.lightBlue }}>
                  Contact No :
                </span>{" "}
                +91 -9713188883{" "}
              </span>
            </div>
          </div>
        </div>

      </div>
   
  );
}
