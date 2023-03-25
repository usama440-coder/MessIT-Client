import Greeting from "../../components/Greeting/Greeting.component";
import Navbar from "../../components/Navbar/Navbar.component";
import SectionBreak from "../../components/SectionBreak/SectionBreak.component";
import "./About.page.css";
import AboutProfile from "../../components/AboutProfile/AboutProfile.component";
import userService from "../../services/userService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Loader from "../../components/Loders";

const About = () => {
  const token = useSelector((state) => state.auth.user.token);
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await userService.aboutSection(token);
        setAboutData(res?.data || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="about">
      <Navbar />
      <div className="aboutContainer">
        <div className="aboutWrapper">
          <Greeting />
          {loading ? (
            <Loader />
          ) : (
            <>
              <SectionBreak title="staff" />
              <div className="aboutProfileContainer">
                {aboutData?.staff?.map((data) => {
                  return <AboutProfile key={data?._id} data={data} />;
                })}
              </div>
              <SectionBreak title="secretary" />
              <div className="aboutProfileContainer">
                {aboutData?.secretary?.map((data) => {
                  return <AboutProfile key={data?._id} data={data} />;
                })}
              </div>
              <SectionBreak title="cashier" />
              <div className="aboutProfileContainer">
                {aboutData?.cashier?.map((data) => {
                  return <AboutProfile key={data?._id} data={data} />;
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
