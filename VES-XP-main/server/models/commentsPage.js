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

const moodleCommentsPageSchema = new mongoose.Schema({
    // id: { type: String },
    // items: [commentsSchema]

    comments: {type: Object}
});

const MoodleDataCommentsPage = mongoose.model('commentsPage', moodleCommentsPageSchema);

module.exports = MoodleDataCommentsPage;
