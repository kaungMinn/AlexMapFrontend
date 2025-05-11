import LinkButton from "@/components/buttons/LinkButton"
import PrimaryButton from "@/components/buttons/PrimaryButton"
import PrimaryInput from "@/components/inputs/PrimaryInput"
import { AUTH_CONSTANTS } from "@/constants/authConstants"
import { MAP_ROUTE } from "@/constants/routePaths"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxProvider"
import { AuthSchema } from "@/schemas/authSchema"
import { postLogin } from "@/store/actions/authAction"
import { LoginFormTypes } from "@/types/_authTypes"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { isLoading, isSuccess } = useAppSelector(state => state.auth)
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormTypes>({
        defaultValues: AUTH_CONSTANTS.login,
        resolver: zodResolver(AuthSchema.login)
    })

    const onSubmit = async (data: LoginFormTypes) => {
        dispatch(postLogin(data))
    }

    useEffect(() => {
        if (isSuccess) {
            navigate(MAP_ROUTE);
        }
    }, [isSuccess, navigate])

    return (
        <>
            <form className="space-y-2 py-5" onSubmit={handleSubmit(onSubmit)}>
                <p className="sub-heading-font">
                    Login
                </p>

                <PrimaryInput id="name" label="Username" required register={register} errors={errors} />

                <PrimaryInput id="password" label="Password" register={register} required errors={errors} />

                <PrimaryButton label="Login" type="submit" isLoading={isLoading} />

            </form>
            <LinkButton label="Register" to="/register" />
        </>
    )
}

export default Login