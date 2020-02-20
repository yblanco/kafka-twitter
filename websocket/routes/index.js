var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/')
.get((req, res, next) => {
  res.json({ success: true });
})
.post((req, res, next) => {
  const { body } = req;
  const { tweet } = body;
  req.io.sockets.emit('tweets', JSON.parse(tweet));
  res.json({ success: true });
});

module.exports = router;
