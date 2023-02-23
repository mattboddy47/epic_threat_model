import { db } from '../firebase'
import {
    collection,
    getDocs,
    addDoc,
    // deleteDoc, 
    query,
    FieldPath,
    where,
    // doc
} from 'firebase/firestore'


export function addEpicToDB(name, securityFocus, onCloseDialog, user, setEpics, epics) {
    const epicsCollectionRef = collection(db, "Epics");
    const dateTime = Date.now();
    addDoc(epicsCollectionRef, {
        name: name,
        securityFocus: securityFocus,
        owner: user.uid,
        creationDate: dateTime
    })
        .then(
            (docRef) => {
                addEpicToStack(epics, setEpics, name, user, securityFocus, dateTime, docRef.id)
            }
        )
        .then(
            onCloseDialog(true)
        )
}

function addEpicToStack(epics, setEpics, name, user, securityFocus, creationDate, epicId) {
    const newEpicStack = JSON.parse(JSON.stringify(epics));
    newEpicStack.push({
        name: name,
        securityFocus: securityFocus,
        owner: user.uid,
        creationDate: creationDate,
        epicId: epicId
    })
    setEpics(newEpicStack);
    return newEpicStack;
}

export function getEpics(user) {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line 
        if (user.uid == undefined) {
            reject('user_error');
        }
        try {
            getDocs(
                query(
                    collection(db, "Epics"),
                    where("owner", "==", user.uid)
                )).then((data => {
                    resolve(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                }))
                .catch((err) => {
                    reject("error");
                });


        } catch (err) {
            reject("error");
        }
    })
}


export function getEpic(user, epicId) {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line 
        if (user.uid == undefined) {
            reject('user_error');
        }
        try {
            getDocs(
                query(
                    collection(db, "Epics"),
                    where("owner", "==", user.uid),
                    where('__name__', '==', epicId)
                )).then((data => {
                    resolve(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                }))
                .catch((err) => {
                    reject("error");
                });


        } catch (err) {
            reject("error");
        }
    })
}
