import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

import { auth, db, } from "../firebase/firebase";
import { collection, doc, getDocs, addDoc, serverTimestamp, deleteDoc, where,query,getDoc, updateDoc, setDoc,arrayUnion, arrayRemove} from "firebase/firestore";
import {getAuth, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider,signInWithPopup, signOut, createUserWithEmailAndPassword,  } from "firebase/auth";
import { async } from "@firebase/util";

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});



//POST Comment to server 
export const postComment =  (dishId, values) =>async dispatch => {
  const auth = getAuth()
  const user = auth.currentUser
    
    if(user !== null){
      const email = user.email
      console.log(email)

      // Add a new document with a generated id.
      const comment = await addDoc(collection(db, "comments"), {
        author: {
          '_id': auth.currentUser.uid,
          'firstname' : auth.currentUser.displayName ? auth.currentUser.displayName : auth.currentUser.email
      },
      dishId  : dishId,
      rating: values.rating,
      comment: values.comment,
      updatedAT: serverTimestamp()
      });
      console.log("Document written with ID: ", comment.id);
      dispatch(addComment(comment))
      dispatch(fetchComments())
    }
    else{
      alert('sign-in to Post Comment')
    }

  }

// Delete comment
export const deleteComment = (del) => async dispatch =>  {
  const auth = getAuth()
  const user = auth.currentUser
  if (user !== null){
    await deleteDoc(doc(db,"comments", `${del}`))
  alert('Comment Deleted Successfully!!!' )
  console.log(del)
  dispatch(fetchComments())
  }
  else{
    alert("You are not authorized to delete commet")
  }
  
}



export const fetchDishes = () => async (dispatch) => {

    dispatch(dishesLoading(true));
    try{
      const querySnapshot = await getDocs(collection(db, "dishes", ))
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
export const fetchComments = () => async (dispatch) => {
  try{
    const querySnapshot = await getDocs(collection(db, "comments"))
    let comments =[]
    querySnapshot.forEach(doc=>{
      const data = doc.data()
      const _id = doc.id
      comments.push({_id, ...data });

    })
    return dispatch(addComments(comments))
  }
  catch (error) {
    return dispatch(commentsFailed(error.message));
  }


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
export const deleeComment = (id) => (dispatch) => {
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
     dispatch(receiveLogin(user))
     dispatch(fetchFavorites());
     window.location.href='/home'    
    document.getElementById('loginError').innerHTML = ''
  }
  catch(error){
    console.log(error.message)
    document.getElementById('signUpError').innerHTML = error.message
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
    // dispatch(fetchFavorites())
    console.log(user)
    window.location.href='/home'    
    document.getElementById('loginError').innerHTML = ''

  }
  catch (error) {
    console.log(error.message)
    document.getElementById('loginError').innerHTML = error.message
    return dispatch(loginError(error.message))
    
  }
}

//logout
export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout())
  signOut(auth)
  .then(() => {
      // Sign-out successful.
      dispatch(receiveLogout())
      alert('You have signed out successfully')
    }).catch((error) => {
      // An error happened.
      
    });
  localStorage.removeItem('user');
  
  
}
 
export const fetchAuth = () => (dispatch) => {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) =>{
    
    if(user){
      const uid = user.uid
      console.log(uid)
      localStorage.setItem('user', JSON.stringify(user))
      dispatch(receiveLogin(user))
      dispatch(fetchFavorites())
    }
    else{
    console.log( "User is signed out" )
    localStorage.removeItem('user')
  }
  })
  
  

}

//Favotites
export const favoritesLoading = () => ({
  type: ActionTypes.FAVORITES_LOADING
});

export const favoritesFailed = (errmess) => ({
  type: ActionTypes.FAVORITES_FAILED,
  payload: errmess
});

export const addFavorites = (favorites) => ({
  type: ActionTypes.ADD_FAVORITES,
  payload: favorites
});

export const fetchFavorites = () => async dispatch =>{
  const auth = getAuth()
  const user = auth.currentUser
  
  dispatch(favoritesLoading(true))
  try{
    const q = query(collection(db, "favorites"), where('user', '==', user.uid))
    const querySnapshot = await getDocs(q)
    let favorites = { user: user, dishId: []};
    querySnapshot.forEach((doc)=>{
      const data = doc.data()
      const _id = doc.id
      favorites.dishId.push({_id, ...data})
      console.log(favorites.dishId
        )
    })
    return dispatch(addFavorites(favorites))
    
  }
  
  catch (error) {
    return dispatch(favoritesFailed(error.message));
  }
  
}
export const postFavorites = (_id) => async dispatch =>{
  const auth = getAuth()
  const user = auth.currentUser
  const docRef = doc(db, "favorites", `${auth.currentUser.uid}`);
  const docSnap = await getDoc(docRef);

  if(user !== null){
     //check if favorites exsists and add
     if(docSnap.exists()){
      const favorites = await updateDoc(docRef, {
       dishId : arrayUnion(_id)
     })
     dispatch(addFavorites(favorites))
     dispatch(fetchFavorites())
     alert('Added to Favorites')   

   }
   else{
  // Add a new Favorites.
  const favorites = await setDoc(doc(db, "favorites",`${auth.currentUser.uid}`), {
    dishId  : [_id],
    user : auth.currentUser.uid,
    });
    console.log("Document written with ID: ", favorites);
    dispatch(addFavorites(favorites))
    dispatch(fetchFavorites())
    alert('Added to Favorites')   
}
  } 
  else{
    alert('sign-in to add to Favorites')
  }
}
export const deleteFavorites = (_id) => async dispatch =>{
  const auth = getAuth()
  const user = auth.currentUser
  const docRef = doc(db, "favorites", `${auth.currentUser.uid}`);
  const docSnap = await getDoc(docRef);
  if (user !== null){
    if(docSnap.exists()){
      const favorites = await updateDoc(docRef, {
       dishId : arrayRemove(_id)
     })
  alert('Favorites Removed Successfully!!!' )
  dispatch(addFavorites(favorites))
  console.log(_id)
  dispatch(fetchFavorites())
  }
  else{
    alert("You are not authorized to remove Favorites")
  } 
  }
}
export const deleteAllFavorites = (_id) => async dispatch =>{
  const auth = getAuth()
  const user = auth.currentUser
  if (user !== null){
    await deleteDoc(doc(db,"favorites", `${_id}`))
  alert('Favorites Removed Successfully!!!' )
  console.log(_id)
  dispatch(fetchFavorites())
  }
  else{
    alert("You are not authorized to remove Favorites")
  } 
}
