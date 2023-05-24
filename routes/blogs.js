var express = require("express");
var router = express.Router();
const { v4: uuid } = require("uuid");

router.get("/", (req, res) => {
  res.json({ message: "hello from blog" });
});
//get all items
router.get("/all-blogs", (req, res) => {
  res.status(200).json({ data: blogs });
});
//get single item by id
router.get("/blog/:id", (req, res) => {
  const blog = blogs.find((b) => b.id === req.params.id);
  if (!blog)
    return res.status(404).send("The blog with the given ID was not found.");
  res.json(blog);
});

const blogs = [
  {
    id: "blog1",
    title: "Introduction to JavaScript",
    description: "Learn the basics of JavaScript programming language.",
    author: "Michael Johnson",
    createdAt: "2023-05-22T19:16:00.821Z",
    lastModified: "2023-05-22T19:16:00.821Z",
  },
  {
    id: "blog2",
    title: "Mastering React Framework",
    description: "Become proficient in building web applications using React.",
    author: "Jane Smith",
    createdAt: "2023-05-22T19:16:00.821Z",
    lastModified: "2023-05-22T19:16:00.821Z",
  },
  {
    id: "blog3",
    title: "Deep Dive into Node.js",
    description:
      "Explore the advanced concepts of Node.js and server-side development.",
    author: "Michael Johnson",
    createdAt: "2023-05-22T19:16:00.821Z",
    lastModified: "2023-05-22T19:16:00.821Z",
  },
  {
    id: "blog4",
    title: "CSS Tricks for Web Designers",
    description: "Discover useful CSS techniques to enhance your web designs.",
    author: "Emily Davis",
    createdAt: "2023-05-22T19:16:00.821Z",
    lastModified: "2023-05-22T19:16:00.821Z",
  },
  {
    id: "blog5",
    title: "Effective Database Management",
    description:
      "Learn best practices for managing databases and optimizing performance.",
    author: "Robert Johnson",
    createdAt: "2023-05-22T19:16:00.821Z",
    lastModified: "2023-05-22T19:16:00.821Z",
  },
];
//delete one item by id
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  const index = blogs.findIndex((blog) => blog.id === id);

  if (index !== -1) {
    blogs.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).send("ID not found");
  }
});
//get all blogs by author
router.get("/:author", (req, res) => {
  const authorBlogs = blogs.filter(
    (blog) => blog.author.toLowerCase() === req.params.author.toLowerCase()
  );
  if (authorBlogs.length === 0)
    return res.status(404).send("No blogs found for the given author.");
  res.json(authorBlogs);
});
//create one new blog post
router.post("/single-blog/create", (req, res) => {
  const newBlog = {
    id: uuid(),
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    createdAt: new Date().toISOString,
    lastModified: new Date().toISOString,
  };

  blogs.push(newBlog);

  res.json(newBlog);
});
//update one blog post by id

// router.put("/update/:id", (req, res) => {
//     const blog = blogs.find((blog) => blog.id === req.params.id);
//     if (!blog)
//       return res.status(404).send("The blog with the given ID was not found.");

//     const updatedBlog = {
//       ...blog,
//       ...req.body,
//       lastModified: new Date(),
//     };

//     const index = blogs.indexOf(blog);
//     blogs[index] = updatedBlog;

//     res.json(updatedBlog);
//   });

router.put("/:updateID", (req, res) => {
  const { title, description, author } = req.body;
  const updateID = req.params.updateID;

  const index = blogs.findIndex((blog) => blog.id === updateID);

  if (index !== -1) {
    blogs[index].title = title !== "" ? title : blogs[index].title;
    blogs[index].description = description !== undefined ? description : blogs[index].description;
    blogs[index].author = author !== undefined ? author : blogs[index].author;

    res.json({ success: true});
  } else {
    res.status(404).send("The blog with the given ID was not found.");
  }
});

module.exports = router;

// get one blog route by id
//get some blogs route by autor
//post one blog route
