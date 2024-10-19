export default {
    port:process.env.PORT || 9080,
    

  
      uri:process.env.MONGO_URI || "mongodb://localhost:27017/coursecom_courseService",

    jwtSecret: process.env.JWT_SECRET || 'jkl!±@£!@ghj1237'
}