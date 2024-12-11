import React, { useState, useEffect } from "react";
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

  // Load profile data from localStorage on mount
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile")) || {
      name: "Mrudula",
      email: "mrudula@gmail.com",
      bio: "A short bio about yourself",
      profilePicture:
        "https://as2.ftcdn.net/v2/jpg/01/45/36/30/1000_F_145363098_3MwMcG2uCbTRo5mAwkZr82HCi6DTkSHh.jpg", // Default image
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
    })
  );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        profilePicture: imageUrl,
      }));
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
              <button onClick={handleEditClick}>Edit Profile</button>
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
