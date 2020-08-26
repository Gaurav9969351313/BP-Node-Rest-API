const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please Add Course title']
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Please Add Course description']
    },
    weeks: {
        type: String,
        required: [true, 'Please Add number of weeks']
    },
    tuition: {
        type: Number,
        required: [true, 'Please Add tuition fees']
    },
    minimumSkill: {
        type: String,
        required: [true, 'Please add a minimum skill'],
        enum: ['beginner', 'intermediate', 'advanced']
    },
    scholarshipAvailable: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },

    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
    }

});

// Static methid to get the avg cost 
CourseSchema.statics.getAverageCost = async function (bootcampId) {
    console.log("Calculating aggregate...");

    const obj = await this.aggregate([
        { $match: { bootcamp: bootcampId } },
        { $group: { _id: '$bootcamp', avgCost: { $avg: '$tuition' } } },
    ]);

    console.log(obj);
    
    try {
        await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
            avgCost: Math.ceil(obj[0].avgCost / 10) * 10
        })
    } catch (error) {
        console.log(error);
    }
}



// Call GetAvgCost After Save
CourseSchema.post('save', function () {
    this.constructor.getAverageCost(this.bootcamp);
})

// Call GetAvgCost Before Remove 
CourseSchema.pre('remove', function () {
    this.constructor.getAverageCost(this.bootcamp);
})

module.exports = mongoose.model('Course', CourseSchema);