import { db } from '../firebase'
import { collection, getDocs, addDoc, deleteDoc, query, where, doc } from 'firebase/firestore'

export function removeSecTechFromDB(user, assetName, techName, allTech, setTech) {
    getDocs(query(
      collection(db, "dev_sec_ops_sec_tech"),
      where("owner", "==", user.uid),
      where("asset", "==", assetName),
      where("name", "==", techName)
    )).then(data => {
      const tech = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
     
      const runDel = async res => {
          const assetDoc = doc(db, "dev_sec_ops_sec_tech", tech[0].id)
          await deleteDoc(assetDoc)
          .catch(() =>{

          })
          }
          runDel()
          .then(                    
            removeSecTechFromStack(allTech, setTech, assetName)
          )

    })

  }

  
function removeSecTechFromStack(techStack, setTech, assetName) {
    const newTechStack = techStack.filter(tech => 
        tech.asset !== assetName
    )
    setTech(newTechStack);
    return newTechStack;
}

export function removeAllSecTechFromDB(user, techName, onClose, 
    allSecTech, setSecTech
    ) {
    getDocs(query(
        collection(db, "dev_sec_ops_sec_tech"),
        where("owner", "==", user.uid),
        where("name", "==", techName)
    )).then(data => {
        const tech = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        try {
            tech.forEach(asset => {
                const assetDoc = doc(db, "dev_sec_ops_sec_tech", asset.id)
                deleteDoc(assetDoc)
                .finally( () => {
                    removeAllTechFromStack(allSecTech, setSecTech, techName);
                    onClose(true)
                }
                )
            })
        } catch (error) {
            onClose(true);
        }

    })

}

function removeAllTechFromStack(techStack, setTech, techName) {
    const newTechStack = techStack.filter(tech => 
        tech.name !== techName
    )
    setTech(newTechStack);
    return newTechStack;
}

function addTechToStack(techStack, setTechStack, tech, assetName, user) {
    const newTechStack = JSON.parse(JSON.stringify(techStack));
    newTechStack.push({
        name: tech.name,
        asset: assetName,
        description: tech.description,
        image: tech.image,
        storesData: tech.holds_sensitive_data,
        owner: user.uid
    })
    setTechStack(newTechStack);
    return newTechStack;
}

export function addSecTechToDB(tech, user, onClose, 
    secTechStack, setSecTechStack
    ) {
    const techCollectionRef = collection(db, "dev_sec_ops_sec_tech")

        addDoc(techCollectionRef, {
            name: tech.name,
            asset: tech.name,
            description: tech.description,
            image: tech.image,
            protectsData: tech.protects_sensitive_data_tech,
            owner: user.uid
        })
            .then(
                addTechToStack(secTechStack, setSecTechStack, tech, tech.name, user)
            )
            .then(
                onClose(true)
            )
   
}



export function getSecTechStack(user) {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line 
        if (user.uid == undefined) {
            reject('user_error');
        }
        try {
            getDocs(
                query(
                    collection(db, "dev_sec_ops_sec_tech"),
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
