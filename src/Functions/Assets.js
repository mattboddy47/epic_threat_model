import { getStorage, ref, getDownloadURL } from "firebase/storage";
import axios from 'axios';

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
