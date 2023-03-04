import { useState, useEffect } from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import IconButton from "@mui/material/IconButton"
import SendIcon from "@mui/icons-material/Send"
import { useGptMutation } from "./redux/gptApiSlice"
import { useDalleMutation } from "./redux/dalleApiSlice"
import { useAlert } from "react-alert"

interface IGPTPrompt {
	UserPrompt: string
	GPTPrompt?: string
	DALLEPrompts?: string[]
	ImageLinks?: string[]
}

function App() {
	const [prompt, setPrompt] = useState<string>("")
	const [loadingGPT, setLoadingGPT] = useState<boolean>(false)
	const [loadingDALLE, setLoadingDALLE] = useState<boolean>(false)
	const [loadingDALLEIndex, setLoadingDALLEIndex] = useState<number>(-1)
	const [error, setError] = useState<string>("")
	const [chatHistory, setChatHistory] = useState<IGPTPrompt[]>([])

	const [submitGPT] = useGptMutation()
	const [submitDALLE] = useDalleMutation()
	const alert = useAlert()

	useEffect(() => {
		error && alert.show(error, { type: "error" })
		setError("")
	}, [error])

	const sendPrompt = async () => {
		try {
			setChatHistory((prev) => [
				...prev,
				{
					UserPrompt: prompt,
				},
			])

			setLoadingGPT(true)
			const { data } = await submitGPT({
				prompt: prompt,
				chat_id: "78572413-8f69-4e3e-a196-fc808209b655",
			})
			setLoadingGPT(false)

			setChatHistory((prev) => {
				const updatedChatHistory = [...prev]
				updatedChatHistory[updatedChatHistory.length - 1].GPTPrompt =
					data?.GPTPrompt
				updatedChatHistory[updatedChatHistory.length - 1].DALLEPrompts =
					data?.DALLEPrompts
				return updatedChatHistory
			})
		} catch (error) {
			console.error(error)
			setError("Error generating Interio AI response. Please try again later.")
		}
	}

	const sendDALLEPrompt = async (index: number, prompt: string) => {
		const MAX_RETRIES = 5
		const INITIAL_DELAY = 1000 // in milliseconds
		let retryCount = 0

		const sendRequest = async (): Promise<any> => {
			try {
				setLoadingDALLE(true)
				setLoadingDALLEIndex(index)
				setChatHistory((prev) => {
					const updatedChatHistory = [...prev]
					updatedChatHistory[index]
						? (updatedChatHistory[index].ImageLinks = [])
						: null
					return updatedChatHistory
				})
				const { data } = await submitDALLE({ prompt })
				return data
			} catch (error) {
				console.error(error)
				if (retryCount >= MAX_RETRIES) {
					setError("Error generating DALL-E image. Please try again later.")
					throw new Error("Maximum number of retries reached")
				}
				const delay = INITIAL_DELAY * Math.pow(2, retryCount)
				retryCount++
				console.log(`Retrying in ${delay}ms`)
				await new Promise((resolve) => setTimeout(resolve, delay))
				return await sendRequest()
			}
		}

		const imageLink = await sendRequest()
		setLoadingDALLE(false)
		setLoadingDALLEIndex(-1)
		imageLink &&
			setChatHistory((prev) => {
				const updatedChatHistory = [...prev]
				updatedChatHistory[index].ImageLinks = imageLink
				return updatedChatHistory
			})
		setPrompt("")
	}

	return (
		<main className="min-h-screen h-full flex text-white overflow-hidden">
			<div className="bg-neutral-900 w-60 h-screen fixed">Menu</div>
			<div className="bg-gray-800 ml-60 h-screen w-full flex flex-col relative">
				<ScrollToBottom
					followButtonClassName="bg-down-arrow bg-[length:75%_75%] bg-center mb-[45px] bg-no-repeat bg-white bg-opacity-0 hover:bg-opacity-100"
					className="h-[97%] w-full"
					scrollViewClassName="scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 px-10 py-4"
				>
					{chatHistory.map((chat, index) => (
						<div key={index} className="flex flex-col mb-4">
							<div className="flex flex-col mb-2">
								<div className="flex items-center mb-1 justify-end">
									<div className="bg-neutral-900 w-8 h-8 rounded-full mr-2" />
									<p className="text-sm">User</p>
								</div>
								<div className="bg-gray-700 rounded-lg p-4">
									<pre className="whitespace-pre-wrap text-left">
										{chat.UserPrompt}
									</pre>
								</div>
								{chat.GPTPrompt && (
									<>
										<div className="flex items-center mb-1">
											<div className="bg-neutral-900 w-8 h-8 rounded-full mr-2" />
											<p className="text-sm">Interio AI</p>
										</div>
										<div className="bg-gray-700 rounded-lg p-4">
											<pre className="whitespace-pre-wrap text-left">
												{chat.GPTPrompt}
											</pre>
										</div>
									</>
								)}
								{loadingGPT && (
									<>
										<div className="flex items-center mb-1">
											<div className="bg-neutral-900 w-8 h-8 rounded-full mr-2" />
											<p className="text-sm">Interio AI</p>
										</div>
										<div className="bg-gray-700 rounded-lg p-3">
											<pre>
												Generating response... Please wait a few seconds.
											</pre>
										</div>
									</>
								)}
								{chat.DALLEPrompts && (
									<div className="bg-gray-700 rounded-lg p-3">
										<pre>
											Click on one of the prompts to and I will generate some
											images!
										</pre>
										{
											<div className="p-2">
												<button
													onClick={(e) => sendDALLEPrompt(index, prompt)}
													className="hover:bg-gray-600 rounded-lg p-1"
												>
													<pre className="whitespace-pre-wrap text-left">
														{`1.`} {chat.UserPrompt}
													</pre>
												</button>
											</div>
										}
										{chat.DALLEPrompts?.map((dalle, dalleIndex) => (
											<div key={index} className="p-2">
												<button
													onClick={(e) => sendDALLEPrompt(index, dalle)}
													className="hover:bg-gray-600 rounded-lg p-1"
												>
													<pre className="whitespace-pre-wrap text-left">
														{`${dalleIndex + 2}.`} {dalle}
													</pre>
												</button>
											</div>
										))}
									</div>
								)}
								{loadingDALLE && index === loadingDALLEIndex && (
									<div className="bg-gray-700 rounded-lg p-3">
										<pre>Generating images... Please wait a few seconds.</pre>
									</div>
								)}
								<div className="grid grid-cols-3 gap-4">
									{chat.ImageLinks &&
										chat.ImageLinks.map((imgSrc, index) => (
											<img
												key={index}
												src={imgSrc}
												alt={`Generated Image ${index + 1}`}
												className=""
											/>
										))}
								</div>
							</div>
						</div>
					))}
				</ScrollToBottom>
				<div className="absolute bottom-0 right-0 h-[85px] w-full flex items-center justify-center z-10">
					<input
						type="text"
						id="prompt"
						className="bg-slate-600 w-full h-1/2 ml-2 mr-4 p-3 rounded-md focus:outline-0"
						value={prompt}
						onChange={(e) => setPrompt(e.target.value)}
					/>
					<IconButton
						className="hover:border-2 hover:!bg-gray-900 !absolute right-6"
						onClick={sendPrompt}
					>
						<SendIcon htmlColor="white" />
					</IconButton>
				</div>
			</div>
		</main>
	)
}

export default App
