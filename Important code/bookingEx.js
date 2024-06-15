//Booking
router.post('/book', async (req, res) => {
    try {
        const formData = {
            ...req.body,
            terms: req.body.terms === 'on', // Convert terms to a Boolean
            batch: req.body.batch, // Ensure batch value is correctly passed
        };
  
        const booking = new Booking(formData);
        await booking.save();
        res.render('confirmation'); // Redirect to a confirmation page upon successful booking
    } catch (error) {
        res.status(400).send('Error: ' + error.message);
    }
  });