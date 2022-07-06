import React, { useContext } from 'react';
import styled from 'styled-components';
import { Card, UpdateButton } from '../styles';
import { resumeContext } from '../store/resumeContext';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFFiles from './PDFFiles';
const Download = () => {
	const { resume } = useContext(resumeContext);
	const profileCompleted = () => {
		if (
			resume.projects.length > 0 &&
			resume.education.length > 0 &&
			resume.work.length > 0 &&
			resume.interests.length > 0 &&
			resume.personalDetails &&
			resume.contact
		) {
			return true;
		}
		return false;
	};
	console.log(profileCompleted());
	return (
		<Card>
			<StyledDownload>
				<p>Complete your Profile to download the resume.</p>

				{profileCompleted && (
					<PDFDownloadLink
						document={<PDFFiles resume={resume} />}
						fileName="FORM"
					>
						<UpdateButton disabled={!profileCompleted()}>
							Download PDF
						</UpdateButton>
					</PDFDownloadLink>
				)}
			</StyledDownload>
		</Card>
	);
};

export default Download;
const StyledDownload = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
