import courseRoute from './course.js'   

export default function routes(app,express){
    app.use("/course", courseRoute(express));
}