import { RiShutDownLine } from 'react-icons/ri'
import { Link } from "react-router-dom";

import { Container, Profile, Logout } from "./style";

export function Header() {
    return (
        <Container>

            <Profile to="/profile">
                <img src="https://github.com/Micaela-Marques.png" alt="foto do usuario" />

                <div>
                    <span>Bem Vindo</span>
                    <strong>Micaela Marques</strong>
                </div>
            </Profile>
            <Logout>
                <RiShutDownLine />
            </Logout>


        </Container>
    )
}