import { db } from '../firebase'
import {
    collection,
    // getDocs, 
    addDoc,
    // deleteDoc, 
    // query, 
    // where, 
    // doc
} from 'firebase/firestore'


export function addEpicToDB(name, securityFocus, onCloseDialog, user) {
    const epicsCollectionRef = collection(db, "Epics")
    console.log("name: " + name)
    console.log("secFocus" + securityFocus)
    addDoc(epicsCollectionRef, {
        name: name,
        securityFocus: securityFocus,
        owner: user.uid
    })
        // .then(
        //     addEpicToStack(epics, setEpics, name, user, securityFocus)
        // )
        .then(
            onCloseDialog(true)
        )
}

