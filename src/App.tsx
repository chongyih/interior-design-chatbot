import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ChatBot from "./containers/ChatBot"
import FirstLogin from "./containers/FirstLogin"

function App() {
	return (
		<Router>
			<Routes>
				<Route element={<FirstLogin />}>
					<Route path="/">
						<Route index element={<ChatBot />} />
					</Route>
				</Route>
			</Routes>
		</Router>
	)
}

export default App
