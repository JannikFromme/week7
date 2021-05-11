// Goal: Provide a function to return all posts and their comments from Firebase.
// Example output:
// [
//   { 
//     id: `random-post-id-1`, 
//     imageUrl: `https://unsplash.com/...`, 
//     numberOfLikes: 99, 
//     comments: [
//       { 
//          id: `random-comment-id-1`,
//          body: `Looks yummy!` 
//       }
//     ]
//   },
//   ...
// ]

// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/posts
exports.handler = async function(event) {
  // define an empty Array to hold the return value from our lambda
  let returnValue = []

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // perform a query against firestore for all posts, wait for it to return, store in memory
  let postsQuery = await db.collection(`posts`).get()

  // retrieve the documents from the query
  let posts = postsQuery.docs

  // loop through the post documents
  for (let postIndex=0; postIndex < posts.length; postIndex++) {
    // get the id from the document
    let postId = posts[postIndex].id

    // get the data from the document
    let postData = posts[postIndex].data()

    // create an Object to be added to the return value of our lambda
    let postObject = {
      id: postId,
      imageUrl: postData.imageUrl,
      numberOfLikes: postData.numberOfLikes,
      comments: []
    }

    // get the comments for this post, wait for it to return, store in memory
    let commentsQuery = await db.collection(`comments`).where(`postId`, `==`, postId).get()

    // get the documents from the query
    let comments = commentsQuery.docs

    // loop through the comment documents
    for (let commentIndex=0; commentIndex < comments.length; commentIndex++) {
      // get the id from the comment document
      let commentId = comments[commentIndex].id

      // get the data from the comment document
      let commentData = comments[commentIndex].data()

      // create an Object to be added to the comments Array of the post
      let commentObject = {
        id: commentId,
        body: commentData.body
      }

      // add the Object to the post
      postObject.comments.push(commentObject)
    }

    // add the Object to the return value
    returnValue.push(postObject)
  }

  // return value of our lambda
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}