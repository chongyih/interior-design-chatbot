import { useRef, useState } from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import ImageGallery from "react-image-gallery"

import { IGPTPrompt } from "../types/prompt"
import {
	useDalleMutation,
	useEditBaseMutation,
	useUploadBaseMutation,
} from "../redux/imageApiSlice"

import logo from "../assets/logo.png"
import user from "../assets/user.png"
import { useAlert } from "react-alert"

const ChatWindow = ({
	prompt,
	chatHistory,
	setChatHistory,
	loadingGPT,
	baseImage,
	setBaseImage,
}: {
	prompt: string
	chatHistory: IGPTPrompt[]
	setChatHistory: React.Dispatch<React.SetStateAction<IGPTPrompt[]>>
	loadingGPT: boolean
	baseImage: string
	setBaseImage: React.Dispatch<React.SetStateAction<string>>
}) => {
	const [loadingDALLE, setLoadingDALLE] = useState<boolean>(false)
	const [loadingDALLEIndex, setLoadingDALLEIndex] = useState<number>(-1)
	const [error, setError] = useState<string>("")
	const galleryRef = useRef<ImageGallery>()

	const alert = useAlert()
	const [submitDALLE] = useDalleMutation()
	const [submitControlNet] = useEditBaseMutation()
	const [uploadBaseImage] = useUploadBaseMutation()

	const selectBaseImage = async (index: number): Promise<void> => {
		const oldBaseImage = baseImage
		setBaseImage("")
		const resp = await uploadBaseImage({
			chat_id: localStorage.getItem("chat_id") || "",
			image:
				chatHistory[index].ImageB64![galleryRef?.current?.getCurrentIndex()!],
		})

		if (resp.error) {
			alert.error("Error uploading base image. Please try again later.")
			setBaseImage(oldBaseImage)
			return
		}
		setBaseImage(resp.data.imageLink)
	}

	const sendDALLEPrompt = async (e: any, index: number, prompt: string) => {
		e.preventDefault()

		const MAX_RETRIES = 5
		const INITIAL_DELAY = 1000 // in milliseconds
		let retryCount = 0

		const sendRequest = async (): Promise<any> => {
			try {
				setLoadingDALLE(true)
				setLoadingDALLEIndex(index)
				setChatHistory((prev) => {
					const updatedChatHistory = prev.map((item, i) => {
						if (i === index) {
							return { ...item, ImageB64: [] }
						}
						return item
					})
					return updatedChatHistory
				})
				let resp
				if (baseImage) {
					resp = await submitControlNet({ prompt, baseImage })
				} else resp = await submitDALLE({ prompt })

				if (resp.error) {
					alert.error("Error generating image. Please try again later.")
					return
				}
				return resp.data
			} catch (error) {
				console.error(error)
				if (!baseImage) {
					alert.error("Error generating image. Please try again later.")
					return
				}

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

		const ImageB64 = await sendRequest()
		setLoadingDALLE(false)
		setLoadingDALLEIndex(-1)
		ImageB64 &&
			setChatHistory((prev) => {
				const updatedChatHistory = prev.map((item, i) => {
					if (i === index) {
						return { ...item, ImageB64: ImageB64 }
					}
					return item
				})
				return updatedChatHistory
			})
	}

	return (
		<div className="bg-gray-800 h-screen w-full flex flex-col relative">
			<ScrollToBottom
				followButtonClassName="bg-down-arrow bg-[length:75%_75%] bg-center mb-[45px] bg-no-repeat bg-white bg-opacity-0 hover:bg-opacity-100"
				className="h-[97%] w-full"
				scrollViewClassName="scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 px-10 py-4"
			>
				{chatHistory.map((chat, index) => (
					<div key={index} className="flex flex-col mb-2">
						<div className="flex flex-col mb-2">
							{chat.UserPrompt && (
								<>
									<div className="flex items-center mb-1 justify-end h-10">
										<div className="bg-transparent w-5 h-5 rounded-full mr-2 flex items-center justify-center">
											<img src={user} alt="Interio IO Logo" />
										</div>
										<p>{localStorage.getItem("name")}</p>
									</div>
									<div className="bg-gray-700 rounded-lg p-4">
										<pre className="whitespace-pre-wrap text-left">
											{chat.UserPrompt}
										</pre>
									</div>
								</>
							)}
							{chat.GPTPrompt && (
								<>
									<div className="flex items-center mb-1">
										<div className="bg-transparent w-7 my-2 mr-3 rounded-full flex items-center justify-center">
											<img src={logo} alt="Interio IO Logo" />
										</div>
										<p>Interio AI</p>
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
										<div className="bg-transparent w-8 h-8 rounded-full mr-2 flex items-center justify-center">
											<img src={logo} alt="Interio IO Logo" />
										</div>
										<p className="text-sm">Interio AI</p>
									</div>
									<div className="bg-gray-700 rounded-lg p-3 mt-2">
										<pre>Generating response... Please wait a few seconds.</pre>
									</div>
								</>
							)}
							{chat.DALLEPrompts && (
								<div className="bg-gray-700 rounded-lg p-3 mt-2">
									<pre>
										Click on one of the prompts and I will generate some images!
									</pre>
									{
										<div className="p-2">
											<button
												onClick={(e) => sendDALLEPrompt(e, index, prompt)}
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
												onClick={(e) => sendDALLEPrompt(e, index, dalle)}
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
								<div className="bg-gray-700 rounded-lg p-3 mt-2">
									<pre>Generating images... Please wait a few seconds.</pre>
								</div>
							)}
							<div className="mt-2 flex items-center justify-center flex-col">
								{chat.ImageB64 && chat.ImageB64[0] && (
									<>
										<button
											className="p-2 w-full"
											onClick={() => selectBaseImage(index)}
										>
											Select As Base Image
										</button>
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
									</>
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
