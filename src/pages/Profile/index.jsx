import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { Container, Form, Avatar } from "./styles";
import { Link } from "react-router-dom";

export function Profile() {
    return (
        <Container>
            <header>
                <Link to="/">
                    <FiArrowLeft />
                </Link>
            </header>

            <Form>
                <Avatar>
                    <img
                        src="https://github.com/Micaela-Marques.png"
                        alt="Foto do usuário"
                    />
                    <label htmlFor="avatar">
                        <FiCamera />

                        <input
                            id="avatar"
                            type="file"
                        />
                    </label>
                </Avatar>

                <Input
                    placeholder="Nome"
                    type="text"
                    Icon={FiUser}
                />

                <Input
                    placeholder="E-mail"
                    type="text"
                    Icon={FiMail}
                />

                <Input
                    placeholder="Senha atual"
                    type="password"
                    Icon={FiLock}
                />

                <Input
                    placeholder="Nova atual"
                    type="password"
                    Icon={FiLock}
                />

                <Button title="Salvar" />
            </Form>
        </Container>
    )
}