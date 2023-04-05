import FileUploadIcon from "@mui/icons-material/FileUpload"
import { useAlert } from "react-alert"
import { useUploadBaseMutation } from "../redux/imageApiSlice"
import { IGPTPrompt } from "../types/prompt"

const FileUpload = ({
	setChatHistory,
	setBaseImage,
}: {
	setChatHistory: React.Dispatch<React.SetStateAction<IGPTPrompt[]>>
	setBaseImage: React.Dispatch<React.SetStateAction<string>>
}) => {
	const alert = useAlert()
	const [uploadBaseImage] = useUploadBaseMutation()

	const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0]
		if (!file) {
			alert.error("Error uploading image. Please try again.")
			return
		}

		setChatHistory((prev) => [
			{
				GPTPrompt: "Uploading image. Please wait...",
			},
		])

		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = async () => {
			const base64 = reader.result?.toString().split(",")[1]

			const resp = await uploadBaseImage({
				chat_id: localStorage.getItem("chat_id") || "",
				image: base64,
			})

			if (resp.error) {
				alert.error("Error uploading image. Please try again.")
				setChatHistory([])
				return
			}

			setChatHistory((prev) => [
				{
					GPTPrompt:
						"Hi there! I'm Interio AI, your interior design assistant. Tell me about your dream home and I'll help you design it!",
				},
			])

			setBaseImage(resp.data.imageLink || "")
		}
	}

	return (
		<div className="absolute inset-0 flex flex-col items-center justify-center">
			<span className="bg-transparent text-white font-semibold py-2 px-4 w-1/2 text-center">
				Don't have a design in mind? No worries, start chatting to create your
				base image! If you already have a design you want to build upon, simply
				upload it to get started.
			</span>
			<div className="relative flex items-center justify-center h-60 border-dotted border-2 border-gray-400 rounded-lg w-1/2">
				<input
					id="file-upload"
					name="file-upload"
					type="file"
					className="absolute h-full w-full opacity-0 cursor-pointer"
					onChange={handleSubmit}
				/>
				<label
					htmlFor="file-input"
					className="block bg-transparent text-center cursor-pointer"
				>
					<FileUploadIcon className="!text-7xl" />
				</label>
			</div>
		</div>
	)
}

export default FileUpload
