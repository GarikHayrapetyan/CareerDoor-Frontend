import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Header, Icon } from 'semantic-ui-react';
import { useStore } from '../../store/store';

interface Props{
    uploadDocument: (file: Blob) => void;
}

export default function DocumentWidgetDropzone({uploadDocument}:Props) {

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
			uploadDocument(acceptedFiles[0])
		},
		[uploadDocument]
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});

   

	return (
		<div {...getRootProps()} style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}>
			<input {...getInputProps()} accept="application/pdf"/>
			<Icon name='upload' size='huge' />
            <Header content='Drop file here' />
		</div>
	);
}
