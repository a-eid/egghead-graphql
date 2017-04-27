const{VideoType} = require('./again2')
const {
  GraphQLNonNull , 
  GraphQLID , 
  GraphQLInterfaceType 
} = require('graphql') 


const nodeInterface = new GraphQLInterfaceType({
  name: "Node" , 
  fields:{
    id:{
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolveType: (obj) => {
    if(obj.title) return VideoType
    return null 
  }
})


module.exports = nodeInterface 