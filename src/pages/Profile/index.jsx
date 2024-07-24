import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi'
import { useAuth } from '../../hooks/auth';

import { api } from '../../services/api';

import avatarPlaceholder from '../../assets/avatar_placeholder.svg';

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { Container, Form, Avatar } from "./styles";
import { Link } from "react-router-dom";
import { ButtonText } from '../../components/ButtonText';

export function Profile() {
    const navigate = useNavigate();
    const { user, updateProfile } = useAuth();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [passwordOld, setPasswordOld] = useState("");
    const [passwordNew, setPasswordNew] = useState("");

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

    const [avatar, setAvatar] = useState(avatarUrl);
    const [avatarFile, setAvatarFile] = useState(null)


    function handleBack() {
        navigate(-1)
    }



    async function handleUpdate() {
        const updated = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld
        };

        const userUpdated = Object.assign(user, updated);

        await updateProfile({ user: userUpdated, avatarFile });
    }

    function handleChangeAvatar(e) {
        const file = e.target.files[0];
        setAvatarFile(file);

        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview);
    }
    return (
        <Container>
            <header>
                <button type='button'
                    onClick={handleBack}>
                    <FiArrowLeft size={24} />

                </button>


            </header>

            <Form>
                <Avatar>
                    <img
                        src={avatar}
                        alt="Foto do usuário"
                    />
                    <label htmlFor="avatar">
                        <FiCamera />

                        <input
                            id="avatar"
                            type="file"
                            onChange={handleChangeAvatar}


                        />
                    </label>
                </Avatar>

                <Input
                    placeholder="Nome"
                    type="text"
                    Icon={FiUser}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <Input
                    placeholder="E-mail"
                    type="text"
                    Icon={FiMail}
                    value={email}
                    onChange={e => setemail(e.target.value)}

                />

                <Input
                    placeholder="Senha atual"
                    type="password"
                    Icon={FiLock}
                    onChange={e => setPasswordOld(e.target.value)}
                />

                <Input
                    placeholder="Nova atual"
                    type="password"
                    Icon={FiLock}
                    onChange={e => setPasswordNew(e.target.value)}
                />

                <Button title="Salvar" onClick={handleUpdate} />
            </Form>
        </Container>
    )
}