import React, { useState } from 'react';
import { Container, Form, Background } from "./styles";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

const navigate = useNavigate();

    function handleSignUp() {
        if (!name || !email || !password) {
            return alert("Preencha todos os campos!");
        }
        api.post("/users", { name, email, password })
            .then(() => {
                alert("Cadastro realizado com sucesso!");
                navigate("/");
            })
            .catch(error => {
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    alert("Erro ao realizar cadastro!");
                }
            });
    }

    return (
        <Container>
            <Background />
            <Form>
                <h1>Rocket Notes</h1>
                <p>Aplicação para salvar e gerenciar seus links úteis</p>
                <h2>Crie a sua conta</h2>
                <Input
                    placeholder="Nome"
                    type="text"
                    Icon={FiUser}
                    onChange={e => setName(e.target.value)}
                />
                <Input
                    placeholder="E-mail"
                    type="text"
                    Icon={FiMail}
                    onChange={e => setEmail(e.target.value)}
                />
                <Input
                    placeholder="Senha"
                    type="password"
                    Icon={FiLock}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button title="Cadastrar" onClick={handleSignUp} />
                <Link to="/">
                    Voltar para o login
                </Link>
            </Form>
        </Container>
    );
}
