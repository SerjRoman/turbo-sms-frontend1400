import { View } from "react-native";
import { styles } from "./login-form.styles";
import { Button, ICONS, Input } from "@shared/ui";
import { Controller, useForm } from "react-hook-form";
import type { LoginForm } from "./login.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidator } from "../../models/lib/login.valdation";

export function LoginForm() {
	const { handleSubmit, control } = useForm<LoginForm>({
		resolver: yupResolver(loginValidator),
		mode: "onChange",
	});
	function onSubmit(data: LoginForm) {
		console.log(data);
	}

	return (
		<View style={styles.container}>
			<View style={styles.formFields}>
				<Controller
					name="email"
					control={control}
					render={({ field, fieldState }) => {
						return (
							<Input
								placeholder="Your email"
								inputMode="email"
								autoCapitalize="none"
								autoComplete="off"
								autoCorrect={false}
								inputContainerStyle={styles.inputContainer}
								style={styles.input}
								onChangeText={field.onChange}
								value={field.value}
								iconLeft={<ICONS.MailIcon />}
								label="Email"
							/>
						);
					}}
				/>
				<Controller
					name="password"
					control={control}
					render={({ field, fieldState }) => {
						return (
							<Input.Password
								placeholder="Your password"
								inputMode="text"
								autoCapitalize="none"
								autoComplete="off"
								autoCorrect={false}
								inputContainerStyle={styles.inputContainer}
								style={styles.input}
								label="Password"
								onChangeText={field.onChange}
								value={field.value}
							/>
						);
					}}
				/>
			</View>

			<Button title="Login" onPress={handleSubmit(onSubmit)} />
		</View>
	);
}
