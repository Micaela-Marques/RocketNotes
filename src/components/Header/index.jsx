import { RiShutDownLine } from 'react-icons/ri';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';

import avatarPlaceholder from '../../assets/avatar_placeholder.svg';

import { Container, Profile, Logout } from "./style";

export function Header() {
    const { user, SignOut } = useAuth(); // Obter o usuário do contexto de autenticação

    const navigate = useNavigate();

    function handleSignOut() {
        navigate("/");
        SignOut();
    }


    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

    return (
        <Container>
            <Profile to="/profile">
                <img src={avatarUrl}
                    alt={user.name} />

                <div>
                    <span>Bem Vindo</span>
                    <strong>{user.name}</strong> {/* Exibe dinamicamente o nome do usuário */}
                </div>
            </Profile>
            <Logout onClick={handleSignOut}>
                <RiShutDownLine />
            </Logout>
        </Container>
    );
}
