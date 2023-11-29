const User = require("../models/User");

const Profile = (req, res) => {
  if (req.isAuthenticated()) {
    res.setHeader("Cache-Control", "no-store, private, must-revalidate");
    res.render("home", {
      user: req.user,
      body: "profile",
    });
  } else {
    res.render("home", {
      body: "login",
    });
  }
};

const Dashboard = (req, res) => {
  let dashboardRoute;
  switch (req.user.role) {
    case "Student":
      dashboardRoute = "/student-dashboard";
      break;
    case "Instructor":
      dashboardRoute = "/instructor-dashboard";
      break;
    case "Admin":
      dashboardRoute = "/admin-dashboard";
      break;
  }

  res.render("home", {
    body: "dashboard",
    user: req.user,
    dashboardRoute: dashboardRoute,
  });
};

const Student = (req, res) => {
  res.render("home", { body: "student", user: req.user });
};

const Instructor = (req, res) => {
  res.render("home", { body: "instructor", user: req.user });
};

const Admin = (req, res) => {
  res.render("home", { body: "admin", user: req.user });
};

// const getUsers = async (req, res) => {
//   try {
//     // Fetch all users
//     const users = await User.find();

//     res.render("home", { body: "usersList", users, messages: [] });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };



module.exports = {
  Profile,
  Student,
  Instructor,
  Dashboard,
  Admin,
};
