import React from 'react';
import styled from 'styled-components';
import { BsPersonCheck } from 'react-icons/bs';
const ProfileStatus = ({ resume }) => {
	return (
		<StyledProfileStatus>
			<h3>Profile Status</h3>
			<div>
				<Single>
					<p>Detailed Work Experience</p>
					<Check check={resume?.work.length > 0}>{<BsPersonCheck />}</Check>
				</Single>
			</div>
			<div>
				<Single>
					<p>Education History</p>
					<Check check={resume?.education.length > 0}>
						{<BsPersonCheck />}
					</Check>
				</Single>
			</div>
			<div>
				<Single>
					<p>Projects</p>
					<Check check={resume?.projects.length > 0}>{<BsPersonCheck />}</Check>
				</Single>
			</div>
			<div>
				<Single>
					<p>Interests</p>
					<Check check={resume?.interests.length > 0}>
						{<BsPersonCheck />}
					</Check>
				</Single>
			</div>
			<div>
				<Single>
					<p>Personal Details</p>
					<Check check={resume?.personalDetails}>{<BsPersonCheck />}</Check>
				</Single>
			</div>
			<div>
				<Single>
					<p>Contact</p>
					<Check check={resume?.contact}>{<BsPersonCheck />}</Check>
				</Single>
			</div>
		</StyledProfileStatus>
	);
};

export default ProfileStatus;
const StyledProfileStatus = styled.div`
	padding: 1rem;
	border-radius: 8px;
	background-color: #fff;
	width: 100%;
	h3 {
		margin-bottom: 1rem;
	}
`;
const Single = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const Check = styled.span`
	font-size: 1.25rem;
	color: ${(props) => (props.check ? '#22C55E' : 'gray')};
`;
