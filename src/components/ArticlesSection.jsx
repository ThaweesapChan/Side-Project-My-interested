import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { blogPosts } from "@/data/blogPosts";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlogCard } from "./BlogCard";

export default function ArticleSection() {
  const categories = ["Highlight", "Cat", "Inspiration", "General"];
  const [category, setCategory] = useState("Highlight");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1); // Current page state
  const [hasMore, setHasMore] = useState(true); // To track if there are more posts to load
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); // Set isLoading to true when starting to fetch
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `https://blog-post-project-api.vercel.app/posts?page=${page}&limit=6&category=${category}`
        );
        setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
        setIsLoading(false); // Set isLoading to false after fetching
        if (response.data.currentPage >= response.data.totalPages) {
          setHasMore(false); // No more posts to load
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false); // Set loading to false in case of error
      }
    };

    fetchPosts(); // Call fetchPosts within useEffect
  }, [page, category]);
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment page number to load more posts
  };
  return (
    <>
      <div className="w-full max-w-7xl mx-auto md:px-6 lg:px-8 mb-20"></div>{" "}
      <div className="bg-[#F9F8F6] w-full mx-auto md:px-6 lg:px-[120px] mb-10">
        {" "}
        <h2 className="text-xl font-bold mb-4 px-4 lg:px-0">
          Latest articles
        </h2>{" "}
        <div className="bg-[#EFEEEB] px-4 py-4 md:py-3 md:rounded-sm flex flex-col space-y-4 md:flex-row-reverse md:items-center md:space-y-0 md:justify-between lg:rounded-lg">
          {" "}
          <div className="w-full md:max-w-sm ">
            {" "}
            <div className="relative ">
              {" "}
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 lg:text-[#75716B] text-[#75716B]" />{" "}
              <Input
                type="text"
                placeholder="Search"
                className="py-3 lg:rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground lg:placeholder-[#75716B]"
              />{" "}
            </div>{" "}
          </div>{" "}
          <div className="md:hidden w-full">
            {" "}
            <Select
              value={category}
              onValueChange={(value) => {
                setCategory(value);
                setPosts([]); // Clear posts when category changes
                setPage(1); // Reset page to 1
                setHasMore(true); // Reset "has more" state
              }}
            >
              {" "}
              <SelectTrigger className="w-full py-3 rounded-sm text-muted-foreground">
                {" "}
                <SelectValue placeholder="Select category" />{" "}
              </SelectTrigger>{" "}
              <SelectContent>
                {" "}
                {categories.map((cat) => {
                  return (
                    <SelectItem key={cat} value={cat}>
                      {" "}
                      {cat}{" "}
                    </SelectItem>
                  );
                })}{" "}
              </SelectContent>{" "}
            </Select>{" "}
          </div>{" "}
          <div className="hidden md:flex space-x-2">
            {" "}
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setPosts([]); // Clear posts when category changes
                  setPage(1); // Reset page to 1
                  setHasMore(true); // Reset "has more" state
                }}
                className={`px-4 py-3 transition-colors rounded-sm text-sm text-muted-foreground font-medium ${
                  category === cat ? "bg-[#DAD6D1]" : "hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <article className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0">
        {posts.map((blog) => {
          return (
            <BlogCard
              key={blog.id}
              image={blog.image}
              category={blog.category}
              title={blog.title}
              description={blog.description}
              author={blog.author}
              date={new Date(blog.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            />
          );
        })}
      </article>
      {hasMore && (
        <div className="text-center mt-20">
          <button
            onClick={handleLoadMore}
            className={`font-medium ${
              !isLoading ? "underline hover:text-muted-foreground" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex flex-col items-center min-h-lvh">
                <Loader2 className="w-12 h-12 animate-spin text-foreground" />
                <p className="mt-4">Loading...</p>
              </div>
            ) : (
              "View more"
            )}
          </button>
        </div>
      )}
    </>
  );
}
