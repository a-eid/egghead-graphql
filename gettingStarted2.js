const app = require('express')()
const graphqlHTTP = require('express-graphql') 
const PORT = 3333 
const { getVideoById , getVideos , createVideo } = require('./data')
// defining graphql schema in javascript 
const {
  GraphQLList , 
  GraphQLNonNull, 
  GraphQLBoolean , 
  GraphQLString,
  GraphQLSchema , 
  GraphQLObjectType , 
  GraphQLInt , 
  GraphQLID
} = require('graphql')


const videoType = new GraphQLObjectType({
  name: "movieType" , 
  description: "it is awesome" , 
  fields:{
    id: {
      type: GraphQLID , 
      description: "The id of the movie"
    } , 
    duration:{
      type: GraphQLInt , 
      description: "The duration of the movie in seconds"
    },
    title:{
      type: GraphQLString , 
      description: "the name of the movie according to imdb"
    },
    watched:{
      type: GraphQLBoolean , 
      description: "Wether it was watched or not "
    }
  }
})


const queryType = new GraphQLObjectType({
  name: "QueryType" , 
  description: "the root query" , 
  fields:{
    videos: {
      type: new GraphQLList(videoType) , 
      resolve: getVideos 
    }, 
    video: {
      type: videoType , 
      args: {
        id:{
          type: new GraphQLNonNull(GraphQLID) , 
          description: "id of the desired video"
        }
      }, 
      resolve: (_ , args) => {
        return getVideoById(args.id)
      }  
    }
  }
})

const mutationType = new GraphQLObjectType({
  name: "MutationType" , 
  description: "mutation" , 
  args:{
    id: {
      type: GraphQLID , 
      description: "The id of the movie"
    } , 
    duration:{
      type: GraphQLInt , 
      description: "The duration of the movie in seconds"
    },
    title:{
      type: GraphQLString , 
      description: "the name of the movie according to imdb"
    },
    watched:{
      type: GraphQLBoolean , 
      description: "Wether it was watched or not "
    }
  },
  fields:{
    resolve: (_ , args) => createVideo(args.id , args.duration , args.watched , args.title)
  }
})

const schema = new GraphQLSchema({
  query: queryType , 
  mutation: mutationType  
})

app.use('/graphql' , graphqlHTTP({
  schema: schema , 
  graphiql: true 
}))

app.listen(PORT , 
  () => console.log(`app running on http://localhost:${PORT}`)) 
