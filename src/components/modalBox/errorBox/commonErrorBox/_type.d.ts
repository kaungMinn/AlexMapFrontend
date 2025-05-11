type ErrorBoxLayoutPropsType = {
    icon: React.ReactNode;
    title: string;
    bodyText?: string;
}

type ErrorResponsePropsType = {
    isError: boolean;
    errorMessage?: string;
}

export {ErrorBoxLayoutPropsType, ErrorResponsePropsType}