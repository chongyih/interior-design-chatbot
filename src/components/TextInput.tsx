import IconButton from "@mui/material/IconButton"
import SendIcon from "@mui/icons-material/Send"

import { useGptMutation } from "../redux/gptApiSlice"
import { IGPTPrompt } from "../types/prompt"

const TextInput = ({
	prompt,
	setPrompt,
	setChatHistory,
	setLoadingGPT,
	setError,
}: {
	prompt: string
	setPrompt: React.Dispatch<React.SetStateAction<string>>
	setChatHistory: React.Dispatch<React.SetStateAction<IGPTPrompt[]>>
	setLoadingGPT: React.Dispatch<React.SetStateAction<boolean>>
	setError: React.Dispatch<React.SetStateAction<string>>
}) => {
	const [submitGPT] = useGptMutation()

	const sendPrompt = async (e: any) => {
		e.preventDefault()
		try {
			setPrompt("")
			setChatHistory((prev) => [
				...prev,
				{
					UserPrompt: prompt,
				},
			])

			setLoadingGPT(true)
			const resp = await submitGPT({
				prompt: prompt,
				chat_id: localStorage.getItem("chat_id"),
			})
			setLoadingGPT(false)

			if (resp.error) {
				setError(
					"Error generating Interio AI response. Please try again later."
				)
			} else {
				setChatHistory((prev) => {
					const updatedChatHistory = [...prev]
					updatedChatHistory[updatedChatHistory.length - 1].GPTPrompt =
						resp.data?.GPTPrompt
					updatedChatHistory[updatedChatHistory.length - 1].DALLEPrompts =
						resp.data?.DALLEPrompts
					return updatedChatHistory
				})
			}
		} catch (error) {
			console.error(error)
			setError("Error generating Interio AI response. Please try again later.")
		}
	}

	return (
		<div className="absolute bottom-0 right-0 h-[85px] w-full flex items-center justify-center z-10">
			<form
				onSubmit={sendPrompt}
				className="bg-slate-600 w-full h-1/2 ml-2 mr-4 rounded-md focus:outline-0 flex items-center justify-center"
			>
				<input
					type="text"
					id="prompt"
					className="bg-slate-600 w-full h-full p-4 rounded-md focus:outline-0"
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
				/>
				<IconButton
					className="hover:border-2 hover:!bg-gray-900 !absolute right-6"
					type="submit"
				>
					<SendIcon htmlColor="white" />
				</IconButton>
			</form>
		</div>
	)
}

export default TextInput
