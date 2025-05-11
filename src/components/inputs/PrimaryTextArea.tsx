import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { TextareaHTMLAttributes } from "react";

type TextareaProps<T extends FieldValues> = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    id: Path<T>;
    label?: string;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    wrapperClassName?: string;
    labelClassName?: string;
    errorClassName?: string;
    rows?: number;
};

const PrimaryTextarea = <T extends FieldValues>({
    id,
    label,
    disabled,
    register,
    required,
    errors,
    className = "",
    wrapperClassName = "",
    labelClassName = "",
    errorClassName = "",
    rows = 3,
    ...rest
}: TextareaProps<T>) => {
    return (
        <div className={`w-full relative ${wrapperClassName}`}>
            {label && (
                <label
                    htmlFor={id}
                    className={`block mb-1 caption-font ${errors[id] ? "text-rose-500" : "text-gray-900"
                        } ${labelClassName}`}
                >
                    {label} {required && <span className="text-rose-500">*</span>}
                </label>
            )}
            <textarea
                id={id}
                disabled={disabled}
                rows={rows}
                {...register(id, { required })}
                {...rest}
                className={`
                    w-full p-2 border rounded-lg outline-none caption-font transition shadow-sm 
                    ${errors[id] ? "border-rose-500" : "border-gray-300"}
                    ${errors[id] ? "focus:shadow-danger" : "focus:shadow-primary"}
                    ${disabled && "opacity-70 cursor-not-allowed"}
                    ${className}
                `}
            />
            {errors[id] ? (
                <p className={`mt-1 text-xs text-rose-500 ${errorClassName}`}>
                    {errors[id]?.message as string || "This field is required"}
                </p>
            ) : <p className="py-2.5" />}
        </div>
    );
};

export default PrimaryTextarea;