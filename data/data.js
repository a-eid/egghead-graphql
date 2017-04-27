// dataBase simulation 
const videoA={
  id: "a" , 
  name: "videoA" , 
  released: false , 
  duration: 300
}
const videoB={
  id: "b" , 
  name: "videoB" , 
  released: true  , 
  duration: 240
}
const videoC={
  id: "c" , 
  name: "videoC" , 
  released: false , 
  duration: 350
}
const videoD={
  id: "d" , 
  name: "videoD" , 
  released: true , 
  duration: 150
}

const videos = [ videoA , videoB , videoC , videoD ]

// query 
const getVideoById = (id) => new Promise( resolve => {
  const [video] = videos.filter( v => v.id === id)
  resolve(video)
})
const getAllVideos = () => new Promise( resolve => resolve(videos)) 

// mutation 

const addVideo = (args) => {
  const video = {
    id: new Buffer(args.name).toString('base64'),  
    name: args.name , 
    released: args.released , 
    duration: args.duration  
  }
  videos.push(video) 
  return video 
}


// exporting 
exports.getVideoById = getVideoById
exports.getAllVideos = getAllVideos
exports.addVideo = addVideo



