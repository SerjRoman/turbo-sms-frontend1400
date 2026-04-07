import { createContext, PropsWithChildren, useContext, useState } from "react";
import { User } from "../models/types";

// token -> request ME
//

/*
Случаи появления токена:
1. Login
2. Registration


3. AsyncLocalStorage
*/

interface UserContextContract {
	token: string | null;
	user: User | null;
	isAuth: boolean;
	setToken: (token: string | null) => void;
	setUser: (user: User | null) => void;
}
//
export const UserContext = createContext<null | UserContextContract>(null);
// хук для того что бы обработать инвариант
// когда контекст нулл в скобочка когда не обернули приложение в провайдер
// ( Инвариант ) это свойство, величина или характеристика объекта, которая остается неизменной при определенных преобразованиях, операциях или изменениях условий.
export function useUserContext() {
	const ctx = useContext(UserContext);
	if (!ctx) throw new Error("UserContext is not inside provider");
	return ctx;
}
//
//
export function UserContextProvider(props: PropsWithChildren) {
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState<User | null>(null);
	return (
		<UserContext
			value={{
				token,
				user,
				isAuth: !!user,
				setToken,
				setUser,
			}}
			{...props}
		></UserContext>
	);
}
