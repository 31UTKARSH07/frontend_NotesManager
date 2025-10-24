import { useState, useEffect, useRef } from 'react'; 
import axios from '../lib/axios';
import toast from 'react-hot-toast'; 

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null); 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/user/profile');
        setProfileData(response.data);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);
  if (loading) {
    return <div className="text-center p-10">Loading Profile...</div>;
  }

  if (!profileData) {
    return <div className="text-center p-10">Could not load profile.</div>;
  }
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file); 

    const toastId = toast.loading('Uploading picture...');
    try {
      const response = await axios.put('/user/profile/picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setProfileData((prevData) => ({
        ...prevData,
        user: { ...prevData.user, avatarUrl: response.data.avatarUrl },
      }));
      toast.success('Picture updated!', { id: toastId });
    } catch (error) {
      toast.error('Upload failed. Please try again.', { id: toastId });
      console.error("Failed to upload profile picture:", error);
    }
  };
  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-base-200 rounded-lg shadow-lg">
      <div className="flex flex-col items-center mb-6">
        
        <div className="relative">
          <img
            src={profileData.user.avatarUrl || `https://ui-avatars.com/api/?name=${profileData.user.username}&background=random`}
            alt="Profile Avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-base-100"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-0 right-0 bg-primary text-primary-content p-2 rounded-full hover:bg-primary-focus"
            title="Change profile picture"
          >
            ✏️
          </button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/gif"
          className="hidden"
        />
        <h1 className="text-3xl font-bold mt-4">{profileData.user.username}</h1>
      </div>
      <div className="space-y-4">
        <div className="p-4 bg-base-100 rounded-md">
          <p className="text-sm text-base-content/60">Email</p>
          <p className="text-lg font-semibold">{profileData.user.email}</p>
        </div>
        <div className="p-4 bg-base-100 rounded-md">
          <p className="text-sm text-base-content/60">Total Notes Created</p>
          <p className="text-lg font-semibold">{profileData.noteCount}</p>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;