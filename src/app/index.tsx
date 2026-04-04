import { useAddPostMutation, useGetPostsQuery } from "@shared/api/base-api";
import { Button } from "@shared/ui";
import { Redirect } from "expo-router";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
	const { data, isFetching } = useGetPostsQuery();
	const [addPost] = useAddPostMutation();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Button
				title="KNOPKA"
				onPress={async () => {
					const post = await addPost({
						body: "Hello world!!!!",
						userId: 5,
						title: "HEloo POST",
					}).unwrap();
					console.log(post);
				}}
			/>
			<ScrollView>
				{data?.map((post) => (
					<View>
						<Text>ID: {post.id}</Text>
						<Text>Content: {post.body}</Text>
					</View>
				))}
			</ScrollView>
		</SafeAreaView>
	);
}
