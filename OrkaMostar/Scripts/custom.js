$('#contactForm').validate({
    rules: {
        FirstName: {
            required: true
        },
        LastName: {
            required: true
        },
        EmailAddress: {
            required: true,
            email: true
        },
        PhoneNumber: {
            required: true
        },
    }
});