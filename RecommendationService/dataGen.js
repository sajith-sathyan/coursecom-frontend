const uuid = require("uuid");
const fs = require("fs");

const users = [];

function generateUsers() {
  for (let i = 0; i < 20; i++) {
    users.push({
      id: uuid.v4(),
      name: `user ${i}`,
    });
  }

  fs.writeFileSync("data/users.json", JSON.stringify(users));
}

generateUsers();

const category = [];

function generateCategory() {
  for (let i = 0; i < 20; i++) {
    category.push({
      id: uuid.v4(),
      name: `category ${i}`,
    });
  }

  fs.writeFileSync("data/category.json", JSON.stringify(category));
}

generateCategory();

const channel = [];

function generateChannel() {
  for (let i = 0; i < 20; i++) {
    channel.push({
      id: uuid.v4(),
      name: `channel ${i}`,
      category: category[(Math.random() * category.length) | 0].id,
    });
  }

  fs.writeFileSync("data/channel.json", JSON.stringify(channel));
}

generateChannel();

const video = [];

function generateVideo() {
  for (let i = 0; i < 20; i++) {
    video.push({
      id: uuid.v4(),
      tile: `video ${i}`,
      category: category[(Math.random() * category.length) | 0].id,
      duration: `${(Math.random() * 1000) | 0}`,
      channel: channel[(Math.random() * channel.length) | 0].id,
    });
  }

  fs.writeFileSync("data/video.json", JSON.stringify(video));
}

generateVideo();

let videoPersonalization = [];
function generateVideoPersonalization() {
    const videoPersonalization = [];
  
    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < 20; j++) {
        let current_video = video[Math.floor(Math.random() * video.length)];
        let watchLength = Math.floor(Math.random() * Number(current_video.duration));
        videoPersonalization.push({
          id: uuid.v4(),
          userId: users[i].id,
          videoId: current_video.id,
          timestamp: Date.now() - Math.floor(Math.random() * 86400000), // Random timestamp within the last 24 hours
          watchLength,
          watchPercentage: (watchLength / Number(current_video.duration)) * 100,
          ignored: Math.random() > 0.5,
          liked: Math.random() > 0.5,
          disliked: Math.random() > 0.5,
          shared: Math.random() > 0.5,
          subscribed: Math.random() > 0.5,
          skipped: Math.random() > 0.5
        });
      }
    }
  
    fs.writeFileSync('data/viewerPersonnalization.json', JSON.stringify(videoPersonalization));
  }
  
  generateVideoPersonalization()
