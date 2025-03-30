import axios from 'axios';

import { useState } from 'react';

import { FaGithub } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';

function SectionMain() {
    // Pegando Valor do Input
    const [user, setUser] = useState<string | null>(null);

    const [apiLogin, setApiLogin] = useState<string>('');
    const [apiImgAvatar, setApiImgAvatar] = useState<string>('');
    const [apiBio, setApiBio] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [apiError, setApiError] = useState<boolean>(false);
    const [hasSearched, setHasSearched] = useState<boolean>(false);

    // API Datas
    const userFunction = async () => {
        if (!user) return;

        setHasSearched(true);

        try {
            setLoading(true);
            setApiError(false);

            const response = await axios.get(
                `https://api.github.com/users/${user}`
            );

            setApiLogin(response.data.login);
            setApiImgAvatar(response.data.avatar_url);
            setApiBio(response.data.bio);
        } catch (error: any) {
            console.error('Erro na requisição: ', error);
            setApiError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            userFunction();
        }
    };

    return (
        <>
            <section className="w-full bg-[#000] h-[25rem] 2xl:h-[30rem] p-4  2xl:py-10 2xl:px-64">
                <div className="flex items-center justify-center gap-x-4">
                    <FaGithub className="text-[#fff] w-14 h-14" />
                    <p className="text-[#fff] text-4xl font-semibold">
                        Perfil <span className="font-bold">GitHub</span>
                    </p>
                </div>

                <div className="2xl:flex 2xl:flex-col 2xl:items-center">
                    <div className="mt-8 relative 2xl:w-[80%]">
                        <input
                            type="text"
                            placeholder="Digite um usuário do GitHub"
                            className="w-full px-4 py-2 rounded-md bg-[#fff] text-[#000] text-base placeholder:text-[#000] placeholder:font-semibold placeholder:text-base"
                            onChange={(e) => setUser(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        <button
                            className="cursor-pointer absolute right-1 top-[50%] -translate-y-[50%] bg-[#005CFF] rounded-md px-1 py-1"
                            onClick={userFunction}
                        >
                            <CiSearch className="w-7 h-7 text-[#fff]" />
                        </button>
                    </div>

                    {hasSearched && (
                        <div className="mt-10 p-4 w-full bg-[#D9D9D9] rounded-md 2xl:justify-center">
                            {loading ? (
                                <div className="w-full mt-10 flex gap-x-4 justify-center overflow-hidden relative">
                                    <div className="w-1 h-10 bg-[#005CFF] animate-toBottom"></div>
                                    <div className="w-1 h-10 bg-[#005CFF] animate-toTop"></div>
                                    <div className="w-1 h-10 bg-[#005CFF] animate-toBottom"></div>
                                    <div className="w-1 h-10 bg-[#005CFF] animate-toTop"></div>
                                    <div className="w-1 h-10 bg-[#005CFF] animate-toBottom"></div>
                                </div>
                            ) : apiError ? (
                                <div className="w-full flex justify-center items-center mt-4">
                                    <p className="text-xs text-[#f00] font-normal 2xl:text-base">
                                        Nenhum perfil foi encontrado com esse
                                        nome de usuário. Tente novamente.
                                    </p>
                                </div>
                            ) : (
                                <div className="flex justify-center gap-x-4">
                                    <div className="w-25 h-25 rounded-full border border-[#005CFF] 2xl:w-40 2xl:h-40">
                                        <img
                                            src={apiImgAvatar}
                                            alt="Avatar do usuário"
                                            className="rounded-full"
                                        />
                                    </div>
                                    <div className="w-[50%]">
                                        <span className="text-[#005CFF] font-bold text-xl">
                                            {apiLogin}
                                        </span>
                                        <p className="font-light text-xs text-[#000] 2xl:text-base">
                                            {apiBio ||
                                                'Este Usuário não possui Biografia'}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default SectionMain;
