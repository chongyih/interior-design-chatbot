import { useRef, useState } from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import ImageGallery from "react-image-gallery"

import { IGPTPrompt } from "../types/prompt"
import { useDalleMutation } from "../redux/dalleApiSlice"

const ChatWindow = ({
	prompt,
	chatHistory,
	setChatHistory,
	loadingGPT,
	setBaseImage,
}: {
	prompt: string
	chatHistory: IGPTPrompt[]
	setChatHistory: React.Dispatch<React.SetStateAction<IGPTPrompt[]>>
	loadingGPT: boolean
	setBaseImage: React.Dispatch<React.SetStateAction<string>>
}) => {
	const [loadingDALLE, setLoadingDALLE] = useState<boolean>(false)
	const [loadingDALLEIndex, setLoadingDALLEIndex] = useState<number>(-1)
	const [error, setError] = useState<string>("")
	const galleryRef = useRef<ImageGallery>()

	const [submitDALLE] = useDalleMutation()

	const selectBaseImage = (index: number): void => {
		setBaseImage(
			chatHistory[index].ImageB64![galleryRef?.current?.getCurrentIndex()!]
		)
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
						? (updatedChatHistory[index].ImageB64 = [])
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
	}

	return (
		<div className="bg-gray-800 h-screen w-full flex flex-col relative">
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
							{loadingGPT && index === chatHistory.length - 1 && (
								<>
									<div className="flex items-center mb-1">
										<div className="bg-neutral-900 w-8 h-8 rounded-full mr-2" />
										<p className="text-sm">Interio AI</p>
									</div>
									<div className="bg-gray-700 rounded-lg p-3">
										<pre>Generating response... Please wait a few seconds.</pre>
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
							<div className="">
								{chat.ImageB64 && chat.ImageB64[0] && (
									<ImageGallery
										//@ts-ignore
										ref={galleryRef}
										onClick={(e) => selectBaseImage(index)}
										items={chat.ImageB64.map((image) => {
											return {
												original: `data:img/png;base64,${image}`,
												thumbnail: `data:img/png;base64,${image}`,
											}
										})}
									/>
								)}
							</div>
						</div>
					</div>
				))}
			</ScrollToBottom>
		</div>
	)
}

export default ChatWindow
