import { SelectionData } from "./selection";
import { Icon } from '../Icon';

export const selectionData : SelectionData = [
    {
        id: "1",
        text: "Content A"
    },
    {
        id: "2",
        text: "Content B"
    },
    {
        id: "3",
        text: "Content C"
    }

]


export const selectionDataWithIcon : SelectionData = [
    {
        id: "1",
        text: "Content AZ",
        icon: (
            <Icon name="caution" width={24} height={24} color="text-error" />
          ),
    }
    
    
   
]
   
