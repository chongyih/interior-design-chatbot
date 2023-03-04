import { useEditDalleMutation } from "../redux/dalleApiSlice"

const Menu = ({ baseImage }: { baseImage: string }) => {
	const [editImage] = useEditDalleMutation()

	return (
		<div className="bg-neutral-900 w-60 h-screen fixed flex items-center justify-center">
			{baseImage && (
				<div className="w-60 h-60 flex flex-col items-center justify-center">
					<pre>Base Image</pre>
					<img
						className={`w-60 h-60`}
						alt="Base Image"
						src={`data:image/png;base64,${baseImage}`}
						onClick={() =>
							editImage({ prompt: "more japanese style theme", baseImage })
						}
					/>
				</div>
			)}
		</div>
	)
}

export default Menu
