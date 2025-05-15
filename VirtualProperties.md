virtual properties are fields that are only computed at run time. they are not persisted to the database. they are only computed at runtime.

eg. a virtual property that converts weeks to days
- syntax
carBookingSchema.virtual('durationDays').get( function () {
    return this.duration / 7 
})