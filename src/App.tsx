import { useState, useEffect } from "react"
import { useAlert } from "react-alert"
import Menu from "./components/Menu"
import ChatWindow from "./components/ChatWindow"
import { IGPTPrompt } from "./types/prompt"
import TextInput from "./components/TextInput"

function App() {
	const [prompt, setPrompt] = useState<string>("")
	const [loadingGPT, setLoadingGPT] = useState<boolean>(false)
	const [error, setError] = useState<string>("")
	const [chatHistory, setChatHistory] = useState<IGPTPrompt[]>([])
	const [baseImage, setBaseImage] = useState("")

	const alert = useAlert()

	useEffect(() => {
		error && alert.show(error, { type: "error" })
		setError("")
	}, [error])

	return (
		<main className="min-h-screen h-full flex text-white overflow-hidden">
			<Menu baseImage={baseImage} />
			<div className="ml-60 w-full relative">
				<ChatWindow
					prompt={prompt}
					setBaseImage={setBaseImage}
					chatHistory={chatHistory}
					setChatHistory={setChatHistory}
					loadingGPT={loadingGPT}
				/>
				<TextInput
					prompt={prompt}
					setPrompt={setPrompt}
					setChatHistory={setChatHistory}
					setLoadingGPT={setLoadingGPT}
					setError={setError}
				/>
			</div>
		</main>
	)
}

export default App
