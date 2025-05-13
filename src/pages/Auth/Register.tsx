import LinkButton from "@/components/buttons/LinkButton"
import PrimaryButton from "@/components/buttons/PrimaryButton"
import PrimaryInput from "@/components/inputs/PrimaryInput"
import { AUTH_CONSTANTS } from "@/constants/authConstants"
import { RegisterFormTypes } from "@/types/_authTypes"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthSchema } from "@/schemas/authSchema"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxProvider"
import { register as registerAccount } from '@/store/actions/authAction'
import SuccessBox from "@/components/modalBox/SuccessBox"
import { resetAuth } from "@/store/slices/authSlice"
import { useNavigate } from "react-router-dom"
import { LOGIN_ROUTE } from "@/constants/routePaths"

const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterFormTypes>({ defaultValues: AUTH_CONSTANTS.register, resolver: zodResolver(AuthSchema.register) });

    const { isSuccess } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = (values: RegisterFormTypes) => {
        dispatch(registerAccount(values))
    }
    return (
        <div>
            <form className="space-y-2 py-5" onSubmit={handleSubmit(onSubmit)}>
                <p className="sub-heading-font">
                    Register
                </p>
                <PrimaryInput id="name" label="Username" required register={register} errors={errors} />
                <PrimaryInput id="password" label="Password" required register={register} errors={errors} />
                <PrimaryInput id="confirmedPassword" label="Confirmed Password" required register={register} errors={errors} />

                <PrimaryButton label="Register" type="submit" />
            </form>
            <LinkButton label="Login" to="/login" />

            <SuccessBox
                isOpen={isSuccess}
                titleLabel="Success"
                bodyText="Account created."
                clickOn={() => { dispatch(resetAuth()); reset(); navigate(LOGIN_ROUTE) }}
            />

        </div>
    )
}

export default Register