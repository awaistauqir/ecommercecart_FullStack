import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

const resumeContext = createContext();

const ResumeContexProvider = (props) => {
	const [resumeUsername, setResumeUsername] = useState('');
	const [resume, setResume] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [value, setValue] = useState(0);
	const increaseValue = () => {
		setValue(value + 1);
	};

	useEffect(() => {
		setLoading(true);
		const getResumes = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/api/getResume/${resumeUsername}`
				);
				if (response.data) {
					console.log(response.data.data);
					setResume(response.data.data);
				}
			} catch (e) {
				console.log('error fetching resumes');
				setError(e.message);
				setLoading(false);
			}
		};
		if (resumeUsername) {
			getResumes();
		}
		setLoading(false);
		setError('');
	}, [value]);

	const contextValue = {
		resumeUsername,
		setResumeUsername,
		resume,
		setResume,
		loading,
		setLoading,
		error,
		setError,
		value,
		setValue,
		increaseValue,
	};

	return (
		<resumeContext.Provider value={contextValue}>
			{props.children}
		</resumeContext.Provider>
	);
};
export { resumeContext };
export default ResumeContexProvider;
