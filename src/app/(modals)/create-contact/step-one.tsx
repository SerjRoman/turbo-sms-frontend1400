import { Input } from "@shared/ui/input";
import { Button } from "@shared/ui/button";
import { Text, View, StyleSheet } from "react-native";
import { Icons } from "@shared/ui/icons";
import { Image } from "expo-image";
import { COLORS, FONT_SIZE } from "@shared/constants";
import { useEffect, useState } from "react";
import { useLazyGetUserByUsernameQuery } from "@modules/contact";
import { apiMediaUrl } from "@shared/constants/api";
import { useUserContext } from "@modules/auth";
import { useRouter } from "expo-router";

export default function CreateContactStepOne() {
	const { user } = useUserContext();
	const router = useRouter();
	const [value, setValue] = useState<string>("");
	const [getUser, { data, error, reset, isSuccess, isFetching }] =
		useLazyGetUserByUsernameQuery();
	const isFoundMyself = user?.username === value;
	useEffect(() => {
		if (!value) {
			reset();
			return;
		}
		if (isFoundMyself) {
			reset();
			return;
		}
		getUser(value);
	}, [value]);
	const isNotFound = error && "status" in error && error.status === 404;
	return (
		<View style={styles.container}>
			<Input
				style={styles.input}
				labelStyle={styles.label}
				label="Username"
				inputContainerStyle={styles.inputContainer}
				iconLeft={<Icons.SearchIcon placeholder="Search..." />}
				value={value}
				onChangeText={(txt) => setValue(txt)}
				autoCapitalize="none"
			/>
			{data && isSuccess && (
				<View style={styles.userBlock}>
					<Image
						placeholder={require("@assets/default-user.png")}
						placeholderContentFit="cover"
						contentFit="cover"
						style={styles.avatar}
						source={{
							uri: data.avatar
								? `${apiMediaUrl}${data.avatar}`
								: undefined,
						}}
					/>
					<Text style={styles.username}>{data.username}</Text>
				</View>
			)}
			{isFoundMyself ? (
				<View style={styles.errorContainer}>
					<Icons.ErrorIcon />
					<Text style={styles.errorText}>
						You cannot find yourself!
					</Text>
				</View>
			) : (
				isNotFound && (
					<View style={styles.errorContainer}>
						<Icons.ErrorIcon />
						<Text style={styles.errorText}>User not found</Text>
					</View>
				)
			)}
			<Button
				title="Select"
				disabled={!isSuccess}
				isLoading={isFetching}
				onPress={() => {
					if (!data) return;
					router.push({
						pathname: "/create-contact/step-two",
						params: {
							id: data.id,
							avatar: data.avatar,
							name: data.name,
							surname: data.surname,
						},
					});
				}}
			/>
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
});
