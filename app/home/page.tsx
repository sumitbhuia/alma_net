
// This one was the final one shown at hackathon

// "use client";
// import "../globals.css";
// import React, { useState, useEffect, use } from 'react';
// import { Search, Pencil, Heart, X, Calendar, DollarSign } from 'lucide-react';
// import { motion, Variants, useInView } from 'framer-motion';
// import { createClient } from "../../utils/supabase/client";
// import useProfile from "../hook/useProfile";
// import Avatar from "@/components/Avatar";
// import { useRouter } from "next/navigation";
// import { useEvents } from "../hook/useEvents";


// const supabase = createClient();

// interface CardProps {
//   name: string;
//   courseOrCompany: string;
//   isStudent: boolean;
//   userId: string;
// }

// const cardVariants: Variants = {
//   offscreen: {
//     y: 50,
//     opacity: 0,
//   },
//   onscreen: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       type: "spring",
//       bounce: 0.4,
//       duration: 0.3,
//     },
//   },
// };

// const Card: React.FC<CardProps> = ({ name, courseOrCompany, isStudent, userId }) => {
//   const ref = React.useRef<HTMLDivElement>(null);
//   const isInView = useInView(ref, { once: true });

//   return (
//     <motion.div
//       ref={ref}
//       className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
//       initial="offscreen"
//       animate={isInView ? "onscreen" : "offscreen"}
//       variants={cardVariants}
//     >
//       <div className="flex items-center">
//         <Avatar userId={userId} className="w-12 h-12" />
//         <div className="ml-4">
//           <p className="font-semibold text-neutral-900 dark:text-neutral-50">{name}</p>
//           <p className="text-sm text-neutral-600 dark:text-neutral-400">
//             {isStudent ? `Course: ${courseOrCompany}` : `Company: ${courseOrCompany}`}
//           </p>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const HomePage: React.FC = () => {
//   const [isPostingModalOpen, setIsPostingModalOpen] = useState<boolean>(false);
//   const [expandedPost, setExpandedPost] = useState<number | null>(null);
//   const [newComment, setNewComment] = useState<string>("");
//   const [comments, setComments] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [users, setUsers] = useState<{
//     userId: string; name: string; courseOrCompany: string; isStudent: boolean 
//   }[]>([]);
//   const [posts, setPosts] = useState<any[]>([]);
//   const { data: profileData, isLoading: isProfileLoading } = useProfile();
//   const router = useRouter();
//   const { events, isLoading: isEventLoading } = useEvents();

  
// type ProfileData = {
//   user_role: string;
// };

// useEffect(() => {
//   const fetchUserRole = async () => {
//     const { data, error } = await supabase
//       .from('profiles')
//       .select('user_role')
//       .eq('id', profileData?.id)
//       .single<ProfileData>(); // Type assertion to specify the expected type

//     if (error) {
//       console.error('Error fetching user role:', error);
//     } else if (data) {
//       console.log('User role:', data.user_role); // Do something with data.user_role
//     }
//   };

//   fetchUserRole();
// }, [profileData?.id]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const { data, error } = await supabase
//         .from('post')
//         .select(`
//           id,
//           title,
//           description,
//           user_id,
//           created_at,
//           profiles (display_name) 
//         `)
//         .order('created_at', { ascending: false });

//       if (error) {
//         console.error('Error fetching posts:', error);
//       } else {
//         setPosts(data);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const fetchComments = async (postId: string) => {
//     const { data, error } = await supabase
//       .from('comments')
//       .select(`
//         id,
//         content,
//         user_id,
//         profiles (display_name)
//       `)
//       .eq('post_id', postId)
//       .order('created_at', { ascending: true });

//     if (error) {
//       console.error('Error fetching comments:', error);
//     } else {
//       setComments(data);
//     }
//   };

//   useEffect(() => {
//     if(profileData && !isProfileLoading){
//       const fetchUsers = async (search="") => {
//         const userRole = profileData?.user_role;

//         const { data, error } = await supabase
//           .from('profiles')
//           .select('display_name, current_company, user_role, course, id')
//           .neq("user_role", userRole)
//           .ilike('display_name', `%${search}%`);

//         if (error) {
//           console.error('Error fetching users:', error);
//         } else {
//           const mappedUsers = data.map(user => ({
//             name: user.display_name || 'Unknown',
//             courseOrCompany: user.current_company || user.course,
//             isStudent: user.user_role === 'student',
//             userId: user.id,
//           }));
//           setUsers(mappedUsers);
//         }
//       };

//       fetchUsers(searchTerm);
//     }
//   }, [profileData, isProfileLoading, searchTerm]);



//   // const debouncedSearchTerm = useDebounce(searchTerm, 300);
//   // const { data: usersList, isLoading: isUsersLoading } = useQuery(
//   //   ['users', debouncedSearchTerm],
//   //   () => fetchUsers(debouncedSearchTerm),
//   //   { enabled: !!profileData }
//   // );

//   const openPostModal = async (postId: number) => {
//     const existingPost = posts.find(post => post.id === postId);
    
//     if (!existingPost) {
//       const { data: postData, error: postError } = await supabase
//         .from('post')
//         .select(`
//           id,
//           title,
//           description,
//           user_id,
//           created_at,
//           profiles (display_name)
//         `)
//         .eq('id', postId)
//         .single();

//       if (postError) {
//         console.error('Error fetching post:', postError);
//         return;
//       }

//       setPosts(prevPosts => [...prevPosts, postData]);
//     }

//     setExpandedPost(postId);
//     fetchComments(postId.toString());
//   };

//   const closePostModal = () => {
//     setExpandedPost(null);
//   };

//   const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setNewComment(event.target.value);
//   };

//   const handlePostSubmit = async () => {
//     if (!profileData) return;

//     const postContent = document.querySelector('textarea')?.value;

//     const { data, error } = await supabase
//       .from('post')
//       .insert({
//         title: postContent,
//         description: postContent,
//         user_id: profileData.id,
//       });

//     if (error) {
//       console.error('Error creating post:', error);
//     } else {
//       setIsPostingModalOpen(false);
//       setPosts([]);
//     }
//   };

//   const handleCommentSubmit = async () => {
//     if (profileData) {
//       const { data, error } = await supabase
//         .from('comments')
//         .insert({
//           content: newComment,
//           post_id: expandedPost,
//           user_id: profileData.id,
//         });

//       if (error) {
//         console.error('Error posting comment:', error);
//       } else {
//         if (expandedPost !== null) {
//           fetchComments(expandedPost.toString());
//         }
//         setNewComment('');
//       }
//     }
//   };

//   useEffect(() => {
//     if (expandedPost !== null) {
//       fetchComments(expandedPost.toString());
//     }
//   }, [expandedPost]);

//   if(isProfileLoading){
//     return <div className="flex items-center justify-center h-screen">
//       <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
//     </div>
//   }

//   return (
//     <div className="w-full h-[calc(100vh-4rem)] flex bg-neutral-100 dark:bg-neutral-900">
//       {/* Left Section */}
//       <div className="w-1/3 border-r border-neutral-300 dark:border-neutral-700 overflow-auto">
//         <div className="sticky top-0 bg-white dark:bg-neutral-800 shadow-md z-10 p-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search students or alumni..."
//               className="w-full p-2 pl-10 border rounded-lg bg-neutral-100 dark:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-200"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
//           </div>
//         </div>
//         <div className="grid grid-cols-1 gap-4 p-4">
//           {users.map((user, index) => (
//             <Card
//               key={index}
//               name={user.name}
//               courseOrCompany={user.courseOrCompany}
//               isStudent={user.isStudent}
//               userId={user.userId}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Middle Section */}
//       <div className="w-5/12 border-l border-r border-neutral-300 dark:border-neutral-700 overflow-auto">
//         <div className="sticky top-0 bg-white dark:bg-neutral-800 shadow-md z-10 p-4">
//           <div className="flex items-center">
//             <Avatar userId={profileData?.id ?? ""} className="w-10 h-10 mr-3" />
//             <button
//               onClick={() => setIsPostingModalOpen(true)}
//               className="flex-grow p-2 text-left bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-200 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
//             >
//               What's on your mind?
//             </button>
//             <button
//               onClick={() => setIsPostingModalOpen(true)}
//               className="ml-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors transform hover:scale-105 duration-300"
//             >
//               <Pencil size={20} />
//             </button>
//           </div>
//         </div>
//         <div className="p-4 space-y-4">
//           {posts.map((post) => (
//             <motion.div
//               key={post.id}
//               className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-102 hover:shadow-xl cursor-pointer"
//               onClick={() => openPostModal(post.id)}
//               whileHover={{ scale: 1.02 }}
//               transition={{ type: "spring", stiffness: 400, damping: 10 }}
//             >
//               <div className="flex items-center mb-3">
//                 <Avatar userId={post.user_id} className="w-10 h-10 mr-3 pr-30" />
//                 <div>
//                   <p className="font-semibold text-neutral-800 dark:text-neutral-200">{post.profiles?.display_name || 'Unknown User'}</p>
//                   <p className="text-sm text-neutral-500 dark:text-neutral-400">{new Date(post.created_at).toLocaleString()}</p>
//                 </div>
//               </div>
//               <p className="text-neutral-700 dark:text-neutral-300 mb-3">{post.description}</p>
//               <div className="flex items-center space-x-4">
//                 <button className="flex items-center text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400">
//                   <Heart size={20} className="mr-1" /> Like
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
      
//       {/* Right Section */}
// {/* Right Section */}
// <div className="w-1/4 p-4 overflow-auto">
//   <div className="space-y-4">
//     {profileData?.user_role === "alumni" && (
//       <>
//         <motion.div 
//           className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg"
//           whileHover={{ scale: 1.05 }}
//           transition={{ type: "spring", stiffness: 400, damping: 10 }}
//         >
//           <button 
//             onClick={() => router.push("/events")}
//             className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
//           >
//             <Calendar size={20} className="mr-2" />
//             Create Event
//           </button>
//         </motion.div>
//         <motion.div 
//           className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg"
//           whileHover={{ scale: 1.05 }}
//           transition={{ type: "spring", stiffness: 400, damping: 10 }}
//         >
//           <button 
//             onClick={() => router.push("/donate")}
//             className="w-full p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
//           >
//             <DollarSign size={20} className="mr-2" />
//             Donate now
//           </button>
//         </motion.div>
//       </>
//     )}

//     <motion.div 
//       className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg"
//       whileHover={{ scale: 1.05 }}
//       transition={{ type: "spring", stiffness: 400, damping: 10 }}
//     >
//       <button 
//         onClick={() => router.push("/funds")}
//         className="w-full p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
//       >
//         <DollarSign size={20} className="mr-2" />
//         Raise Funding
//       </button>
//     </motion.div>
//   </div>

//   <div className="mt-8">
//     <h2 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-neutral-200">Upcoming Events</h2>
//     <div className="space-y-4">
//       {events.map((event) => (
//         <motion.div 
//           key={event.id} 
//           className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-md"
//           whileHover={{ scale: 1.03 }}
//           transition={{ type: "spring", stiffness: 400, damping: 10 }}
//         >
//           <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">{event.name}</h3>
//           <p className="text-sm text-neutral-600 dark:text-neutral-400">{event.description}</p>
//           <p className="text-sm text-neutral-600 dark:text-neutral-400">
//             {event.is_online ? `Online Event` : `Location: ${event.location}`}
//           </p>
//           <a
//             href={event.url}
//             className="text-blue-500 dark:text-blue-400 hover:underline"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Join now
//           </a>
//           <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
//             Date: {new Date(event.date).toLocaleString()}
//           </p>
//         </motion.div>
//       ))}
//     </div>
//   </div>
// </div>

//       {/* Posting Modal */}
//       {isPostingModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
//           <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.3 }}
//           className="bg-white dark:bg-neutral-800 p-6 rounded-lg w-full max-w-lg"
//         >
//           <textarea
//             className="w-full p-3 border rounded-lg dark:bg-neutral-700 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="What's on your mind?"
//             rows={4}
//           ></textarea>
//           <div className="flex justify-end mt-4">
//             <button
//               onClick={() => setIsPostingModalOpen(false)}
//               className="mr-2 px-4 py-2 bg-neutral-200 text-neutral-800 rounded-lg dark:bg-neutral-600 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-500 transition-colors"
//             >
//               Cancel
//             </button>
//             <button 
//               onClick={handlePostSubmit}
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Post
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     )}

//     {/* Expanded Post Modal */}
//     {expandedPost !== null && posts.find(post => post.id === expandedPost) && (
//       <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
//         <motion.div 
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.3 }}
//           className="bg-white dark:bg-neutral-800 p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
//         >
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Post Details</h2>
//             <button onClick={closePostModal} className="text-neutral-500 dark:text-neutral-300 hover:text-neutral-700 dark:hover:text-neutral-100">
//               <X size={24} />
//             </button>
//           </div>
//           {(() => {
//             const post = posts.find(post => post.id === expandedPost);
//             return post && (
//               <div>
//                 <div className="flex items-center mb-4">
//                   <Avatar userId={post.user_id} className="w-12 h-12 mr-3" />
//                   <div>
//                     <p className="font-semibold text-neutral-800 dark:text-neutral-200">{post.profiles?.display_name || 'User Name'}</p>
//                     <p className="text-sm text-neutral-500 dark:text-neutral-400">{new Date(post.created_at).toLocaleString()}</p>
//                   </div>
//                 </div>
//                 <p className="text-neutral-700 dark:text-neutral-300 mb-4">{post.description}</p>
//                 <div className="mb-4 flex items-center">
//                   <button className="flex items-center text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400">
//                     <Heart size={20} className="mr-1" /> Like
//                   </button>
//                 </div>
//                 <div className="border-t pt-4">
//                   <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Comments</h3>
//                   <div className="space-y-4">
//                     {comments.length > 0 ? (
//                       comments.map((comment) => (
//                         <div key={comment.id} className="flex items-start">
//                           <Avatar userId={comment.user_id} className="w-8 h-8 mr-3" />
//                           <div>
//                             <p className="font-semibold text-neutral-800 dark:text-neutral-200">{comment.profiles?.display_name || 'Unknown User'}</p>
//                             <p className="text-sm text-neutral-600 dark:text-neutral-400">{comment.content}</p>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-neutral-500 dark:text-neutral-400">No comments yet</p>
//                     )}
//                   </div>
//                   <div className="mt-4">
//                     <textarea
//                       value={newComment}
//                       onChange={handleCommentChange}
//                       className="w-full p-3 border rounded-lg dark:bg-neutral-700 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       placeholder="Add your reply..."
//                       rows={3}
//                     ></textarea>
//                     <button
//                       onClick={handleCommentSubmit}
//                       className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                     >
//                       Reply
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })()}
//         </motion.div>
//       </div>
//     )}
//   </div>
// );
// }

// export default HomePage;

// function useDebounce(searchTerm: string, arg1: number) {
//   throw new Error("Function not implemented.");
// }








"use client";
import "../globals.css";
import React, { useState, useEffect } from 'react';
import { Search, Pencil, Heart, X, Calendar, DollarSign } from 'lucide-react';
import { motion, Variants, useInView } from 'framer-motion';
import { createClient } from "../../utils/supabase/client";
import useProfile from "../hook/useProfile";
import Avatar from "@/components/Avatar";
import { useRouter } from "next/navigation";
import { useEvents } from "../hook/useEvents";

const supabase = createClient();

interface CardProps {
  name: string;
  courseOrCompany: string;
  isStudent: boolean;
  userId: string;
}

const cardVariants: Variants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.3,
    },
  },
};

const Card: React.FC<CardProps> = ({ name, courseOrCompany, isStudent, userId }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      initial="offscreen"
      animate={isInView ? "onscreen" : "offscreen"}
      variants={cardVariants}
    >
      <div className="flex items-center">
        <Avatar userId={userId} className="w-12 h-12" />
        <div className="ml-4">
          <p className="font-semibold text-neutral-900 dark:text-neutral-50">{name}</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {isStudent ? `Course: ${courseOrCompany}` : `Company: ${courseOrCompany}`}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const HomePage: React.FC = () => {
  const [isPostingModalOpen, setIsPostingModalOpen] = useState<boolean>(false);
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [newComment, setNewComment] = useState<string>("");
  const [comments, setComments] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, setUsers] = useState<{
    userId: string; name: string; courseOrCompany: string; isStudent: boolean 
  }[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const { data: profileData, isLoading: isProfileLoading } = useProfile();
  const router = useRouter();
  const { events, isLoading: isEventLoading } = useEvents();

  type ProfileData = {
    user_role: string;
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('user_role')
        .eq('id', profileData?.id)
        .single<ProfileData>();

      if (error) {
        console.error('Error fetching user role:', error);
      } else if (data) {
        console.log('User role:', data.user_role);
      }
    };

    fetchUserRole();
  }, [profileData?.id]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('post')
        .select(`
          id,
          title,
          description,
          user_id,
          created_at,
          profiles (display_name) 
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data);
      }
    };

    fetchPosts();
  }, []);

  const fetchComments = async (postId: string) => {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        id,
        content,
        user_id,
        profiles (display_name)
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      setComments(data);
    }
  };

  useEffect(() => {
    if(profileData && !isProfileLoading){
      const fetchUsers = async (search="") => {
        const userRole = profileData?.user_role;

        const { data, error } = await supabase
          .from('profiles')
          .select('display_name, current_company, user_role, course, id')
          .neq("user_role", userRole)
          .ilike('display_name', `%${search}%`);

        if (error) {
          console.error('Error fetching users:', error);
        } else {
          const mappedUsers = data.map(user => ({
            name: user.display_name || 'Unknown',
            courseOrCompany: user.current_company || user.course,
            isStudent: user.user_role === 'student',
            userId: user.id,
          }));
          setUsers(mappedUsers);
        }
      };

      fetchUsers(searchTerm);
    }
  }, [profileData, isProfileLoading, searchTerm]);

  const openPostModal = async (postId: number) => {
    const existingPost = posts.find(post => post.id === postId);
    
    if (!existingPost) {
      const { data: postData, error: postError } = await supabase
        .from('post')
        .select(`
          id,
          title,
          description,
          user_id,
          created_at,
          profiles (display_name)
        `)
        .eq('id', postId)
        .single();

      if (postError) {
        console.error('Error fetching post:', postError);
        return;
      }

      setPosts(prevPosts => [...prevPosts, postData]);
    }

    setExpandedPost(postId);
    fetchComments(postId.toString());
  };

  const closePostModal = () => {
    setExpandedPost(null);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value);
  };

  const handlePostSubmit = async () => {
    if (!profileData) return;

    const postContent = document.querySelector('textarea')?.value;

    const { data, error } = await supabase
      .from('post')
      .insert({
        title: postContent,
        description: postContent,
        user_id: profileData.id,
      });

    if (error) {
      console.error('Error creating post:', error);
    } else {
      setIsPostingModalOpen(false);
      setPosts([]);
    }
  };

  const handleCommentSubmit = async () => {
    if (profileData) {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          content: newComment,
          post_id: expandedPost,
          user_id: profileData.id,
        });

      if (error) {
        console.error('Error posting comment:', error);
      } else {
        if (expandedPost !== null) {
          fetchComments(expandedPost.toString());
        }
        setNewComment('');
      }
    }
  };

  useEffect(() => {
    if (expandedPost !== null) {
      fetchComments(expandedPost.toString());
    }
  }, [expandedPost]);

  if(isProfileLoading){
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  }

  return (
    <div className="w-full min-h-screen bg-neutral-100 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section */}
          <div className="w-full lg:w-1/3 space-y-4">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search students or alumni..."
                  className="w-full p-2 pl-10 border rounded-lg bg-neutral-100 dark:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
              </div>
            </div>
            <div className="space-y-4">
              {users.map((user, index) => (
                <Card
                  key={index}
                  name={user.name}
                  courseOrCompany={user.courseOrCompany}
                  isStudent={user.isStudent}
                  userId={user.userId}
                />
              ))}
            </div>
          </div>

          {/* Middle Section */}
          <div className="w-full lg:w-5/12 space-y-4">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4">
              <div className="flex items-center">
                <Avatar userId={profileData?.id ?? ""} className="w-10 h-10 mr-3" />
                <button
                  onClick={() => setIsPostingModalOpen(true)}
                  className="flex-grow p-2 text-left bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-200 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                >
                  What's on your mind?
                </button>
                <button
                  onClick={() => setIsPostingModalOpen(true)}
                  className="ml-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors transform hover:scale-105 duration-300"
                >
                  <Pencil size={20} />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-102 hover:shadow-xl cursor-pointer"
                  onClick={() => openPostModal(post.id)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex items-center mb-3">
                    <Avatar userId={post.user_id} className="w-10 h-10 mr-3" />
                    <div>
                      <p className="font-semibold text-neutral-800 dark:text-neutral-200">{post.profiles?.display_name || 'Unknown User'}</p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">{new Date(post.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 mb-3">{post.description}</p>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400">
                      <Heart size={20} className="mr-1" /> Like
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Right Section */}
          <div className="w-full lg:w-1/4 space-y-4">
            <div className="space-y-4">
              {profileData?.user_role === "alumni" && (
                <>
                  <motion.div 
                    className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <button 
                      onClick={() => router.push("/events")}
                      className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      <Calendar size={20} className="mr-2" />
                      Create Event
                    </button>
                  </motion.div>
                  <motion.div 
                    className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <button 
                      onClick={() => router.push("/donate")}
                      className="w-full p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                    >
                      <DollarSign size={20} className="mr-2" />
                      Donate now
                    </button>
                  </motion.div>
                </>
              )}

              <motion.div 
                className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <button 
                  onClick={() => router.push("/funds")}
                  className="w-full p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <DollarSign size={20} className="mr-2" />
                  Raise Funding
                </button>
              </motion.div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semib

old mb-4 text-neutral-800 dark:text-neutral-200">Upcoming Events</h2>
              <div className="space-y-4">
                {events.map((event) => (
                  <motion.div 
                    key={event.id} 
                    className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-md"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">{event.name}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{event.description}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {event.is_online ? `Online Event` : `Location: ${event.location}`}
                    </p>
                    <a
                      href={event.url}
                      className="text-blue-500 dark:text-blue-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join now
                    </a>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                      Date: {new Date(event.date).toLocaleString()}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posting Modal */}
      {isPostingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-neutral-800 p-6 rounded-lg w-full max-w-lg"
          >
            <textarea
              className="w-full p-3 border rounded-lg dark:bg-neutral-700 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What's on your mind?"
              rows={4}
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsPostingModalOpen(false)}
                className="mr-2 px-4 py-2 bg-neutral-200 text-neutral-800 rounded-lg dark:bg-neutral-600 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-500 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handlePostSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Post
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Expanded Post Modal */}
      {expandedPost !== null && posts.find(post => post.id === expandedPost) && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-neutral-800 p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Post Details</h2>
              <button onClick={closePostModal} className="text-neutral-500 dark:text-neutral-300 hover:text-neutral-700 dark:hover:text-neutral-100">
                <X size={24} />
              </button>
            </div>
            {(() => {
              const post = posts.find(post => post.id === expandedPost);
              return post && (
                <div>
                  <div className="flex items-center mb-4">
                    <Avatar userId={post.user_id} className="w-12 h-12 mr-3" />
                    <div>
                      <p className="font-semibold text-neutral-800 dark:text-neutral-200">{post.profiles?.display_name || 'User Name'}</p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">{new Date(post.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 mb-4">{post.description}</p>
                  <div className="mb-4 flex items-center">
                    <button className="flex items-center text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400">
                      <Heart size={20} className="mr-1" /> Like
                    </button>
                  </div>
                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Comments</h3>
                    <div className="space-y-4">
                      {comments.length > 0 ? (
                        comments.map((comment) => (
                          <div key={comment.id} className="flex items-start">
                            <Avatar userId={comment.user_id} className="w-8 h-8 mr-3" />
                            <div>
                              <p className="font-semibold text-neutral-800 dark:text-neutral-200">{comment.profiles?.display_name || 'Unknown User'}</p>
                              <p className="text-sm text-neutral-600 dark:text-neutral-400">{comment.content}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-neutral-500 dark:text-neutral-400">No comments yet</p>
                      )}
                    </div>
                    <div className="mt-4">
                      <textarea
                        value={newComment}
                        onChange={handleCommentChange}
                        className="w-full p-3 border rounded-lg dark:bg-neutral-700 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add your reply..."
                        rows={3}
                      ></textarea>
                      <button
                        onClick={handleCommentSubmit}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default HomePage;