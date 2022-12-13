import { addDays, subDays, format, formatISO} from 'date-fns'
import { ptBR } from "date-fns/locale";

import { Icons } from "~/components/icons.jsx"
     
export const DateSelect = ({ currentDate, onChange }) =>
{
    const date = new Date(currentDate);
    const prevDay = () => onChange(formatISO(subDays(date, 1)));
    const nextDay = () => onChange(formatISO(addDays(date, 1)));

    return (
        <nav className="flex gap-6">
            <button className="appearance-none" onClick={prevDay}><Icons icon="ArrowLeft" fill={"red-500"} /></button>
            <time className="text-red-700 font-bold">
                { format(date, "dd 'de' MMMM", {locale: ptBR}) }
            </time>
            <button className="appearance-none" onClick={nextDay}><Icons icon="ArrowRight" fill={"red-500"} /></button>
        </nav>
    )
}