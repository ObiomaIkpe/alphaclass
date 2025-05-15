Document middleware is middleware that runs on the currently processed document

this runs before the .save() command and the .create() command.

carBookingSchema.pre('save', function() {
    //console.log(this)
    next()
})


carBookingSchema.post('save', function(next, doc) {
    console.log(doc);
    next();
})