import axios from "axios"
import { Post } from "../types/types";

// const API_URL = "http://localhost:5000/api/posts";
const API_URL = "https://postsblogbackend-production.up.railway.app/api/posts";

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchPostById = async (id: string): Promise<Post> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createPost = async (postData: { title: string; content: string }, token: string) => {
  const response = await axios.post(API_URL, postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addCommentToPost = async (postId: string, text: string) => {
  const response = await fetch(`https://postsblogbackend-production.up.railway.app/api/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`, 
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Failed to add comment");
  }

  return response.json(); 
};

