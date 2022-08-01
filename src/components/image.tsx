import { FC, memo } from "react";
import { Picture } from "../model/picture";

interface Props{
    picture:Picture
}
const Image:FC<Props> =memo((props)=>{
    const {picture}=props;
    return (
        <li style={{backgroundColor:picture.bgc}}>
            {picture.content}
        </li>
    )
})
export default Image;