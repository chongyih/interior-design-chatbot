import { useState } from "react"
import { Outlet } from "react-router-dom"
import InterioAILogo from "../assets/logo.png"
import { useCreateUserMutation } from "../redux/authApiSlice"
import { useAlert } from "react-alert"

const FirstLogin = () => {
	const [name, setName] = useState("")
	const [creatingAccount, setCreatingAccount] = useState<boolean>(false)
	const [signUp] = useCreateUserMutation()
	const alert = useAlert()

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value)
	}

	const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setCreatingAccount(true)

		const resp = await signUp({ name: name })
		console.log(resp)
		if (resp.data) {
			// wait for 2 seconds to simulate account creation
			setTimeout(() => {
				localStorage.setItem("user_id", resp.data.id)
				localStorage.setItem("name", resp.data.name)
				setCreatingAccount(false)
			}, 2000)
		} else {
			console.error("Error creating user")
			alert.error("Error creating user")
			setCreatingAccount(false)
		}
	}

	return localStorage.getItem("user_id") && localStorage.getItem("name") ? (
		<Outlet />
	) : (
		<div className="min-h-screen flex items-center justify-center transition-transform duration-1000">
			{creatingAccount ? (
				<div className="bg-gray-700 p-8 rounded-lg shadow-lg flex items-center justify-center flex-col">
					<img src={InterioAILogo} />
					<h1 className="text-2xl font-bold mb-4">
						Creating account for you. Please wait...
					</h1>

					<div className="inline-block w-14 h-14 border-t-4 border-t-white rounded-full animate-spin"></div>
				</div>
			) : (
				<div className="bg-gray-700 p-8 rounded-lg shadow-lg flex items-center justify-center flex-col">
					<img src={InterioAILogo} />
					<h1 className="text-2xl font-bold mb-4">
						Welcome to Interio AI! Tell us about yourself.
					</h1>
					<form
						onSubmit={handleFormSubmit}
						className="flex items-center justify-center flex-col w-full"
					>
						<div className="mb-4 w-full">
							<label className="block font-bold mb-2" htmlFor="name">
								Name
							</label>
							<input
								className="appearance-none border rounded w-full py-2 px-3 bg-inherit leading-tight focus:outline-none focus:shadow-outline"
								id="name"
								type="text"
								value={name}
								onChange={handleNameChange}
							/>
						</div>
						<button
							className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 w-24 rounded focus:outline-none focus:shadow-outline"
							type="submit"
						>
							Start
						</button>
					</form>
				</div>
			)}
		</div>
	)
}

export default FirstLogin
