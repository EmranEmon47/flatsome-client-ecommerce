import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";

const Profile = () => {
  const { firebaseUser, mongoUser, updateMongoUser } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (mongoUser) {
      setFormData({
        firstName: mongoUser.firstName || "",
        lastName: mongoUser.lastName || "",
        address: mongoUser.address || "",
      });
      setImagePreview(mongoUser.profileImage || "");
    }
  }, [mongoUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append(
      "upload_preset",
      "flatsome-ecommerce_user_profile_uploads"
    );

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dr38dtcs5/image/upload",
        uploadData
      );
      setImagePreview(res.data.secure_url);
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image.");
    }
  };

  const handleSave = async () => {
    if (!firebaseUser) return;

    setSaving(true);
    try {
      const token = await firebaseUser.getIdToken();

      await axios.put(
        "http://localhost:5000/api/users/me",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          profileImage: imagePreview,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Refetch updated user to sync state
      const userRes = await axios.get("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (userRes.data && updateMongoUser) {
        updateMongoUser(userRes.data);
      }

      setToast("Profile updated successfully.");
      setTimeout(() => setToast(""), 3000);

      setShowConfirm(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (!mongoUser)
    return <div className="mt-10 text-center">Loading profile...</div>;

  return (
    <div className="relative max-w-2xl p-6 mx-auto mt-8 bg-white rounded shadow dark:bg-gray-800 dark:text-white">
      <h2 className="mb-4 text-xl font-bold">User Profile</h2>

      {/* Profile Image */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={imagePreview || "/default-avatar.png"}
          alt="Profile"
          className="object-cover w-20 h-20 border rounded-full"
        />
        <label className="flex items-center gap-1 text-sm text-blue-500 cursor-pointer">
          <FaCloudUploadAlt />
          Upload
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* First Name */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Enter first name"
          className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Last Name */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter last name"
          className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Email Display */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Email</label>
        <input
          type="text"
          value={mongoUser.email || ""}
          disabled
          className="w-full px-3 py-2 text-gray-500 bg-gray-100 border rounded dark:bg-gray-800 dark:text-gray-400"
        />
      </div>

      {/* Address Input */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your address"
          className="w-full px-3 py-2 border rounded resize-none dark:bg-gray-800 dark:text-white"
          rows={3}
        />
      </div>

      {/* Save Button */}
      <button
        onClick={() => setShowConfirm(true)}
        disabled={saving}
        className="px-4 py-2 bg-[#FF6347] text-white rounded hover:bg-red-600 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-w-sm p-6 mx-auto bg-white rounded shadow-md dark:bg-gray-900">
            <p className="mb-4 text-lg text-black dark:text-white">
              Are you sure you want to save changes?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-1 rounded bg-[#FF6347] text-white hover:bg-red-600"
                onClick={handleSave}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Message */}
      {toast && (
        <div className="absolute px-4 py-2 text-white bg-green-600 rounded shadow-lg top-4 right-4 animate-fade-in-out">
          {toast}
        </div>
      )}
    </div>
  );
};

export default Profile;
