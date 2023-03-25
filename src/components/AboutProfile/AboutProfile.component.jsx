import "./AboutProfile.component.css";

const AboutProfile = ({ data }) => {
  return (
    <div className="aboutProfile">
      <div className="aboutProfileTitle">
        <img
          src={
            data?.profile?.url ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          alt="prof"
        />
        <p>{data?.name}</p>
      </div>
      <div className="aboutProfileDetails">
        <p>{data?.email}</p>
        <p>{data?.contact}</p>
      </div>
    </div>
  );
};

export default AboutProfile;
