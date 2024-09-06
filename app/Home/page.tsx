"use client";
import "../globals.css";
import React, { useState, useEffect } from 'react';
import { Search, Pencil, Heart, X } from 'lucide-react';
import { motion, Variants ,useInView } from 'framer-motion';
import { createClient } from "../../utils/supabase/client";
import useProfile from "../hook/useProfile";
import Avatar from "@/components/Avatar";

const supabase = createClient();

// Define animation variants
interface CardProps {
  name: string;
  courseOrCompany: string;
  isStudent: boolean;
  userId: string;
}

const cardVariants: Variants = {
  offscreen: {
    y: 100,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.4, // Decreased duration for faster animation
    },
  },
  hidden: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
    },
  },
};

const Card: React.FC<CardProps> = ({ name, courseOrCompany, isStudent, userId }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-200px 0px 0px 0px" });

  return (
    <motion.div
      ref={ref}
      className="bg-neutral-100 dark:bg-neutral-950 p-4 rounded-lg shadow-lg"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      variants={cardVariants}
      animate={isInView ? "onscreen" : "hidden"}
    >
      <div className="flex items-center">
        {/* <img
          src={`/api/placeholder/128/128`}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        /> */}
        <Avatar userId={userId} />
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
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search input
  const [users, setUsers] = useState<{
    userId: string; name: string; courseOrCompany: string; isStudent: boolean 
}[]>([]);
  const { data: profileData, isLoading: isProfileLoading } = useProfile();
  
  useEffect(() => {
    if(profileData && !isProfileLoading){

    const fetchUsers = async (search="") => {
      const userRole=profileData?.user_role;

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


  const openPostModal = (postId: number) => {
    setExpandedPost(postId);
  };

  const closePostModal = () => {
    setExpandedPost(null);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    // Handle comment submission
    console.log("Comment added:", newComment);
    setNewComment("");
  };

  if(isProfileLoading){
    return <div>Loading...</div>
  }


  return (
    <div className="w-full h-[calc(100vh-4rem)] flex">
      {/* Left Section */}
      <div className="w-1/3 bg-neutral-200 dark:bg-neutral-950 border-r border-neutral-300 dark:border-neutral-800 overflow-auto">
      <div className="sticky rounded-none top-0 bg-neutral-100 dark:bg-neutral-950 shadow-md z-10">
    <input
      type="text"
      placeholder="Search students or alumni..."
      className="w-11/12 p-2 border rounded-lg bg-neutral-100 dark:bg-neutral-900 focus:outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search input state
    />
  </div>
        <div className="grid grid-cols-1 gap-4 mt-4">
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
      <div className="width: 40%  border-l border-r bg-neutral-200 dark:bg-neutral-950 border-neutral-300 dark:border-neutral-100 overflow-auto">
        <div className="sticky  bg-neutral-100 dark:bg-neutral-950 flex items-center shadow-md z-10">
          <img
            src="/api/placeholder/40/40"
            alt="User"
            className="w-12 h-12 rounded-full mr-3"
          />
          <button
            onClick={() => setIsPostingModalOpen(true)}
            className="flex-grow p-2 text-left dark:bg-neutral-950 dark:text-neutral-200 rounded-lg"
          >
            What's on your mind?
          </button>
          <button
            onClick={() => setIsPostingModalOpen(true)}
            className="ml-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors transform hover:scale-125 duration-300"
          >
            <Pencil size={20} />
          </button>
        </div>
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="mb-4 p-4 bg-neutral-100 dark:bg-neutral-950 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
            onClick={() => openPostModal(index)}
          >
            <div className="flex items-center mb-3">
              <img
                src={`/api/placeholder/40/40`}
                alt="User"
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">User Name</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-3">This is a sample post content. Click to view more and see comments.</p>
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                <Heart size={20} className="mr-1" /> Like
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Right Section */}
      <div className="w-1/3 p-4 bg-neutral-200 dark:bg-neutral-950 overflow-auto">
        <div className="sticky top-0 bg-neutral-100 dark:bg-neutral-950 p-4 z-10 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer">
          <button className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Create Event
          </button>
        </div>
        <div className="mt-4 bg-neutral-100 dark:bg-neutral-950 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer">
          <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Upcoming Events</h2>
          <p className="text-gray-500 dark:text-gray-400">No events scheduled</p>
        </div>
        {/* <div className="mt-4 bg-neutral-100 dark:bg-neutral-950 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer">
          <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Notifications</h2>
          <p className="text-gray-500 dark:text-gray-400">No new notifications</p>
        </div> */}
      </div>

      {/* Posting Modal */}
      {isPostingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-lg">
            <textarea
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-200"
              placeholder="What's on your mind?"
              rows={4}
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsPostingModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg dark:bg-gray-600 dark:text-gray-200"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expanded Post Modal */}
      {expandedPost !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Post Details</h2>
              <button onClick={closePostModal} className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100">
                <X size={24} />
              </button>
            </div>
            <div className="flex items-center mb-4">
              <img
                src={`/api/placeholder/40/40`}
                alt="User"
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">User Name</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">This is the full content of the post. It can be much longer and more detailed than what was shown in the preview.</p>
            <div className="mb-4 flex items-center">
              <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                <Heart size={20} className="mr-1" /> Like
              </button>
            </div>
            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Comments</h3>
              <div className="space-y-4">
                {[...Array(5)].map((_, commentIndex) => (
                  <div key={commentIndex} className="flex items-start">
                    <img
                      src={`/api/placeholder/40/40`}
                      alt="Commenter"
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">Commenter Name</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">This is a sample comment.</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <textarea
                  value={newComment}
                  onChange={handleCommentChange}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-200"
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
        </div>
      )}
    </div>
  );
};

export default HomePage;
