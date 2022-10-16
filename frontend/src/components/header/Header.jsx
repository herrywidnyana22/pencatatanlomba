import { useState } from "react"
import { useSelector} from 'react-redux'
import "./Header.css"
import MenuAdmin from "../menuAdmin/MenuAdmin"

const Header = () => {

    const {user} = useSelector((state) => state.auth)
    const [isActive, setActive] = useState("active")
    const [isClick, setClick] = useState("")

    const switchTema = () => {
        document.body.classList.toggle('variabel-tema-gelap');
        setActive(!isActive)
    }

    const dropMenu = () =>{
        setClick(!isClick)
    }

    return (
            
        <>  
            <div className="header">
                <div className="logo">
                    <img src="logo512.png" alt="logo" />
                    <h2>LogoNe</h2>
                </div>

                <div className="right">
                    <div className="tema-toggle" onClick={switchTema}>
                        <span className={`material-icons-sharp ${isActive ? "active" : ""} `}>light_mode</span>
                        <span className={`material-icons-sharp ${isActive ? "" : "active"} `}>dark_mode</span>
                    </div>
                    <div className="profile" onClick={dropMenu}>
                        <div className="info_user">
                            {/* <p><b>{user && user.username}</b></p> */}
                            <p><b>{user && user.name}</b></p>
                            <small className="text-muted">{user && user.role}</small>
                        </div>

                        <div className="photo_user">
                            <img src="logo512.png" alt="" />
                        </div>   
                    </div>
                    <MenuAdmin klik = {isClick} />
                </div>
            </div>
        </>
    )
}

export default Header