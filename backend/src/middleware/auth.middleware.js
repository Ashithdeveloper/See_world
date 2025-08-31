export const productAuth = (req, res, next) => {
  try {
    if (!req.auth || !req.auth().isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  } catch (error) {
    next(error); 
  }
};
