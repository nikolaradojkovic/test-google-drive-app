import React, { useState, useEffect } from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import CircularProgress from "@mui/material/CircularProgress";
import './style.css'

async function getBlobFile(fileId, fileType) {
    try {
        const response = await fetch(`https://test-google-drive-api.vercel.app/google_drive/${fileId}/blob?type=${fileType}`, {
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

export default function PdfDocumentViewer ({ fileId, fileType, fileName }) {
    /*const [documentBlob, setDocumentBlob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

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
    }*/

    return (
        /*<>
            {documentBlob && (
                <iframe
                    src={URL.createObjectURL(documentBlob)}
                    width='100%' height='100%' frameBorder='0'>
                </iframe>
            )}
        </>*/
        <DocViewer
            config={{
                header: {
                    disableHeader: true,
                },
                csvDelimiter: ",", // "," as default,
                pdfZoom: {
                    defaultZoom: 0.5, // 1 as default,
                    zoomJump: 0.2, // 0.1 as default,
                },
                pdfVerticalScrollByDefault: true, // false as default
            }}
            documents={[
                { uri: `https://test-google-drive-api.vercel.app/google_drive/${fileId}/blob?type=${fileType}`, fileType: fileType, fileName }
            ]}
        />

    );
}
