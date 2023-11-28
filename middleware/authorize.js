exports.isStudent = (req, res, next) => {
  if (req.user && req.user.role === "Student") {
    return next();
  }
  res.status(403).send("Access Denied. You are not a student.");
};

exports.isInstructor = (req, res, next) => {
  if (req.user && req.user.role === "Instructor") {
    return next();
  }
  res.status(403).send("Access Denied. You are not an instructor.");
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    return next();
  }
  res.status(403).send("Access Denied. You are not an admin.");
};
