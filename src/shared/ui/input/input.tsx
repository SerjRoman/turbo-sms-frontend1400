import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { InputPasswordProps, InputProps } from "./input.types";
import { ICONS } from "../icons";
import { styles } from "./input.styles";
import { useState } from "react";

export function Input(props: InputProps) {
	const {
		iconLeft,
		iconRight,
		label,
		labelStyle,
		inputContainerStyle,
		error,
		style,
		...restProps
	} = props;
	return (
		<View>
			{label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
			<View style={[styles.inputContainer, inputContainerStyle]}>
				{iconLeft}
				<TextInput style={[styles.input, style]} {...restProps} />
				{iconRight}
			</View>
			{error && (
				<View style={styles.errorContainer}>
					<ICONS.ErrorIcon
						width={16}
						height={16}
						viewBox="0 0 16 16"
					/>
					<Text style={styles.errorText}>{error}</Text>
				</View>
			)}
		</View>
	);
}

function Password(props: InputPasswordProps) {
	const [isHidden, setIsHidden] = useState<boolean>(true);

	const EyeIcon = isHidden ? (
		<ICONS.EyeClosedIcon width={32} height={32} viewBox="0 0 32 32" />
	) : (
		<ICONS.EyeOpenIcon width={32} height={32} viewBox="0 0 32 32" />
	);

	function toggleVisibility() {
		setIsHidden(!isHidden);
	}
	return (
		<Input
			{...props}
			iconLeft={<ICONS.KeyIcon />}
			iconRight={
				<TouchableOpacity onPress={toggleVisibility}>
					{EyeIcon}
				</TouchableOpacity>
			}
			secureTextEntry={isHidden}
		/>
	);
}
Input.Password = Password;
