var {
  buildSchema , 
  graphql 
} = require('graphql') 
var graphqlHTTP = require('express-graphql')
var app = require('express')() 
var port = 3333 

var schema = buildSchema(`
type Video {
  id: ID , 
  name: String,
  duration: Int ,
  released: Boolean
}

type Query{
  video: Video 
  x : String 
}

type schema{
  query: Query 
}
`)

const resolvers = {
  video: () => new Promise( (resolve , reject)  => resolve({
    id: 1 , 
    name: "logan" , 
    duration: 240 , 
    released: true 
  })) ,
  x : "y"
}

app.use('/graphql' , graphqlHTTP({
  schema: schema, 
  graphiql: true ,
  rootValue: resolvers 
}))

app.listen(port , () => console.log(`app is listening on port ${port}`))
