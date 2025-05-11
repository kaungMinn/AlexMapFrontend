import LinkButton from "@/components/buttons/LinkButton"
import PrimaryButton from "@/components/buttons/PrimaryButton"
import PrimaryInput from "@/components/inputs/PrimaryInput"
import { AUTH_CONSTANTS } from "@/constants/authConstants"
import { RegisterFormTypes } from "@/types/_authTypes"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthSchema } from "@/schemas/authSchema"

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormTypes>({ defaultValues: AUTH_CONSTANTS.register, resolver: zodResolver(AuthSchema.register) })
    return (
        <div>
            <form className="space-y-2 py-5" onSubmit={handleSubmit(() => {
                console.log("Test")
            })}>
                <p className="sub-heading-font">
                    Register
                </p>
                <PrimaryInput id="name" label="Username" required register={register} errors={errors} />
                <PrimaryInput id="password" label="Password" required register={register} errors={errors} />
                <PrimaryInput id="confirmedPassword" label="Confirmed Password" required register={register} errors={errors} />

                <PrimaryButton label="Register" type="submit" />

            </form>
            <LinkButton label="Login" to="/login" />

        </div>
    )
}

export default Register