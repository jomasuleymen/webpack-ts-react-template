import { Layout } from "antd";
import { NavLink } from "react-router-dom";

const navigations = [
	{ name: "Плейлист", href: "/playlist", key: "playlist" },
	{ name: "Админ панель", href: "/admin", key: "admin" },
];

function MainHeader() {
	return (
		<Layout.Header className="main-header">
			<div className="width-wrapper" style={{ display: "flex", alignItems: "center" }}>
				{navigations.map((item) => (
					<NavLink
						to={{ pathname: item.href }}
						key={item.key}
						className={({ isActive }) => (isActive ? "selected" : undefined)}
					>
						{item.name}
					</NavLink>
				))}
			</div>
		</Layout.Header>
	);
}

export default MainHeader;
