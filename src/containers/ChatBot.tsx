import { useState, useEffect } from "react"
import { useAlert } from "react-alert"
import Menu from "../components/Menu"
import ChatWindow from "../components/ChatWindow"
import { IGPTPrompt } from "../types/prompt"
import TextInput from "../components/TextInput"
import {
	useGetChatHistoryMutation,
	useGetChatListMutation,
} from "../redux/chatApiSlice"

const ChatBot = () => {
	const [prompt, setPrompt] = useState<string>("")
	const [loadingGPT, setLoadingGPT] = useState<boolean>(false)
	const [error, setError] = useState<string>("")
	const [chatHistory, setChatHistory] = useState<IGPTPrompt[]>([])
	const [baseImage, setBaseImage] = useState("")

	const alert = useAlert()
	const [getChatList] = useGetChatListMutation()
	const [getChatHistory] = useGetChatHistoryMutation()

	useEffect(() => {
		// retrieve list of chat id from endpoint
		const retrieveChatList = async () => {
			const resp = await getChatList({
				user_id: localStorage.getItem("user_id"),
			})

			localStorage.setItem("chat_id", resp.data[0])
			if (resp.error) {
				setError("Error retrieving chat list. Please try again later.")
			}
		}

		const retrieveChatHistory = async () => {
			const resp = await getChatHistory({
				chat_id: localStorage.getItem("chat_id"),
			})
			setChatHistory(resp.data)
		}

		retrieveChatList()
		retrieveChatHistory()
	}, [])

	useEffect(() => {
		error && alert.show(error, { type: "error" })
		setError("")
	}, [error])

	return (
		<main className="min-h-screen h-full flex text-white overflow-hidden">
			{/* <Menu baseImage={baseImage} /> */}
			<div className="w-full relative">
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

export default ChatBot
