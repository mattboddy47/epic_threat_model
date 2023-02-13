import { db } from '../firebase'
import { collection, getDocs, addDoc, deleteDoc, query, where, doc } from 'firebase/firestore'


export function removeTechFromDB(user, assetName, techName, allTech, setTech) {
    getDocs(query(
      collection(db, "dev_sec_ops_tech"),
      where("owner", "==", user.uid),
      where("asset", "==", assetName),
      where("name", "==", techName)
    )).then(data => {
      const tech = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
     
      const runDel = async res => {
          const assetDoc = doc(db, "dev_sec_ops_tech", tech[0].id)
          await deleteDoc(assetDoc)
          .catch(() =>{
            console.log(1)
          })
          }
          runDel()
          .then(                    
            removeTechFromStack(allTech, setTech, assetName)
          )

    })

  }

export function removeAllTechFromDB(user, techName, onClose, allTech, setTech) {
    getDocs(query(
        collection(db, "dev_sec_ops_tech"),
        where("owner", "==", user.uid),
        where("name", "==", techName)
    )).then(data => {
        const tech = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        try {
            tech.forEach(asset => {
                const assetDoc = doc(db, "dev_sec_ops_tech", asset.id)
                deleteDoc(assetDoc)
                .finally( () => {
                    removeAllTechFromStack(allTech, setTech, techName);
                    onClose(true)
                }
                )
            })
        } catch (error) {
            onClose(true);
        }

    })

}

function removeTechFromStack(techStack, setTech, assetName) {
    const newTechStack = techStack.filter(tech => 
        tech.asset !== assetName
    )
    setTech(newTechStack);
    return newTechStack;
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

export function addSensitiveDataTechToDB(whatChips, whoChips, howChips, whyChips, tech, user, assetName, onClose, setTech, allTech) {
    const techCollectionRef = collection(db, "dev_sec_ops_tech")

    // Filter to the selected chips
    const whatArray = getSelectedChips(whatChips);
    const whoArray = getSelectedChips(whoChips);
    const howArray = getSelectedChips(howChips);
    const whyArray = getSelectedChips(whyChips);
        
    // push the selected assets to firebase
    addDoc(techCollectionRef, {
        name: tech.name,
        owner: user.uid,
        what: whatArray,
        who: whoArray,
        how: howArray,
        why: whyArray,
        description: tech.description,
        asset: assetName,
        image: tech.image,
        storesData: tech.holds_sensitive_data
    }).then(
        response => {
            // console.log(response)
            addTechToStack(allTech, setTech, tech, assetName, user) 
            onClose(true)
        }
    ).catch(err => {
        // console.log(err)
    })

}

function getSelectedChips(chips) {
    const selectedChips = chips.filter(function (singleChip) {
        return singleChip.selected
    })
    return selectedChips.map(function (item) {
        return item['name'];
    });
}


export function addTechToDB(chips, tech, user, onClose, toast, techStack, setTechStack) {
    const techCollectionRef = collection(db, "dev_sec_ops_tech")
    // if there are no chips, then this is a tech such as authentication or WAF where it has no extra parameters. 
    if (chips.length === 0) {
        addDoc(techCollectionRef, {
            name: tech.name,
            asset: tech.name,
            description: tech.description,
            image: tech.image,
            storesData: tech.holds_sensitive_data,
            owner: user.uid
        })
            .then(
                addTechToStack(techStack, setTechStack, tech, tech.name, user)
            )
            .then(
                onClose(true)
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
    let newTechStack = JSON.parse(JSON.stringify(techStack));
    selectedTech.forEach(asset => {
        addDoc(techCollectionRef, {
            name: tech.name,
            image: tech.image,
            asset: asset.name,
            storesData: tech.holds_sensitive_data,
            description: tech.description,
            owner: user.uid
        }).then(
            newTechStack = addTechToStack(newTechStack, setTechStack, tech, asset.name, user)
        )
    });
    onClose(true)
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
