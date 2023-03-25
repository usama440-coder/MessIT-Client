import Greeting from "../../components/Greeting/Greeting.component";
import Navbar from "../../components/Navbar/Navbar.component";
import SectionBreak from "../../components/SectionBreak/SectionBreak.component";
import "./Profile.page.css";
import { useSelector } from "react-redux";

const Profile = () => {
  const role = useSelector((state) => state.auth.role);
  const user = useSelector((state) => state.auth.user);

  const handleChange = () => {};

  return (
    <div className="profile">
      <Navbar />
      <div className="profileContainer">
        <div className="profileWrapper">
          <Greeting />
          <SectionBreak title="profile" />
          <div className="userContainer">
            <div className="userImageRole">
              <img
                src={
                  user?.user?.profile?.url ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                alt="profileImage"
              />
              <p>{role}</p>
            </div>
            <form>
              <div className="splitInputs">
                <div className="inputContainer">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={user?.user?.name}
                    onChange={handleChange}
                    disabled
                  />
                </div>
                <div className="inputContainer">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={user?.user?.email}
                    onChange={handleChange}
                    disabled
                  />
                </div>
              </div>
              <div className="splitInputs">
                <div className="inputContainer">
                  <label>Contact Number</label>
                  <input
                    type="text"
                    value={user?.user?.contact}
                    onChange={handleChange}
                    disabled
                  />
                </div>
                <div className="inputContainer">
                  <label>Mess</label>
                  <input
                    type="text"
                    value={user?.mess?.name}
                    onChange={handleChange}
                    disabled
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
