import { createContext, useContext, useState, useEffect } from "react";
import { api } from '../services/api';


export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [data, setData] = useState({});

    async function SignIn({ email, password }) {

        try {
            const response = await api.post("/sessions", { email, password });
            const { user, token } = response.data;

            localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
            localStorage.setItem("@rocketnotes:token", token);

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setData({ user, token });

        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            }
            else {
                alert("Não foi possivel fazer o login");
            }


        }


    }

    function SignOut() {
        localStorage.removeItem("@rocketnotes:token");
        localStorage.removeItem("@rocketnotes:user");


        setData({});
    }

    async function updateProfile({ user, avatarFile }) {
        try {
            if (avatarFile) {
                const fileUploadForm = new FormData();
                fileUploadForm.append("avatar", avatarFile);
                const response = await api.patch("/users/avatar", fileUploadForm);
                user.avatar = response.data.avatar;
            }

            await api.put("/users", user);
            localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
            setData({ user, token: data.token });

            alert("Perfil atualizado com sucesso!");

        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Não foi possível atualizar o perfil");
            }
        }
    }



    useEffect(() => {
        // Recupera o token do localStorage
        const token = localStorage.getItem("@rocketnotes:token");
        // Recupera as informações do usuário do localStorage
        const user = localStorage.getItem("@rocketnotes:user");

        // Se ambos, o token e as informações do usuário, estiverem presentes
        if (token && user) {
            // Configura o cabeçalho de autorização da API com o token
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Atualiza o estado com o token e as informações do usuário
            setData({
                token,
                user: JSON.parse(user) // Converte as informações do usuário de string para objeto
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            SignIn,
            SignOut,
            updateProfile,
            user: data.user,
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };
