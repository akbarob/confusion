import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

import { auth, db, provider } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import {getAuth, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider,signInWithPopup, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { async } from "@firebase/util";

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});



//POST  to server 
export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  const newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment
  }
    newComment.date = new Date().toISOString()

  return fetch(baseUrl + 'comments', {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "content-Type": "application/json"
    },
    credentials:"same-origin"
  })
  .then(response =>{
    if(response.ok){
      return response
    }
    else {
      var error = new Error('Error ' + response.status + ':' + response.statusText)
      error.response = response
      throw error
    }
  },
  error => {
    var errmess = new Error(error.message)
    throw errmess
  })
  .then(response => response.json())
  .then(response => dispatch(addComment(response)))
  .catch(error => {console.log("post comments", error.message,
    alert(" YOUR comment could not be posted\nError"))})

}


export const fetchDishes = () => async (dispatch) => {

    dispatch(dishesLoading(true));
    try{
      const querySnapshot = await getDocs(collection(db, "dishes"))
      let dishes = []
      querySnapshot.forEach(doc =>{
        const data = doc.data();
        const _id = doc.id;
        dishes.push({ _id, ...data });
      }) 
      return dispatch(addDishes(dishes))
    }
    catch (error) {
      return dispatch(dishesFailed(error.message));
    }
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});
//COMMENTS
export const fetchComments = () => (dispatch) => {

  return fetch(baseUrl + 'comments')
  .then(response =>{
    if(response.ok){
      return response
    }
    else {
      var error = new Error('Error ' + response.status + ':' + response.statusText)
      error.response = response
      throw error
    }
  },
  error => {
    var errmess = new Error(error.message)
    throw errmess
  })
  .then(response => response.json())
  .then(comments => dispatch(addComments(comments)))
  .catch(error => dispatch(commentsFailed(error.message)))


}
export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});
export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});



//PROMOS
export const fetchPromos = () => async (dispatch) => {
    
  dispatch(promosLoading());
  try{
    const querySnapshot = await getDocs(collection(db, "promotions"))
    let promos =[]
    querySnapshot.forEach(doc =>{
      const data = doc.data()
      const _id = doc.id
      promos.push({_id, ...data });
    })
    return dispatch(addPromos(promos))
  }
  catch (error) {
    return dispatch(dishesFailed(error.message));
  }
}

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});

//LEADERS
export const fetchLeaders = () => async (dispatch) => {
  dispatch(leadersLoading())
  try{
    const querySnapshot = await getDocs(collection(db, "leaders"))
    let promos =[]
    querySnapshot.forEach(doc =>{
      const data = doc.data()
      const _id = doc.id
      promos.push({_id, ...data });
    })
    return dispatch(addLeaders(promos))
  }
  catch (error) {
    return dispatch(leadersFailed(error.message));
  }
}

export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
})

export const leadersLoading =() => ({
  type: ActionTypes.LEADERS_LOADING,

})

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
})


//post feedback

export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) => {
  const newFeedback ={
    firstname,
    lastname,
    telnum,
    email,
    agree,
    contactType,
    message
  }
  newFeedback.date = new Date().toISOString()
  return fetch(baseUrl + 'feedback', {
    method: "POST",
    body: JSON.stringify(newFeedback),
    headers: {
      "content-Type": "application/json"
    },
    credentials:"same-origin"
  })
  .then(response =>{
    if(response.ok){
      return response
    }
    else {
      var error = new Error('Error ' + response.status + ':' + response.statusText)
      error.response = response
      throw error
    }
  },
  error => {
    var errmess = new Error(error.message)
    throw errmess
  })
  .then(response => response.json())
  .catch(error => {console.log("post feedback", error.message,
    alert(" YOUR feedback could not be posted\nError"))})

}
//Delete Comment
export const deleteComment = (id) => (dispatch) => {
  console.log(id)
  return fetch(baseUrl + "comments/" + id, {
    method: "DELETE",
  })
  .then(response =>{
    if(response.ok){ alert("Comment Deleted Successfuly")
      return response
    }
    else {
      var error = new Error('Error ' + response.status + ':' + response.statusText)
      error.response = response
      throw error
    }
  },
  error => {
    var errmess = new Error(error.message)
    throw errmess
  })
  .then(response => response.json())
  .then(id=> dispatch(
    {type: ActionTypes.DELETE_COMMENT,
    payload: deleteComment(id)}
  ))
  .then(() => {
    window.location.reload()})
  .catch(error => {console.log("delete comments", error.message,
    alert(" YOUR comment could not be Deleted \nError"))})

}
//Login
export const requestLogin = () => {
  return {
      type: ActionTypes.LOGIN_REQUEST
  }
}

export const receiveLogin = (user) => {
  return {
      type: ActionTypes.LOGIN_SUCCESS,
      user
  }
}

export const loginError = (message) => {
  return {
      type: ActionTypes.LOGIN_FAILURE,
      message
  }
}




export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST
  }
}

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS
  }
}

export const googleLogin = () => (dispatch) => {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()

  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    localStorage.setItem('user', JSON.stringify(user));
     // Dispatch the success action
     dispatch(receiveLogin(user));
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    //const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}
export const signupUser= (values) => async dispatch =>{
  const auth = getAuth()
  try{
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      values.email, values.password, values.displayName
      )
      const user = userCredential.user
    console.log( user)
     // Dispatch the success action
     dispatch(receiveLogin(user));
  }
  catch(error){
    console.log(error.message)
  }
  
}
export const loginUser = (values) => async (dispatch )=> {
  dispatch(requestLogin(values))
  const auth = getAuth()
  try{
    
    const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password,)
    var user = userCredential.user
    localStorage.setItem('user' , JSON.stringify(user))
    dispatch(receiveLogin(user))
    console.log(user)
  }
  catch (error) {
    return dispatch(loginError(error.message));
  }
}

//logout
export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout())
  signOut(auth)
  .then(() => {
      // Sign-out successful.
      dispatch(receiveLogout())
    }).catch((error) => {
      // An error happened.
      
    });
  localStorage.removeItem('user');
  
  
}
 

export const observer =() => async dispatch =>{
  const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
}
