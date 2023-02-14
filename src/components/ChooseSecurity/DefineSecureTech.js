import * as React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { LargeInfoCard } from '../LargeInfoCard';
import { addSecTechToDB, removeAllSecTechFromDB } from '../../Functions/SecurityTechStack'
import TechContainerButtons from '../TechContainerButtons';
import DialogContent from '@mui/material/DialogContent';


export function DefineSecureTech(props) {
    const { onClose, tech, open, imageUrl, user } = props;
    const techName = tech.name
    const title = "Define Technology"
    const allSecTech = props.allSecTech;
    const setSecTech = props.setSecTech;

    return (
        <Dialog
            onClose={onClose}
            fullWidth={true}
            maxWidth={'lg'}
            scroll={'body'}
            open={open}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>

                <LargeInfoCard imageUrl={imageUrl} title={techName} description={"Please add " + techName.toLowerCase() + " to your model if it is a part of your tech stack."}>
                    <TechContainerButtons 
                    removeButtonDisabled={!tech.selected}
                        addButtonDisabled={tech.selected}
                        addAssetOnClick={
                            () => {
                                addSecTechToDB(
                                    tech,
                                    user,
                                    onClose,
                                    allSecTech,
                                    setSecTech
                                )
                            }
                        }
                        onClose={onClose}
                        removeAssetOnClick={() => { 
                            removeAllSecTechFromDB(
                                user, 
                                techName, 
                                onClose, 
                                allSecTech, 
                                setSecTech
                                ) }} 
                        />
                </LargeInfoCard>
            </DialogContent>
        </Dialog>
    );
}

DefineSecureTech.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    assetContainer: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
};
