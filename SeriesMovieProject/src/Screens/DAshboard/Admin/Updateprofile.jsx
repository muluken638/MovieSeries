import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import { Input, TextArea } from '../../../Components/UsedInputs';

function Profile() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    bio: '',
  });

  useEffect(() => {
    // Fetch user data from the server or local storage
    const storedUserData = localStorage.getItem('userProfile');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = () => {
    // Save the updated user data to the server or local storage
    localStorage.setItem('userProfile', JSON.stringify(userData));
    // Add any additional actions, such as displaying a success message
  };

  const handleDeleteAccount = () => {
    // Delete the user account from the server or local storage
    localStorage.removeItem('userProfile');
    // Add any additional actions, such as navigating to the login page
  };

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl"> User Profile</h2>
        <Input
          label="Email"
          placeholder="Enter Your Email"
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          bg={true}
        />
        <Input
          label="Password"
          placeholder="********"
          type="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          bg={true}
        />
        <Input
          label="First Name"
          placeholder="Enter Your First Name"
          name="firstName"
          value={userData.firstName}
          onChange={handleInputChange}
          bg={true}
        />
        <Input
          label="Last Name"
          placeholder="Enter Your Last Name"
          name="lastName"
          value={userData.lastName}
          onChange={handleInputChange}
          bg={true}
        />
        <textarea
          label="Bio"
          placeholder="Enter Your Bio"
          name="bio"
          value={userData.bio}
          onChange={handleInputChange}
          bg={true}
        />
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center">
          <button
            className="bg-subMain transitions hover:bg-main border border-border text-white py-3 px-6 rounded hover:scale-95"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
          <button
            className="bg-main transitions hover:bg-subMain border border-border text-white py-3 px-6 rounded hover:scale-95"
            onClick={handleUpdateProfile}
          >
            Update Account
          </button>
        </div>
      </div>
    </SideBar>
  );
}

export default Profile;