    import mongoose from "mongoose";

    const Schema = mongoose.Schema;
    const CourseSchema = new Schema({
        title: {
            type: Schema.Types.Mixed
        },
        price: {
            type: String
        },
    
        category: {
            type: String
        },
        description: {
            type: String
        },
        thumbnailUrl:{
            type:String
        },
        videos:{
            type:Array
        },
        userId: {
            type: String, 
            required: true
        }, 
        createdAt:{
            type:String
        },
        status:{
            type:Boolean,
            default:true
        }
    
    });

    CourseSchema.index({ role: 1 });

    const CourseModel = mongoose.model('Course', CourseSchema);

    CourseModel.createIndexes()
    .then(() => console.log('Indexes created successfully'))
    .catch((err) => console.error('Error creating indexes:', err));

    export default CourseModel;
