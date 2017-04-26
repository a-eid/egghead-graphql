const vidA = {
  id: "a", 
  title: "Super man", 
  watched: false , 
  duration: 120  
}

const vidB = {
  id: "b", 
  title: "spider man 1 ", 
  watched: true , 
  duration: 125 
}
const vidC = {
  id: "c", 
  title: "Crash", 
  watched: true , 
  duration: 200 
}

const videos = [vidA , vidB , vidC]

// awesome filtering 
const getVideoById = (id) => {
  return new Promise((resolve) => {
    const [video] = videos.filter((video) => {
      return video.id === id
    })
    resolve(video)
  })
}

const getVideos = () => new Promise( resolve => resolve(videos) )

const createVideo = (id , duration , watched , title) => {
  videos.push({
    id , 
    title ,
    watched , 
    duration 
  })
}
exports.getVideos = getVideos 
exports.getVideoById = getVideoById 
exports.createVideo = createVideo 