const {
  GraphQLInputObjectType, 
  GraphQLNonNull, 
  GraphQLSchema, 
  GraphQLString , 
  GraphQLBoolean , 
  GraphQLObjectType, 
  GraphQLID,
  GraphQLInt, 
  GraphQLList  
} = require('graphql') 
const {
 getVideoById ,
 getAllVideos,
 addVideo
} = require('./data/data')
const graphqlHTTP = require('express-graphql') 
const app = require('express')() 
const port = 3333; 

const VideoType = new GraphQLObjectType({
  name: "VideoType" , 
  description: "whatever",
  fields:{
    id: {
      type: GraphQLID, 
      description: "id"
    } , 
    name: {
      type: GraphQLString,
      description: "name"
    } , 
    released: {
      type: GraphQLBoolean , 
      description: "released"
    } , 
    duration: {
      type: GraphQLInt,
      description: "duration"
    } 
  }
})

const queryType = new GraphQLObjectType({
  name: "QueryType", 
  description: "the root query",
  fields: {
    video: {
      type: VideoType , 
      description: "video", 
      args:{
        id:{
          type: new GraphQLNonNull(GraphQLID) , 
          description: "id of the requested video"
        }
      }, 
      resolve: (_,args) => getVideoById(args.id) 
    },
    videos: {
      type: new GraphQLList(VideoType) ,
      description: "videos",
      resolve: getAllVideos
    }
  }
})

const videoInputType = new GraphQLInputObjectType({
  name: "videoInputType",
  fields:{
    name: {
      type: GraphQLString,
      description: "name"
    } , 
    released: {
      type: GraphQLBoolean , 
      description: "released"
    } , 
    duration: {
      type: GraphQLInt,
      description: "duration"
    } 
  }
})

const mutationType = new GraphQLObjectType({
  name: "MutationType" , 
  description: "the root mutation query " , 
  fields:{
    addNewVideo:{
      description:"to add a new video to the existing list of videos", 
      type: VideoType, // what we gonna query on after we run the mutation . 
      args:{
        video:{
          type: new GraphQLNonNull(videoInputType)
        }
      },
      resolve: (_ , args) => addVideo(args.video)
    }
  }
})

const schema = new GraphQLSchema({
  query: queryType , 
  mutation : mutationType  
})
app.use('/graphql' , graphqlHTTP({
  schema: schema , 
  graphiql: true 
}))
app.listen(port , _=> console.log(`app is litenting on port ${port}`)) 