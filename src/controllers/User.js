import { db, firebaseAuth } from '../config/constants'

export class User {
	
	saveCurrentUser = (user) => {
		return db.ref().child(`users/${user.uid}/info`)
			.set({
				email: user.email,
				uid: user.uid
			})
			.then(() => user)
	}
	
	getCurrentUser = async () => {
		const loggedUser = await firebaseAuth().currentUser
		let userInfo = {}
		if (loggedUser) {
			userInfo = await db.ref(`users/${loggedUser.uid}`).once('value')
			return userInfo.val()
		}
		console.log("currentUser",userInfo)
		return userInfo
	}
	getCurrentUserId = async () => {
		const loggedUser = await firebaseAuth().currentUser.uid
		return loggedUser
	}
}
