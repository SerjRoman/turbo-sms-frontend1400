import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { type RegisterStepTwoSchema } from "../../../models/types";
import { Text, TouchableOpacity, View } from "react-native";
import { Input, ICONS, Button } from "@shared/ui";
import { registerValidators } from "../../../models/validators";
import { styles } from "./step-two.styles";
import { useLocalSearchParams, useRouter } from "expo-router";

export function StepTwo() {
	const params = useLocalSearchParams();
	const { handleSubmit, control } = useForm({
		// Если в валидации есть опциональные поля, то yupResolver будет криво с ними работать,
		// поэтому НЕ указываем типизацию generic`ом для useForm
		resolver: yupResolver(registerValidators.stepTwo),
		mode: "onChange",
	});
	function onSubmit(data: RegisterStepTwoSchema) {
		const finalData = {
			...params,
			...data,
		};
		console.log(finalData);
	}
	const router = useRouter();

	return (
		<View style={styles.container}>
			<View style={styles.formFields}>
				<Controller
					name="name"
					control={control}
					render={({ field, fieldState }) => {
						return (
							<Input
								placeholder="Your name"
								inputMode="text"
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
					name="surname"
					control={control}
					render={({ field, fieldState }) => {
						return (
							<Input
								placeholder="Your surname"
								inputMode="text"
								autoCapitalize="none"
								autoComplete="off"
								autoCorrect={false}
								inputContainerStyle={styles.inputContainer}
								style={styles.input}
								onChangeText={field.onChange}
								value={field.value}
								iconLeft={<ICONS.MailIcon />}
								label="Username"
							/>
						);
					}}
				/>
				<Controller
					name="avatar"
					control={control}
					render={({ field, fieldState }) => {
						return <View></View>;
					}}
				/>
			</View>
			<TouchableOpacity
				onPress={() => {
					if (router.canGoBack()) router.back();
				}}
			>
				<Text>Go back to Step One</Text>
			</TouchableOpacity>
			<Button title="Register" onPress={handleSubmit(onSubmit)} />
		</View>
	);
}
