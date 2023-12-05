const acl = require("../ACL.json");

// Get resource and action from the route
const getResourceAndAction = (req) => {
  const parts = req.route.path.split("/");
  // Get the resource from the first part of the route
  const resource = parts[1] || "";
  const action = getActionFromMethod(req.method);
  return { resource, action };
};

// Function to map HTTP methods to CRUD actions
const getActionFromMethod = (method) => {
  switch (method) {
    case "GET":
      return "READ";
    case "POST":
      return "CREATE";
    case "PUT":
      return "UPDATE";
    case "DELETE":
      return "DELETE";
    default:
      return "";
  }
};

const authorize = () => {
  return (req, res, next) => {
    const userRole = req.user ? req.user.role : null;
    const { resource, action } = getResourceAndAction(req);

    const rolePermission = acl.find((entry) => entry.role === userRole);

    if (!rolePermission) {
      return res
        .status(403)
        .send("Access Denied. You do not have the required role.");
    }

    const hasPermission = rolePermission.permissions.some(
      (permission) =>
        permission.resource === resource && permission.actions.includes(action)
    );

    if (!hasPermission) {
      return res
        .status(403)
        .send("Access Denied. You do not have the required permission.");
    }

    // If the user is trying to access an Admin route, make sure they are an Admin
    if (req.originalUrl.startsWith("/admin") && userRole !== "Admin") {
      return res
        .status(403)
        .send("Access Denied. You do not have the required role.");
    }

    // If the user is trying to access an Instructor route, make sure they are an Instructor
    if (
      req.originalUrl.startsWith("/instructor") &&
      userRole !== "Instructor"
    ) {
      return res
        .status(403)
        .send("Access Denied. You do not have the required role.");
    }

    // If the user is trying to access an Student route, make sure they are an Student
    if (req.originalUrl.startsWith("/student") && userRole !== "Student") {
      return res
        .status(403)
        .send("Access Denied. You do not have the required role.");
    }

    next();
  };
};

module.exports = authorize;
