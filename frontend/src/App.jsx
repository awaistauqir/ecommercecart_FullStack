import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Resume from './pages/Resume';
import ResumeContexProvider from './store/resumeContext';
function App() {
	return (
		<ResumeContexProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" exact element={<Home />} />
					<Route path="/resume" exact element={<Resume />} />
				</Routes>
			</BrowserRouter>
		</ResumeContexProvider>
	);
}

export default App;
