import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
	RegisterStepOneSchema,
	type RegisterStepTwoSchema,
} from "../../../models/types";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { Input, Icons, Button } from "@shared/ui";
import { registerValidators } from "../../../models/validators";
import { styles } from "./step-two.styles";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { useRegisterMutation } from "../../../api";
import { pickImage } from "@shared/tools/pick-image";
import { useUserContext } from "../../../context/user.context";

export function StepTwo() {
	const { setToken } = useUserContext();
	const [registerMutation] = useRegisterMutation();
	const params = useLocalSearchParams<RegisterStepOneSchema>();
	const router = useRouter();

	const { handleSubmit, control } = useForm({
		// Если в валидации есть опциональные поля, то yupResolver будет криво с ними работать,
		// поэтому НЕ указываем типизацию generic`ом для useForm
		resolver: yupResolver(registerValidators.stepTwo),
		mode: "onChange",
	});

	async function onSubmit(data: RegisterStepTwoSchema) {
		const finalData = {
			...params,
			...data,
		};
		try {
			const response = await registerMutation(finalData).unwrap();
			setToken(response.token);
			console.log(response.token);
		} catch (error) {
			console.log(error);
		}
	}

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
								label="Name"
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
								label="Surname"
							/>
						);
					}}
				/>
				<Controller
					name="avatar"
					control={control}
					render={({ field, fieldState }) => {
						return (
							<View style={styles.selectAvatarBlock}>
								<TouchableOpacity
									style={styles.selectAvatarButton}
									onPress={async () => {
										const assets = await pickImage(false, {
											selectionLimit: 1,
											allowsMultipleSelection: false,
											allowsEditing: false,
											mediaTypes: ["images"],
										});
										if (assets.status === "error") {
											Alert.alert(
												"Error occured",
												assets.message,
											);
											return;
										}
										const image = assets.assets[0];
										field.onChange(image.uri);
									}}
								>
									<Image
										style={styles.selectAvatarImage}
										placeholder={require("@assets/default-user.png")}
										placeholderContentFit="cover"
										contentFit="cover"
										source={{
											uri: field.value || undefined,
										}}
									/>
									{!field.value && (
										<View style={styles.iconContainer}>
											<Icons.SearchIcon
												width="100%"
												height="100%"
											/>
										</View>
									)}
								</TouchableOpacity>
								<Text style={styles.selectAvatarLabel}>
									Select avatar
								</Text>
							</View>
						);
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
