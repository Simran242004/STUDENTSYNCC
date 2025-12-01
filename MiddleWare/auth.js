export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // FIX: support all possible token formats
    req.user = { id: payload.id || payload._id || payload.userId };

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
