import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { Provider as AlertProvider } from "react-alert"
import AlertTemplate from "react-alert-template-basic"
import "./index.css"
import "react-image-gallery/styles/css/image-gallery.css"
import store from "./redux/store"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Provider store={store}>
		<AlertProvider
			template={AlertTemplate}
			{...{ position: "top center", timeout: 2000 }}
		>
			<App />
		</AlertProvider>
	</Provider>
)
