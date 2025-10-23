
const FoodLogModal = ({ showModal, setShowModal}) => {

    const handleModalBackdropClick = (e) => {
        e.stopPropagation()
        setShowModal(false)
    }

    return (
        <div onClick={handleModalBackdropClick} className="fixed inset-0 text-white bg-black/60">
            <div onClick={e => e.stopPropagation()}>
                <input className="px-4 py-2 text-white font-bold" type="datetime-local" />
            </div>
        </div>
    )
}

export default FoodLogModal