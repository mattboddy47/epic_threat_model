import { db } from '../firebase'
import { collection, getDocs, addDoc, deleteDoc, query, where, doc } from 'firebase/firestore'



export function removeTechFromDB(user, techName, onClose) {
    // async () => {
    getDocs(query(
        collection(db, "dev_sec_ops_tech"),
        where("owner", "==", user.uid),
        where("name", "==", techName)
    )).then(data => {
        const tech = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        try {
            tech.forEach(asset => {
                const assetDoc = doc(db, "dev_sec_ops_tech", asset.id)
                deleteDoc(assetDoc).finally(
                    onClose()
                )
            })
        } catch (error) {
            onClose();
        }

    })

// }
}

export function  addTechToDB(chips, techName, techDescription, imageUrl, guardsSensitiveData, user, onClose, toast) {
    const techCollectionRef = collection(db, "dev_sec_ops_tech")
    // async () => {
        if (chips.length === 0) {
            addDoc(techCollectionRef, {
                name: techName,
                asset: techName,
                description: techDescription,
                image: imageUrl,
                storesData: guardsSensitiveData,
                owner: user.uid
            }).then(
                onClose()
            )
            return;
        }
        // Filter to the selected chips
        const selectedTech = chips.filter(function (tech) {
            return tech.selected
        })
        // if no chips are selected, throw an error and do nothing
        if (selectedTech.length === 0) {
            toast.error("Please select the tech that you use.")
            return
        }
        // push the selected assets to firebase
        selectedTech.forEach(async asset => {
            await addDoc(techCollectionRef, {
                name: techName,
                image: imageUrl,
                asset: asset.name,
                storesData: guardsSensitiveData,
                description: techDescription,
                owner: user.uid
            })
        });
        onClose()
    // }
}


export function getTechStack(user) {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line 
        if (user.uid == undefined) {
            reject('user_error');
        }
        try {
            getDocs(
                query(
                    collection(db, "dev_sec_ops_tech"),
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
