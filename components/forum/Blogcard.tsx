"use client";
import React from "react";
import Link from "next/link";
import { motion, Variants, useInView } from "framer-motion";
import Avatar from "../Avatar";
import { Heart, Bookmark, MoreHorizontal } from "lucide-react";
import Comments from "./Comments";

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    User: {
      username: string;
    };
  };
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
      duration: 0.4,
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

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-200px 0px 0px 0px" });

  const url: string = "https://random.imagecdn.app/150/150";
  const month_names_short = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(post.createdAt);
  const monthString = month_names_short[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const description = post.description;

  return (
    <motion.div
      ref={ref}
      className="bg-neutral-100 dark:bg-neutral-950 p-4 rounded-lg shadow-lg mb-6"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      variants={cardVariants}
      animate={isInView ? "onscreen" : "hidden"}
    >
      <Link href={`/blog/${post.id}`} className="block">
        <div className="flex items-start mb-4">
          <Avatar name={post.User.username} size={40} />
          <div className="ml-3">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 hover:text-blue-600 cursor-pointer">
              {post.title}
            </h2>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              <span>{post.User.username}</span>
              <span className="ml-2">{`${monthString} ${day}, ${year}`}</span>
            </div>
          </div>
        </div>
        <div className="text-sm text-neutral-700 dark:text-neutral-300 mb-3 line-clamp-3">
          {description}
        </div>
      </Link>
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 text-xs text-neutral-600 dark:text-neutral-400">
          <button className="flex items-center hover:text-neutral-900 dark:hover:text-neutral-100">
            <Heart size={20} className="mr-1" /> Like
          </button>
          <button className="flex items-center hover:text-neutral-900 dark:hover:text-neutral-100">
            <Bookmark size={20} className="mr-1" /> Save
          </button>
        </div>
        <button className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">
          <MoreHorizontal size={20} />
        </button>
      </div>
      <Comments postId={post.id} />
    </motion.div>
  );
};

export default BlogCard;
