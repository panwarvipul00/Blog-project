import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Define a list of dark accent colors for the blog cards
  const cardColors = [
    "bg-gray-800",
    "bg-slate-800",
    "bg-neutral-800",
    "bg-zinc-800",
  ];

  // Function to get the color class based on the index
  const getCardColor = (index) => {
    return cardColors[index % cardColors.length];
  };

  // --- Fetch Blogs Function ---
  const fetchBlogs = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/api/blogs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(res.data);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);


  // --- New: Delete Blog Handler ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return; // Stop if user cancels
    }

    try {
      // Send DELETE request to the server
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Optimistically update the UI: remove the deleted blog from the state
      setBlogs(blogs.filter(blog => blog._id !== id));
      alert("Blog deleted successfully!");

    } catch (err) {
      alert("Failed to delete blog. Check if you are the author.");
      console.error("Delete failed:", err);
    }
  };
  // ---------------------------------


  // --- UI: Login Check & Loading States (Unchanged) ---
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center p-6">
        <div className="text-center p-8 bg-gray-800 rounded-xl shadow-2xl border-l-4 border-red-500">
          <h3 className="text-2xl font-bold text-red-400 mb-3">Access Required 🔒</h3>
          <p className="text-gray-300 text-lg">
            Please <span className="font-semibold text-blue-400">log in</span> to view the community blogs.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <p className="text-xl text-teal-400 animate-pulse">Loading Blogs...</p>
      </div>
    );
  }

  // --- UI: Blog List ---
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10">
      
      <h2 className="text-4xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
        Community Posts 📚
      </h2>
      
      <div className="max-w-4xl mx-auto space-y-6">
        {Array.isArray(blogs) && blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <div
              key={blog._id}
              className={`p-6 rounded-xl shadow-2xl transition duration-300 transform hover:scale-[1.01] border-t-2 border-teal-500 ${getCardColor(index)}`}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold mb-2 text-teal-300">
                  {blog.title}
                </h3>
                
                {/* Delete Button */}
                {/* NOTE: You should ideally verify req.user.id === blog.author._id here to hide the button from non-authors */}
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-full font-semibold transition duration-200 shadow-md transform hover:scale-105"
                >
                  🗑️ Delete
                </button>
              </div>

              <p className="text-gray-300 mt-3 whitespace-pre-wrap">
                {blog.content}
              </p>
              
              <div className="text-sm text-gray-400 mt-4 pt-3 border-t border-gray-700">
                 Posted by: {blog.author?.name || 'Anonymous'}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xl text-gray-500 mt-12">
            No blogs found. Be the first to add one!
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;