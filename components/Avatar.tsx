import React, { useEffect, useState } from 'react';
import { createClient } from "../utils/supabase/client";

interface AvatarProps {
  userId: string;  // Ensure the prop type is defined here
  className?: string;  // Make className an optional prop
}

const Avatar: React.FC<AvatarProps> = ({ userId }) => {
    const supabase = createClient();
  // Allow the state to accept both `string` and `null`
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>('');

  useEffect(() => {
    const fetchProfileData = async () => {
      // Fetch profile data
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        return;
      }

      setDisplayName(profile?.display_name || '');

      // Fetch user file path for profile picture
      const { data: userFile, error: userFileError } = await supabase
        .from('user_files')
        .select('profile_picture_path')
        .eq('user_id', userId)
        .single();

      if (userFileError) {
        console.error('Error fetching user file:', userFileError);
        return;
      }

      const profilePicPath = userFile?.profile_picture_path;

      
      if (profilePicPath) {
        const { data: imageUrl } = supabase
          .storage
          .from('user_files')
          .getPublicUrl(profilePicPath);

        setProfilePicUrl(imageUrl.publicUrl);
      }
    };

    fetchProfileData();
  }, [userId]);

  return (
    <div className="avatar">
      {profilePicUrl ? (
        <img src={profilePicUrl} alt="User profile" className="avatar-image" />
      ) : (
        <div className="avatar-placeholder">
          {displayName.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default Avatar;
