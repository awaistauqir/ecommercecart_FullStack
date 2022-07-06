import React from 'react';
import {
	Page,
	Text,
	Document,
	StyleSheet,
	View,
	Link,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
	body: {
		paddingTop: 15,
		paddingBottom: 15,
		paddingHorizontal: 35,
		textAlign: 'left',
	},
	title: {
		fontSize: 18,
		textAlign: 'center',
		marginVertical: 5,
	},
	text: {
		fontSize: 12,
		fontFamily: 'Times-Roman',
		textAlign: 'left',
		marginVertical: 5,
	},
	subheading: {
		textAlign: 'left',
		fontSize: 14,
		fontWeight: 600,
	},
	contactSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		textAlign: 'left',
		marginVertical: 10,
	},

	separator: {
		height: '1px',
		backgroundColor: 'black',
		width: '100%',
		marginVertical: 10,
	},
	box: {
		border: '1px solid black',
		padding: 7,
		marginVertical: 5,
	},
});

const PDFFiles = ({ resume }) => {
	return (
		<Document>
			<Page size={'A4'} style={styles.body}>
				<View style={styles.contactSection}>
					<Text style={styles.text}>{resume?.contact?.email}</Text>
					<Text style={styles.title}>{resume?.contact?.name}</Text>
					<Text style={styles.text}>{resume?.contact?.phone}</Text>
				</View>
				<View style={styles.separator} />
				<View style={styles.contactSection}>
					<Link style={styles.text} srx={resume?.personalDetails?.linkedin}>
						LinkedIn
					</Link>
					<Link style={styles.text} srx={resume?.personalDetails?.portfolio}>
						Portfolio
					</Link>
					<Link style={styles.text} srx={resume?.personalDetails?.github}>
						Github
					</Link>
				</View>
				<View style={styles.separator} />
				<Text style={styles.title}>Projects</Text>
				{resume.projects.map((project) => (
					<View style={styles.box}>
						<Text style={styles.subheading}>{project.title}</Text>
						<Text style={styles.subheading}>
							Project Link:{' '}
							<Link src={project.link} style={styles.text}>
								Link
							</Link>
						</Text>
						<Text style={styles.subheading}>
							Descripiton:{' '}
							<Text style={styles.text}>{project.description}</Text>{' '}
						</Text>
					</View>
				))}
				<View style={styles.separator} />
				<Text style={styles.title}>Employment</Text>

				{resume.work.map((w) => (
					<View style={styles.box}>
						<Text style={styles.subheading}>
							Role: <Text style={styles.text}>{w.roleTitle}</Text>
						</Text>
						<Text style={styles.subheading}>
							Company: <Text style={styles.text}>{w.company}</Text>
						</Text>

						<Text style={styles.subheading}>
							Joining and leaving:{' '}
							<Text style={styles.text}>
								{w.startDate} - {w.present ? 'Still Working' : w.endDate}
							</Text>
						</Text>
						<Text style={styles.subheading}>
							Descripiton: <Text style={styles.text}>{w.description}</Text>
						</Text>
					</View>
				))}
				<View style={styles.separator} />
				<Text style={styles.title}>Education</Text>

				{resume.education.map((e) => (
					<View style={styles.box}>
						<Text style={styles.subheading}>
							Institution: <Text style={styles.text}>{e.institution}</Text>
						</Text>
						<Text style={styles.subheading}>
							Education Type: <Text style={styles.text}>{e.educationType}</Text>
						</Text>
						<Text style={styles.subheading}>
							Grade: <Text style={styles.text}>{e.grade}</Text>
						</Text>
						<Text style={styles.subheading}>
							Field: <Text style={styles.text}>{e.field}</Text>
						</Text>

						<Text style={styles.subheading}>
							Joining and leaving:{' '}
							<Text style={styles.text}>
								{e.startDate} - {e.present ? 'Still Studying' : e.endDate}
							</Text>
						</Text>
						<Text style={styles.subheading}>
							Description: <Text style={styles.text}>{e.description}</Text>
						</Text>
					</View>
				))}
				<View style={styles.separator} />
				<Text style={styles.title}>Interests</Text>

				<View style={styles.box}>
					{resume.interests.map((i) => (
						<Text style={styles.subheading}>
							Interest: <Text style={styles.text}>{i.interest}</Text>
						</Text>
					))}
				</View>
			</Page>
		</Document>
	);
};

export default PDFFiles;
