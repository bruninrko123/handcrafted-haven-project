
type FormInputProps = {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;

}


export function FormInput({ id, label, type, value, onChange, placeholder, required }: FormInputProps) {
    
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="block h-[45px] rounded mb-5 w-full p-2"
            />
        </>
    );
}