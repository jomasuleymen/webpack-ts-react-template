import { Layout } from "antd";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Header from "@components/Header/Header";

import "antd/dist/reset.css";
import "@styles/global.scss";

const App = () => {
	return (
		<>
			<Layout className="layout">
				<Header />
				<Layout.Content className="width-wrapper">
					<Suspense fallback={<div>Loading...</div>}>
						<Routes>
							<Route path="/" element={<Navigate to="/playlist" replace={true} />} />
							<Route path="/playlist" element={<div>Playlist</div>} />
							<Route path="/admin" element={<div>Admin</div>} />
							<Route path="*" element={<p>There's nothing here!</p>} />
						</Routes>
					</Suspense>
				</Layout.Content>
			</Layout>
		</>
	);
};

export default App;
