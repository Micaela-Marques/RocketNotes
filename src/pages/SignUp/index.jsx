import { Container, Form, Background } from "./styles";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";

export function SignUp() {
    return (
        <Container>
            <Background />
            <Form>
                <h1>Rocket Notes</h1>
                <p>Aplicação para salvar e gerenciar seus links úteis</p>

                <h2>Crie a sua conta</h2>

                <Input placeholder="Nome"
                    type="text"
                    Icon={FiUser} />

                <Input placeholder="E-mail"
                    type="text"
                    Icon={FiMail} />


                <Input placeholder="Senha"
                    type="password"
                    Icon={FiLock} />

                <Button title="Cadastrar" />

                <Link to="/">
                    Voltar para o login

                </Link>
            </Form>

        </Container>

    )

}