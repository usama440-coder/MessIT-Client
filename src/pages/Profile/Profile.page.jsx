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
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
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
