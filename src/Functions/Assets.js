import { getStorage, ref, getDownloadURL } from "firebase/storage";
import axios from 'axios';

// define if the asset is selected or not based on whether it exists in the tech stack
export function defineAssetSelected(asset, userTech) {
    const selected = userTech.some(tech => tech.name === asset.name)
    asset.selected = selected;

    return selected;
}

export function countExistingTech(asset, userTech) {
    const existingTech = userTech.filter(tech => tech.name === asset.name);
    const existingTechCount = Object.keys(existingTech).length;
    asset.existingTechCount = existingTechCount
    return existingTechCount;
}

export function getAssetName(techName, existingTechCount) {
    const newTechCount = existingTechCount + 1;
    return techName + " " + newTechCount;
}

export function getAssets(user) {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line 
        if (user.uid == undefined) {
            reject('user_error');
        }
        const storage = getStorage();
        const assetsJsonPath = ref(storage, 'assets.json');
        getDownloadURL(assetsJsonPath)
            .then((url) => {
                axios.get(url)
                    .then((response) => {
                        resolve(response.data);
                    })
                    .catch((error) => {
                        reject('error');
                    }
                    )
            }).catch(error => {
                reject('error');
            });

    })
}
