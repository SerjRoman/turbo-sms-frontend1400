import { Header } from "@shared/ui/header";
import { Images } from "@shared/ui/images";
import { Icons } from "@shared/ui/icons";
import { Input } from "@shared/ui/input";
import { COLORS } from "@shared/constants";


export function HeaderContacts() {
    return (
		<Header
			left={
				<Images.LogoImage
					style={{ width: 40, height: 40 }}
				/>
			}
			title="Contacts"
			right={<Icons.PlusIcon />}
			bottom={
				<Input
					iconLeft={<Icons.SearchIcon />}
					placeholder="Search"
					inputContainerStyle={{
						backgroundColor: COLORS.greyBacgkround,
						marginHorizontal: 5,
						height: 40,
						borderWidth: 1,
						borderColor: COLORS.grey,
					}}
				/>
			}
		/>
	);
}