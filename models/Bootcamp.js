const mongoose = require('mongoose');
const slugify = require('slugify');

const BootcampSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 in length']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add description'],
        unique: true,
        trim: true,
        maxlength: [200, 'Description cannot be more than 200 in length']
    },
    website: {
        type: String,
        match: [/^(http[s]?:\/\/(www\.)?|ftp:\/\/(www\.)?|www\.){1}([0-9A-Za-z-\.@:%_\+~#=]+)+((\.[a-zA-Z]{2,3})+)(\/(.)*)?(\?(.)*)?/g, 
                'Please Use Valid URL']
    },
    email:{
        type: String,
        match:  [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please Use Valid E-mail']
    },
    address: {
        type: String,
        required: [true, 'Please add address']
    }, 
    careers: {
        type: [String],
        required: true,
        enum: [
            'Web Developement',
            'UI and UX',
            'Data Science',
            'Other'
        ]
    },
    avgRating: {
        type: Number,
        min: [1, 'Rating Must Be atleast 1'],
        max: [10, 'Rating must be not greater than 10']
    },
    createdAt: {
        type: Date,
        default: Date.now   
    }
}, {
    toJSON: {virtuals: true},
    toObject: { virtuals: true }
});

// Create Bootcamp Slug from the name 
BootcampSchema.pre('save', function() {
    this.slug = slugify(this.name, { lower: true });
});

// Cascade delete courses when bootcamp is deleted
BootcampSchema.pre('remove', async function (next){
    console.log("Courses being removed from bootcamp");
    await this.model('Course').deleteMany({ bootcamp: this._id });
    next()
});

// Reverse Populate with virtuals
BootcampSchema.virtual('courses',{
    ref: 'Course',
    localField: '_id',
    foreignField: 'bootcamp',
    justOne: false
})

module.exports = mongoose.model('Bootcamp', BootcampSchema);