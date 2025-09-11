
const Modal = ({ children, show, setShow }) => {
    if (!show) return null
    const handleBackgroundClick = (e) => {
        e.stopPropagation()
        setShow(false)
    }

    return (
        <div
            className="fixed inset-0 bg-white/30 flex items-center justify-center z-50"
            onClick={handleBackgroundClick}
        >
            <div className="relative bg-black rounded-lg w-full max-w-xl max-h-[60vh] overflow-hidden">
                <div className="p-6 overflow-y-auto h-full">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal