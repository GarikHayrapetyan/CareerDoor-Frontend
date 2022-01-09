import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Header, Icon } from 'semantic-ui-react';
import { useStore } from '../../store/store';

interface Props {
	setUploaded:(x:boolean)=>void
}

export default function DocumentWidgetDropzone({setUploaded}:Props) {
	const {profileStore:{uploadDocument}} = useStore();

	const dzStyles = {
		border: 'dashed 3px #eee',
		borderColor: '#eee',
		borderRadius: '5px',
		paddingTop: '30px',
		textAlign: 'center' as 'center',
		height: 200
	};
	const dzActive = {
		borderColor: 'green'
	};

	const onDrop = useCallback(
		(acceptedFiles) => {			
			console.log(acceptedFiles);		
			setUploaded(false);
			uploadDocument(acceptedFiles[0]).then(()=>{
				setUploaded(true)
			});	
		},
		[setUploaded]
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});

   

	return (
		<div {...getRootProps()} style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}>
			{isDragActive && setUploaded(false)}
			<input {...getInputProps()} accept="application/pdf"/>
			<Icon name='upload' size='huge' />
            <Header content='Drop file here' />
		</div>
	);
}
