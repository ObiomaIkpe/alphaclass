Query middleware allows us to run a function before or after a certain query is executed.



//assume we have a very small VIP group of customers. Only these people can have access to some special cars; create a secret 'cars' field and then query only for cars that secret is set to false.

carBookingSchema.pre('find', function(next) {
    this.find({scretCar: {$ne: true}})
    next();
})