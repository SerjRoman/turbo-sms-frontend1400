import { COLORS, FONT_SIZE } from "@shared/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        gap: 5,
        padding: 5
    },
    avatar: {
        backgroundColor: COLORS.brownPrimary,
        width: 50,
        height: 50,
        borderRadius: 25
    },
    textBlock: {
        flex: 1,
        justifyContent: "space-between"
    },
    name: {
        fontSize: FONT_SIZE.titleLarge
    },
    message: {
        fontSize: FONT_SIZE.titleMedium,
        color: COLORS.grey
    },
    time: {
        fontSize: FONT_SIZE.titleMedium
    }
})