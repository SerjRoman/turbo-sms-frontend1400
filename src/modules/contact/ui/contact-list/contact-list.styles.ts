import { COLORS, FONT_SIZE } from "@shared/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 5,
        borderBottomColor: COLORS.grey,
        borderBottomWidth: 1,
        gap: 5,
    },
    textContainer: {
        flex: 1,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    name: {
        fontSize: FONT_SIZE.titleLarge,
        fontWeight: "500",
    },
})