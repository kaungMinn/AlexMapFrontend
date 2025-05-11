import axios from "axios"

type ValidationError = {
    message: string;
    errors: Record<string, string[]>
}

const check = (error: unknown) => {
    if(axios.isAxiosError<ValidationError, Record<string, unknown>>(error)){
        return error.response;
    }

    return null;
}

const error_helper = {
    check,
}

export default error_helper;