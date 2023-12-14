import { Toast, ToastContainer } from "react-bootstrap";
interface Props{
    show: boolean;
    message: String;
    variant: string;
    onClose(): void; 

}
const ToastCustom = ({show,message,variant,onClose}:Props) =>{
    
    return <ToastContainer
    className="p-3"
    position="top-end"
    style={{ zIndex: 2 }}
>
    <Toast bg={variant} onClose={onClose} show={show} delay={3000} autohide>
        <Toast.Body>{message}</Toast.Body>
    </Toast>
</ToastContainer>
}

export default ToastCustom;