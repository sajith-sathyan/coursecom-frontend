const fs = require("fs");

const mockUser = {
  userId: "a8b20173-bdc2-4704-930a-69038d9fe806",
  category: [
    "064ef423-4850-4915-83f6-156d8805cb7b",
    "357d0ecd-e763-458f-bb58-a567edd61ba9",
  ],
};

const filterViewerPersonnalization = (category) => {
    return new Promise((resolve, reject) => {
      fs.readFile("./data/viewerPersonnalization.json", "utf-8", (err, data) => {
        if (err) {
          reject(err); 
        } else {
          try {
            let allViewerPersonnalization = JSON.parse(data);
            console.log("allViewerPersonnalization--->",allViewerPersonnalization)
            let filteredData = allViewerPersonnalization.filter(
              (viewerPersonnalization) => {
                // Check if the category of the viewerPersonnalization matches any category in mockUser
                if (category.includes(viewerPersonnalization.category)) {
                  return true; // Return true to include this item in filteredData
                }
                return false; // Otherwise, exclude this item
              }
            );
            resolve(filteredData);
          } catch (error) {
            reject(error); // Reject with the parsing error
          }
        }
      });
    });
  };

const init = async () => {
    try {
        const filteredData = await filterViewerPersonnalization(mockUser.category);
        console.log(filteredData);
    } catch (error) {
        console.error("Error:", error);
    }
};

init();
