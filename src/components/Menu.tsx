import ClearIcon from "@mui/icons-material/Clear"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import IconButton from "@mui/material/IconButton"
import { useEffect } from "react"
import { useAlert } from "react-alert"
import { useDeleteChatMutation } from "../redux/chatApiSlice"
import { useDeleteBaseMutation } from "../redux/imageApiSlice"
import { IGPTPrompt } from "../types/prompt"
import logo from "../assets/logo_with_text.png"

const Menu = ({
	baseImage,
	setBaseImage,
	chatHistory,
	setChatHistory,
}: {
	baseImage: string
	setBaseImage: React.Dispatch<React.SetStateAction<string>>
	chatHistory: IGPTPrompt[]
	setChatHistory: React.Dispatch<React.SetStateAction<IGPTPrompt[]>>
}) => {
	const [deleteChat] = useDeleteChatMutation()
	const [deleteBaseImage] = useDeleteBaseMutation()
	const alert = useAlert()

	const handleDeleteChat = async () => {
		const resp = await deleteChat({ chat_id: localStorage.getItem("chat_id") })

		if (
			(baseImage && chatHistory.length === 0) ||
			chatHistory[0].GPTPrompt !==
				"Hi there! I'm Interio AI, your interior design assistant. Tell me about your dream home and I'll help you design it!"
		)
			setChatHistory((prev) => [
				{
					GPTPrompt:
						"Hi there! I'm Interio AI, your interior design assistant. Tell me about your dream home and I'll help you design it!",
				},
			])
		else setChatHistory([])
	}

	const handleDeleteBaseImage = async () => {
		const resp = await deleteBaseImage(localStorage.getItem("chat_id"))

		if (resp.error) {
			alert.error("Error deleting base image. Please try again later.")
		} else {
			alert.success("Base image deleted.")
			setBaseImage("")
		}
	}

	return (
		<div className="bg-neutral-900 w-72 h-screen flex items-center justify-center flex-col">
			<img className="fixed top-[-35px]" src={logo} />
			{baseImage && (
				<div className="w-60 h-60 flex flex-col items-center justify-center">
					<div className="flex flex-row mr-2">
						<IconButton onClick={handleDeleteBaseImage}>
							<ClearIcon htmlColor="#E80C1f" />
						</IconButton>
						<pre className="mt-[0.45rem]">Base Image</pre>
					</div>
					<img
						className={`w-60 h-60`}
						alt="Base Image"
						src={baseImage}
						onClick={() => null}
					/>
				</div>
			)}
			<IconButton
				className="!bg-neutral-800 text-white !rounded-md px-4 py-2 !fixed bottom-3"
				type="button"
				onClick={handleDeleteChat}
			>
				<DeleteForeverIcon htmlColor="white" />
				<span className="text-white text-base ml-2">New Conversation</span>
			</IconButton>
		</div>
	)
}

export default Menu
