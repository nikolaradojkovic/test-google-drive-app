import React, { useState, useEffect } from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import CircularProgress from "@mui/material/CircularProgress";

async function getBlobFile(fileId, fileType) {
    try {
        const response = await fetch(`https://test-google-drive-api.vercel.app/google_drive/${fileId}/google_file_blob?type=${fileType}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch document blob');
        }
        const blob = await response.blob();
        return blob;
    } catch (error) {
        console.error('Error fetching document blob:', error);
        throw error;
    }
}

export default function GoogleDocumentViewer ({ fileId, fileType, fileName }) {
    const [documentBlob, setDocumentBlob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        if(fileType === 'application/vnd.google-apps.spreadsheet') {
            fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        } else if (fileType === 'application/vnd.google-apps.document') {
            fileType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        }

        getBlobFile(fileId, fileType)
            .then(blob => {
                if (isMounted) {
                    setDocumentBlob(blob);
                    console.log({uri : URL.createObjectURL(blob)})
                    setLoading(false);
                }
            })
            .catch(error => {
                console.error('Error fetching document blob:', error);
                setLoading(false);
            });

        return () => {
            isMounted = false; // Cleanup function to prevent state updates after unmounting
        };
    }, [fileId, fileType]);

    if (loading) {
        return (<CircularProgress />);
    }

    return (
        <>
            {documentBlob && (
                <DocViewer
                    pluginRenderers={DocViewerRenderers}
                    config={{ header: { disableHeader: true } }}
                    documents={[
                        { uri: URL.createObjectURL(documentBlob), fileType: fileType, fileName,  }
                        //{ uri: 'https://wp-test-22.dreamhosters.com/wp-content/uploads/2024/03/Document.docx', fileType: fileType, fileName,  }
                        //{ uri: 'https://wp-test-22.dreamhosters.com/wp-content/uploads/2024/03/test-sadsad.xlsx', fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', fileName,  }

                    ]}
                />
            )}
        </>
    );
}
