import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { ButtonProps } from "./button.types";
import { styles } from "./button.styles";

export function Button(props: ButtonProps) {
	const { title, style, titleStyle, disabled, isLoading, ...restProps } =
		props;

	return (
		<TouchableOpacity
			style={[
				styles.button,
				(disabled || isLoading) && styles.disabled,
				style,
			]}
			disabled={disabled || isLoading}
			{...restProps}
		>
			{isLoading ? (
				<ActivityIndicator size={"small"} />
			) : (
				<Text
					style={[
						styles.text,
						disabled && styles.disabledText,
						titleStyle,
					]}
				>
					{title}
				</Text>
			)}
		</TouchableOpacity>
	);
}
