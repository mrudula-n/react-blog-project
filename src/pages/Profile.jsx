import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext"; // Import the AuthContext
import { useNavigate } from "react-router-dom"; // For redirection
import styles from "./Profile.module.css";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    profilePicture: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });
  const { logout } = useAuthContext(); // Get the logout function from AuthContext
  const navigate = useNavigate();

  // Load profile data from localStorage on mount
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile")) || {
      name: "John Doe",
      email: "johndoe@example.com",
      bio: "A short bio about yourself",
      profilePicture: "/default-profile.png", // Default image if none is set
    };
    setProfile(savedProfile);
  }, []);

  const handleEditClick = () => {
    setFormData({ ...profile });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(file.type)) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageUrl = reader.result;
        setFormData((prev) => ({
          ...prev,
          profilePicture: imageUrl,
        }));
      };

      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image (JPEG, PNG, GIF).");
    }
  };

  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(formData));
    setProfile(formData);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/login"); // Redirect to the login page
    alert("You have been logged out.");
  };

  return (
    <div className={styles.profilePage}>
      <h1>Profile Page</h1>
      <div className={styles.profileContainer}>
        <div className={styles.profilePicture}>
          <img
            src={profile.profilePicture || "/default-profile.png"}
            alt="Profile"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/jpeg, image/png, image/gif"
              onChange={handleImageChange}
            />
          )}
        </div>
        <div className={styles.profileDetails}>
          {!isEditing ? (
            <>
              <h2>{profile.name}</h2>
              <p>Email: {profile.email}</p>
              <p>Bio: {profile.bio}</p>
              <div className={styles.actionButtons}>
                <button onClick={handleEditClick}>Edit Profile</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </>
          ) : (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
              />
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Your Bio"
              />
              <div className={styles.actionButtons}>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
