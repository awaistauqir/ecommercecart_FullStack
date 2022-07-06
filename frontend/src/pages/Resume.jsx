import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Contact from '../components/Forms/Contact';
import Education from '../components/Forms/Education';
import Interests from '../components/Forms/Interests';

import PersonalDetails from '../components/Forms/PersonalDetails';
import Projects from '../components/Forms/Projects';
import Works from '../components/Forms/Works';
import ProfileStatus from '../components/ProfileStatus';
import { resumeContext } from '../store/resumeContext';
import Download from '../components/Download';

const Resume = () => {
	const { resume, resumeUsername } = useContext(resumeContext);
	const navigate = useNavigate();
	if (!resumeUsername && !resume) {
		navigate('/', { replace: true });
	}
	return (
		<Container>
			<StyledResume>
				<Left>
					<ProfileStatus resume={resume} />
				</Left>
				<Right>
					{resume && <Download />}
					<Contact contactDetails={resume?.contact ? resume.contact : null} />
					<PersonalDetails
						personalDetails={
							resume?.personalDetails ? resume.personalDetails : null
						}
					/>
					{resume && (
						<>
							<Projects projects={resume?.projects} />
							<Works works={resume?.work} />
							<Education education={resume?.education} />
							<Interests interests={resume?.interests} />
						</>
					)}
				</Right>
			</StyledResume>
		</Container>
	);
};

export default Resume;
const Container = styled.div`
	width: 100%;
	margin: 0 auto;
	max-width: 1536px;
	padding: 0.5rem 0.75rem;
	@media (min-width: 640px) {
		width: 100%;
		padding: 1rem;
	}
	@media (min-width: 768px) {
		max-width: 768px;
	}
	@media (min-width: 1024px) {
		max-width: 1024px;
	}
	@media (min-width: 1280px) {
		max-width: 1280px;
	}
	@media (min-width: 1536px) {
		max-width: 1536px;
	}
`;
const StyledResume = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	gap: 3rem;
	@media (max-width: 768px) {
		flex-direction: column;
		gap: 2rem;
	}
`;
const Left = styled.div`
	flex: 0.3;
	margin-top: 2rem;
	@media (max-width: 768px) {
		/* flex: 1; */
		margin: 0;
		width: 100%;
	}
`;
const Right = styled.div`
	flex: 0.7;
	display: flex;
	flex-direction: column;
	gap: 2rem;
	@media (max-width: 768px) {
		/* flex: 1; */
		width: 100%;
	}
`;
