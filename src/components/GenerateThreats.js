import { React, useEffect, useState } from 'react'
import GenerateThreatsForAssets from './GenerateThreatsForAssets';
import GenerateOverallThreats from './GenerateOverallThreats';

export default function GenerateThreats(props) {
    const userTechniques = props.userTechniques
    const assets = props.assets
    const malwareCampaigns = props.malwareCampaigns
    const [assetAndValidTechniques, setAssetAndValidTechniques] = useState(null);
    

    useEffect(() => {
        const newThreatModel = []
        assets.forEach(asset => {
            const assetTechniques = userTechniques.filter(function (technique) {
              return technique.platforms.some(platform => asset.platform_type === platform)
            })
            asset.validAttackTechniques = assetTechniques
            newThreatModel.push(asset)
        });
        setAssetAndValidTechniques(newThreatModel)
        // eslint-disable-next-line 
    }, []);
    
   
        return(
            <>
            <GenerateOverallThreats malwareCampaigns={malwareCampaigns} userTechniques={userTechniques}/>
            <GenerateThreatsForAssets assetAndValidTechniques={assetAndValidTechniques} assets={assets}/>
            </>
        )
 
   
}