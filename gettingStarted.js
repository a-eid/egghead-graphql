const  { graphql , buildSchema } = require('graphql') 
const app = require('express')() 
const graphqlHTTP = require('express-graphql') 

// this is a description of the graphql server . 
const schema = buildSchema(`
  type Video{
    id: ID 
    title: String 
    watched: Boolean 
    duration: Int
  }

  type Query{
    video: Video
    videos: [Video]
  }

  type schema{
    query: Query 
  } 

`)

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

// how&what to reutrn via resolvers . 
const resolvers = {
  video: () => ({
    id: 1 , 
    title: "Logan", 
    watched: true , 
    duration: 150 
  }), 
  videos: () => videos 
}

/*
// query is not needed since we will be issuing queries form graphiql 
const query = `
query myFirstQuery{
  video{
    id 
    title
  }
  videos{
    id
    title
    watched 
    duration
  }
}
`
graphql(schema , query , resolvers)
  .then( r => console.log(JSON.stringify(r , null , 2)) )
  .catch(e => console.log( e ))
*/

app.use('/graphql' , graphqlHTTP({
  schema: schema , 
  graphiql: true , 
  rootValue: resolvers 
}))

const PORT = 3333 
app.listen(PORT , () => console.log(`app is listening on port ${PORT}`))
