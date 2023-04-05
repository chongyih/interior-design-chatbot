import { useState, useEffect } from "react"
import { useAlert } from "react-alert"
import Menu from "../components/Menu"
import ChatWindow from "../components/ChatWindow"
import { IGPTPrompt } from "../types/prompt"
import TextInput from "../components/TextInput"
import {
	useCreateChatMutation,
	useGetChatHistoryMutation,
	useGetChatListMutation,
} from "../redux/chatApiSlice"
import {
	useGetBaseMutation,
	useUploadBaseMutation,
} from "../redux/imageApiSlice"
import FileUpload from "../components/FileUpload"

const ChatBot = () => {
	const [prompt, setPrompt] = useState<string>("")
	const [loadingGPT, setLoadingGPT] = useState<boolean>(false)
	const [error, setError] = useState<string>("")
	const [chatHistory, setChatHistory] = useState<IGPTPrompt[]>([])
	const [baseImage, setBaseImage] = useState("")

	const alert = useAlert()
	const [getChatList] = useGetChatListMutation()
	const [getChatHistory] = useGetChatHistoryMutation()
	const [createChat] = useCreateChatMutation()
	const [uploadBaseImage] = useUploadBaseMutation()
	const [getBaseImage] = useGetBaseMutation()

	useEffect(() => {
		const retrieveBaseImage = async () => {
			const resp = await getBaseImage(localStorage.getItem("chat_id"))

			if (resp.error) {
				alert.error("Error retrieving base image. Please try again later.")
				return
			}

			if (resp.data.imageLink && chatHistory.length === 0)
				setChatHistory((prev) => [
					{
						GPTPrompt:
							"Hi there! I'm Interio AI, your interior design assistant. Tell me about your dream home and I'll help you design it!",
					},
				])

			setBaseImage(resp.data.imageLink)
		}

		localStorage.getItem("chat_id") ? retrieveBaseImage() : setBaseImage("")
	}, [])

	useEffect(() => {
		// retrieve list of chat id from endpoint
		const retrieveChatList = async () => {
			const resp = await getChatList({
				user_id: localStorage.getItem("user_id"),
			})

			if (resp.error) {
				setError("Error retrieving chat list. Please try again later.")
			}

			if (resp.data.length === 0) {
				const resp = await createChat({
					user_id: localStorage.getItem("user_id"),
				})

				localStorage.setItem("chat_id", resp.data)
				if (resp.error) {
					setError("Error retrieving chat list. Please try again later.")
				}
			}
		}

		const retrieveChatHistory = async () => {
			const resp = await getChatHistory({
				chat_id: localStorage.getItem("chat_id"),
			})
			if (resp.data.length !== 0) setChatHistory(resp.data)
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
			<Menu
				baseImage={baseImage}
				chatHistory={chatHistory}
				setChatHistory={setChatHistory}
				setBaseImage={setBaseImage}
			/>
			<div className="w-full relative">
				{chatHistory.length == 0 && !baseImage ? (
					<FileUpload
						setChatHistory={setChatHistory}
						setBaseImage={setBaseImage}
					/>
				) : (
					<ChatWindow
						prompt={prompt}
						baseImage={baseImage}
						setBaseImage={setBaseImage}
						chatHistory={chatHistory}
						setChatHistory={setChatHistory}
						loadingGPT={loadingGPT}
					/>
				)}
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
