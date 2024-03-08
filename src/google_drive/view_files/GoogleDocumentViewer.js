import React, { useState, useEffect } from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

export default function GoogleDocumentViewer ({ fileId, fileType, fileName }) {

    const [fileTypeChanged, setFileTypeChanged] = useState(null);

    useEffect(() => {
        if(fileType === 'application/vnd.google-apps.spreadsheet') {
            setFileTypeChanged('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            //fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        } else if (fileType === 'application/vnd.google-apps.document') {
            setFileTypeChanged('application/vnd.openxmlformats-officedocument.wordprocessingml.document')
            //fileType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        }
    }, [fileType]);

    return (
        <>
            {fileTypeChanged && (
                <DocViewer
                    pluginRenderers={DocViewerRenderers}
                    documents={[
                        { uri: `https://test-google-drive-api.vercel.app/google_drive/${fileId}/google_file_blob?type=${fileTypeChanged}`, fileType: fileTypeChanged, fileName,  }
                    ]}
                />
            )}
        </>
    );
}
