import { useUserContext } from "@modules/auth";
import { Redirect } from "expo-router";

export default function Index() {
	const { isAuth } = useUserContext();

	if (isAuth) {
		return <Redirect href={"/chats"} />;
	}

	return <Redirect href={"/login"} />;
}
