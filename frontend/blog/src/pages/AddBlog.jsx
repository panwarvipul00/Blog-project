import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      await axios.post(
        "http://localhost:5000/api/blogs",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      alert("Blog added successfully! Redirecting to All Blogs...");
      setTitle("");
      setContent("");
      
      // Navigate to the home page (where blogs are displayed)
      navigate("/"); 

    } catch (err) {
      alert("Failed to add blog. Please check your credentials and server connection.");
      console.error(err);
    } finally {
      setLoading(false); // End loading
    }
  };

  // --- Login Check UI ---
  if (!token) {
    // Enhanced login prompt styling
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center p-8 bg-white shadow-xl rounded-lg border-l-4 border-red-500">
          <h3 className="text-2xl font-bold text-red-600 mb-3">Access Denied 🛑</h3>
          <p className="text-gray-700 text-lg">
            Please <span className="font-semibold text-blue-500">log in</span> to start writing a new blog.
          </p>
        </div>
      </div>
    );
  }

  // --- Add Blog Form UI ---
  return (
    <div className="max-w-xl mx-auto p-4 md:p-6 mt-10">
      
      {/* Blog Card Container */}
      <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-100 transform hover:shadow-3xl transition duration-500 ease-in-out">
        
        {/* Title with Gradient */}
        <h2 className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
          ✍️ Publish New Post
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              id="title"
              type="text"
              placeholder="A compelling title for your blog..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              // Enhanced Input Styling
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-4 py-3 rounded-lg transition duration-200 outline-none"
              required
            />
          </div>
          
          {/* Content Textarea */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              id="content"
              placeholder="Write your amazing blog content here..."
              rows="8" // Increased height
              value={content}
              onChange={(e) => setContent(e.target.value)}
              // Enhanced Textarea Styling
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-4 py-3 rounded-lg transition duration-200 outline-none resize-none"
              required
            />
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading} // Disable button when loading
            // Gradient Button Style with Loading State
            className={`w-full text-white px-4 py-3 rounded-full font-semibold shadow-md transition duration-300 transform ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 hover:shadow-lg hover:-translate-y-0.5'
            }`}
          >
            {loading ? 'Submitting...' : '🚀 Add Blog Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;