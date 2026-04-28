import { COLORS, FONT_SIZE } from "@shared/constants";
import { Icons } from "@shared/ui/icons";
import { Input } from "@shared/ui/input";
import { useLocalSearchParams } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { View, StyleSheet, TouchableOpacity, Alert, Text } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { createContactSchema, CreateContactT } from "@modules/contact";
import { Button } from "@shared/ui/button";
import { pickImage } from "@shared/tools/pick-image";
import { Image } from "expo-image";
import { apiMediaUrl } from "@shared/constants/api";

export default function CreateContactSteTwo() {
	const params = useLocalSearchParams<{
		id: string;
		name: string;
		surname: string;
		avatar: string;
	}>();

	const { control, handleSubmit } = useForm({
		resolver: yupResolver(createContactSchema),
		defaultValues: {
			name: params.name,
			surname: params.surname,
			avatar: params.avatar,
		},
	});
	async function onSubmit(data: CreateContactT) {
		console.log(data);
	}

	return (
		<View>
			<Controller
				control={control}
				name="name"
				render={({ field, fieldState }) => (
					<Input
						style={styles.input}
						labelStyle={styles.label}
						label="Contact name"
						inputContainerStyle={styles.inputContainer}
						value={field.value}
						onChangeText={field.onChange}
					/>
				)}
			/>

			<Controller
				control={control}
				name="surname"
				render={({ field, fieldState }) => (
					<Input
						style={styles.input}
						labelStyle={styles.label}
						label="Contact surname"
						inputContainerStyle={styles.inputContainer}
						value={field.value}
						onChangeText={field.onChange}
					/>
				)}
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
									placeholderContentFit="cover"
									contentFit="cover"
									source={{
										uri: field.value?.includes("file:")
											? field.value
											: `${apiMediaUrl}${field.value}`,
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
			<Button title="Add contact" onPress={handleSubmit(onSubmit)} />
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		paddingVertical: 20,
		paddingHorizontal: 10,
		flex: 1,
		gap: 30,
	},
	inputContainer: {
		width: "100%",
		height: 50,
	},
	userBlock: {
		padding: 20,
		gap: 5,
		borderBottomWidth: 1,
		borderColor: COLORS.grey,
	},
	avatar: {
		width: 150,
		height: 150,
		borderRadius: 25,
	},
	label: {
		fontSize: FONT_SIZE.titleLarge,
	},
	input: {
		fontSize: FONT_SIZE.titleMedium,
	},
	username: {
		textAlign: "center",
		fontSize: FONT_SIZE.titleLarge,
	},
	errorContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	errorText: {
		color: COLORS.error,
	},

	selectAvatarBlock: {
		alignItems: "center",
		gap: 5,
	},
	selectAvatarButton: {
		width: 75,
		height: 75,
		alignItems: "center",
		justifyContent: "center",
	},
	selectAvatarImage: {
		borderRadius: 25,
		width: "100%",
		height: "100%",
	},
	selectAvatarLabel: {
		fontSize: FONT_SIZE.titleLarge,
	},
	iconContainer: {
		position: "absolute",
		left: "50%",
		top: "50%",
		transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
		zIndex: 1,
		width: 30,
		height: 30,
	},
});
