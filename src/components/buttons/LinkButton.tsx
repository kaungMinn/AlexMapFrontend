import { useNavigate } from "react-router-dom"

const LinkButton = ({ label, to }: { label: string, to: string }) => {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate(to)} className="underline caption-font hover:text-primary duration-100">{label}</button>
    )
}

export default LinkButton