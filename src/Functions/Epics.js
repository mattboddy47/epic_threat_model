import { db } from '../firebase'
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc, 
    query,
    where,
    doc
} from 'firebase/firestore'
import {
    validateStringIsText
} from './Validations'


export function addEpicToDB(name, securityFocus, onCloseDialog, user, setEpics, epics, toast) {
    const epicsCollectionRef = collection(db, "Epics");
    const dateTime = Date.now();
    if (!validateStringIsText(name)){
        toast.error("Epic names can be made of text only")
        return;
    }
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

export function deleteEpicFromDB(epicId, user, toast, navigate) {
    getDocs(query(
      collection(db, "Epics"),
      where("owner", "==", user.uid),
      where('__name__', '==', epicId)
    )).then(data => {
      const tech = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
     
      const runDel = async res => {
          const assetDoc = doc(db, "Epics", tech[0].id)
          await deleteDoc(assetDoc)
          .catch((e) =>{
            toast.error("Something went wrong whilst trying to delete the Epic")
          })
          }
          runDel()
          .then(
            navigate('/start-threat-modelling')
          )
          .catch(
            (e) => {
                toast("Something went wrong whilst deleting the Epic")
            }
          )

    }).catch(
        (e) => {
            toast.error("Something went wrong whilst trying to delete the Epic")

        }
    )

  }


function addEpicToStack(epics, setEpics, name, user, securityFocus, creationDate, epicId) {
    const newEpicStack = JSON.parse(JSON.stringify(epics));
    newEpicStack.push({
        name: name,
        securityFocus: securityFocus,
        owner: user.uid,
        creationDate: creationDate,
        id: epicId
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
