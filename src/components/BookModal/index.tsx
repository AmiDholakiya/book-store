import { Button, Modal } from "react-bootstrap";

interface Props{
    children: JSX.Element;
    showModal: boolean;
    title: String;
    onSubmit(): void;
    onClose(): void; 
    submitButtonText: String;

}

const BookModal = ({showModal,children,title,onSubmit,onClose,submitButtonText}:Props) => {
    return         <Modal
    show={showModal}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    backdrop="static"
    keyboard={false}
    onHide ={()=>onClose()}
>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            {title}
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {children}
    </Modal.Body>
    <Modal.Footer>
        <Button onClick={() => onSubmit()} type="submit">{submitButtonText}</Button>
        <Button onClick={() => onClose()}>Close</Button>
    </Modal.Footer>
</Modal>
}

export default BookModal;