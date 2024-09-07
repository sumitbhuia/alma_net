// import React, { useEffect, useState } from 'react';
// import { createClient } from "../utils/supabase/client";

// interface AvatarProps {
//   userId: string;  // Ensure the prop type is defined here
//   className?: string;  // Make className an optional prop
// }

// const Avatar: React.FC<AvatarProps> = ({ userId }) => {
//     const supabase = createClient();
//   // Allow the state to accept both `string` and `null`
//   const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);
//   const [displayName, setDisplayName] = useState<string>('');

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       // Fetch profile data
//       const { data: profile, error: profileError } = await supabase
//         .from('profiles')
//         .select('display_name')
//         .eq('id', userId)
//         .single();

//       if (profileError) {
//         console.error('Error fetching profile:', profileError);
//         return;
//       }

//       setDisplayName(profile?.display_name || '');

//       // Fetch user file path for profile picture
//       const { data: userFile, error: userFileError } = await supabase
//         .from('user_files')
//         .select('profile_picture_path')
//         .eq('user_id', userId)
//         .single();

//       if (userFileError) {
//         console.error('Error fetching user file:', userFileError);
//         return;
//       }

//       const profilePicPath = userFile?.profile_picture_path;

      
//       if (profilePicPath) {
//         const { data: imageUrl } = supabase
//           .storage
//           .from('user_files')
//           .getPublicUrl(profilePicPath);

//         setProfilePicUrl(imageUrl.publicUrl);
//       }
//     };

//     fetchProfileData();
//   }, [userId]);

//   return (
//     <div className="avatar">
//       {profilePicUrl ? (
//         <img src={profilePicUrl} alt="User profile" className="avatar-image" />
//       ) : (
//         <div className="avatar-placeholder">
//           {displayName.charAt(0).toUpperCase()}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Avatar;


import React, { useEffect, useState } from 'react';
import { createClient } from "../utils/supabase/client";
import { User } from 'lucide-react';

interface AvatarProps {
  userId: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const Avatar: React.FC<AvatarProps> = ({ userId, className = '', size = 'medium' }) => {
  const supabase = createClient();
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        const [profileResult, userFileResult] = await Promise.all([
          supabase
            .from('profiles')
            .select('display_name')
            .eq('id', userId)
            .single(),
          supabase
            .from('user_files')
            .select('profile_picture_path')
            .eq('user_id', userId)
            .single()
        ]);

        if (profileResult.error) throw profileResult.error;
        if (userFileResult.error) throw userFileResult.error;

        setDisplayName(profileResult.data?.display_name || '');

        const profilePicPath = userFileResult.data?.profile_picture_path;
        if (profilePicPath) {
          const { data: imageUrl } = supabase
            .storage
            .from('user_files')
            .getPublicUrl(profilePicPath);
          setProfilePicUrl(imageUrl.publicUrl);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  const sizeClasses = {
    small: 'w-8 h-8 text-xs',
    medium: 'w-12 h-12 text-sm',
    large: 'w-16 h-16 text-base'
  };

  const containerClass = `relative rounded-full overflow-hidden ${sizeClasses[size]} ${className}`;
  const placeholderClass = `flex items-center justify-center w-full h-full bg-blue-500 text-white font-semibold ${sizeClasses[size]}`;

  if (isLoading) {
    return (
      <div className={containerClass}>
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      {profilePicUrl ? (
        <img 
          src={profilePicUrl} 
          alt={`${displayName}'s profile`} 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className={placeholderClass}>
          {displayName ? (
            displayName.charAt(0).toUpperCase()
          ) : (
            <User className="w-1/2 h-1/2" />
          )}
        </div>
      )}
    </div>
  );
};

export default Avatar;