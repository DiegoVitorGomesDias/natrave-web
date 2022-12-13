export const Buttons = ({ type, link, children, disabled = false }) =>
{
  const classButtonSchema = 
  "rounded-xl w-full font-bold px-8 py-4 text-base text-center cursor-pointer transition-colors ease-in-out duration-300 focus:outline-5 focus:outline-red-700 ";

  const classButton = 
  {
    "primary-bg-white": classButtonSchema + `bg-white text-red-700 hover:bg-red-300 hover:text-white`,
    "primary-bg-red": classButtonSchema + `bg-red-500 text-white hover:bg-red-300`,
    "secundary": classButtonSchema + `border-white border-2 rounded-xl hover:bg-red-300 hover:border-red-300`
  }

  if (type.tag === "submit") return (
    <input type="submit" 
      value={children} 
      className={(classButton[type.style] ?? classButtonSchema) + " " + (disabled && "opacity-80 cursor-default") } 
      disabled={disabled}
    />
  )
    
  if (type.tag === "href") return (
    <a className={classButton[type.style] ?? classButtonSchema} href={link}>      
      {children}
    </a>
  )
}
