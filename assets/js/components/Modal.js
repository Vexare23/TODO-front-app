import React, {useState, useEffect} from "react";
import ReactDom from "react-dom";

export default function TrueModal({show, onClose, children}) {
    const [isBrowser, setIsBrowser] = useState(false)

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    }

    const modalContent = show ? (
        <div className="overlay">
            <div className="modal">
                <div className="modal-header">
                    <a href="#" onClick={handleClose}>
                        <button className="btn">Close</button>
                    </a>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    ) : null;
    if(isBrowser) {
        return ReactDom.createPortal(
            modalContent,
            document.getElementById("modal-root")
        )
    } else {
        return null;
    }
}
/*
<button onClick={() => setShowAddModal(true)}
        className={"btn"}>
    Crete TODO
</button>
<TrueModal
    show={showAddModal}
    onClose={() => setShowAddModal(false)}>
    WORK GOD DAMMIT
</TrueModal>
 */
