const mongoose = require('mongoose');

// const commentsSchema = new mongoose.Schema({
//     id: { type: String },
//     items: [
//         {
//             id: { type: Number },
//             items: [
//                 {
//                     id: { type: Number },
//                     items: { type: Array, default: [] },
//                     name: { type: String },
//                     user: { type: String }
//                 }
//             ],
//             name: { type: String },
//             user: { type: String }
//         }
//     ],
// });

const moodleCommentsSchema = new mongoose.Schema({
    idProject: { type: String },
    releaseId: { type: String },
    // items: [commentsSchema]

    comments: {type: Array}
});

const MoodleDataFeedbackRel = mongoose.model('feedbackRel', moodleCommentsSchema);

module.exports = MoodleDataFeedbackRel;
