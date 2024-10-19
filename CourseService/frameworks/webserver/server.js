export default function serverConfig(app, mongoose, config) {
  // Connect to MongoDB
  console.log("Connecting to MongoDB at URI:", config.uri);
  
  mongoose
    .connect(config.uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

  // Function to start the server
  function startServer() {
    app.listen(config.port, () => {
      console.log(`UserAuth Server started at port ${config.port}`);
    });
  }

  return {
    startServer,
  };
}
