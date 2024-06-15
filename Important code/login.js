router.post('/login', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await SignUp.findOne({ email });
      if (user && await user.comparePassword(password)) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/');
      } else {
        res.redirect('/login');
      }
    } catch (error) {
      next(error);
    }
  });