
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
            <label
                htmlFor={id}
                className="block text-sm font-medium text-[#4b3621] mb-1"
            >
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="block w-full rounded-lg border border-[#d9c3aa] bg-white/90 px-3 py-2 text-sm text-[#3b2a1a] shadow-sm placeholder:text-[#9a8773] focus:outline-none focus:ring-2 focus:ring-[#6b4f3f] focus:border-transparent mb-4"
            />
        </>
    );
}
