export const Input = ({ name, type, placeholder, children, error, ...rest} ) =>
{
    const inputSchema = "w-full rounded-lg bg-white border-2 border-gray-700 px-2 py-1 text-red-700 focus:outline-red-700 focus:outline-1"
    return (
        <div>
            <label htmlFor={name} className=
            "w-full text-gray-700">
                {children}
            </label>
            <input type={type} name={name} id={name} placeholder={placeholder} {...rest}
                className={inputSchema + (error && " border-red-300 border-2")}
            />
        </div>
    )
}