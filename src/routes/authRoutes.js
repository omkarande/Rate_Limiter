// const express = require("express");
// const router = express.Router();
// const jwt = require("jsonwebtoken");

// // simulate login
// router.get("/login/:role", (req, res) => {
//   const role = req.params.role; // free / premium

//   const token = jwt.sign(
//     {
//       id: "123",
//       role: role, // In real system the id and role are sent with token
//     },
//     process.env.JWT_SECRET,
//   );

//   res.json({ token });
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/login/:role/:id", (req, res) => {
  const { role, id } = req.params;

  const token = jwt.sign(
    {
      id: id,
      role: role,
    },
    process.env.JWT_SECRET,
  );

  res.json({ token });
});

module.exports = router;
