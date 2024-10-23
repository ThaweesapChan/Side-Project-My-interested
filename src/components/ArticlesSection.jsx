import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { blogPosts } from "@/data/blogPosts";
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
  return (
    <>
      {" "}
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
            <Select value="Highlight">
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
            <button className="px-4 py-3 transition-colors rounded-sm text-sm text-muted-foreground font-medium bg-[#DAD6D1] lg:text-[#43403B]">
              {" "}
              Highlight{" "}
            </button>{" "}
            {categories.slice(1).map((cat) => {
              return (
                <button
                  key={cat}
                  className="px-4 py-3 transition-colors rounded-sm text-sm text-muted-foreground font-medium hover:bg-muted              "
                >
                  {" "}
                  {cat}{" "}
                </button>
              );
            })}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <article className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0">
        {" "}
        {blogPosts.map((blog, id) => {
          return (
            <BlogCard
              key={id}
              image={blog.image}
              category={blog.category}
              title={blog.title}
              description={blog.description}
              author={blog.author}
              date={blog.date}
            />
          );
        })}{" "}
      </article>{" "}
    </>
  );
}
