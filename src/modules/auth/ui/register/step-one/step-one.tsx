import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { type RegisterStepOneSchema } from "../../../models/types";
import { View } from "react-native";
import { Input, Icons, Button } from "@shared/ui";
import { registerValidators } from "../../../models/validators";
import { styles } from "./step-one.styles";
import { useRouter } from "expo-router";

export function StepOne() {
	const { handleSubmit, control } = useForm<RegisterStepOneSchema>({
		resolver: yupResolver(registerValidators.stepOne),
		mode: "onChange",
		defaultValues: {
			email: "",
			password: "",
			username: "",
		},
	});
	const router = useRouter();

	function onSubmit(data: RegisterStepOneSchema) {
		// router.back() - переходит на скрин назад(берется из Стека, если стека нету -> Ошибка)
		// router.canGoBack() - возвращает boolean, если true значит можно вернутся назад, если false - нет
		// router.dismiss(count: number) - переходит НАЗАД на COUNT экранов
		// router.dismissTo() - переходит НАЗАД в стеке на укзаанный экран(TO)
		// router.canDismiss() - возвращает boolean, если true значит можно вернутся назад, если false - нет
		// router.dismissAll() -
		// router.push() - добавляет новый экран в Stack
		// router.replace() - меняет текущий экран(удаляя его из Stack) на указанный
		// router.reload() - очищает Stack
		// router.navigate() - пытается сделать dismissTo, иначе делает push
		router.push({
			pathname: "/register/step-two",
			params: data,
		});
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
								iconLeft={<Icons.MailIcon />}
								label="Email"
								error={fieldState.error?.message}
							/>
						);
					}}
				/>
				<Controller
					name="username"
					control={control}
					render={({ field, fieldState }) => {
						return (
							<Input
								placeholder="Your username"
								inputMode="text"
								autoCapitalize="none"
								autoComplete="off"
								autoCorrect={false}
								inputContainerStyle={styles.inputContainer}
								style={styles.input}
								onChangeText={field.onChange}
								value={field.value}
								iconLeft={<Icons.UserIcon />}
								label="Username"
								error={fieldState.error?.message}
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
								error={fieldState.error?.message}
							/>
						);
					}}
				/>
			</View>

			<Button title="Continue" onPress={handleSubmit(onSubmit)} />
		</View>
	);
}
