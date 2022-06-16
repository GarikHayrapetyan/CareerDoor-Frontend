import React from "react";
import { observer } from "mobx-react-lite";
import { Modal } from "semantic-ui-react";
import { useStore } from "../../store/store";

export default observer(function ModalContainer() {
    const {modalStore,profileStore:{emptyFollowings,setOnce,setActiveTab}} = useStore();
    const handleCloseModal = function(){
        emptyFollowings();
        setOnce(false);
        setActiveTab(0);
        modalStore.closeModal();
    }

    return(
        <Modal open={modalStore.modal.open} onClose={handleCloseModal} size='mini'>
            <Modal.Content>
                {modalStore.modal.body}
            </Modal.Content>
        </Modal>
    )
})