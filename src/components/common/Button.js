
const Button = ({ children, className, onClick, image }) => {
    return (
        <button onClick={onClick} className={className + " bg-button-background rounded py-2 flex items-center"}>
            <img src={image} alt="icon" className="ml-3 mr-3 object-contain" />
            <p className="text-header-text mr-3 font-bold">
                {children}
            </p>
        </button>
    )
}

export default Button
