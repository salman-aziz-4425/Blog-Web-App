import React from 'react'
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from './Pages/Home'
import Login from './Pages/Login'

const ProtectedRoute = ({ userID, children }) => {
	if (userID === 0) {
		return <Navigate to="/" />
	}
	return children
}

const OpeningProtectedRoute = ({ userID, children }) => {
	if (userID !== 0) {
		return <Navigate to="/Home" />
	}
	return children
}

const App = () => {
	const userID = useSelector((state) => state.postHandler.userID) || 0
	return (
		<Router>
			<Routes>
				<Route
					exact
					path="/"
					element={
						<OpeningProtectedRoute userID={userID}>
							<Login />
						</OpeningProtectedRoute>
					}
				/>
				<Route
					path="Home"
					element={
						<ProtectedRoute userID={userID}>
							<Home />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</Router>
	)
}

export default App
