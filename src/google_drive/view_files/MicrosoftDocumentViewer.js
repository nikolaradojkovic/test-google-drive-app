import React, { useState, useEffect } from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

export default function MicrosoftDocumentViewer ({ fileId, fileType, fileName }) {

    return (
        <DocViewer
            pluginRenderers={DocViewerRenderers}
            documents={[
                { uri: `https://test-google-drive-api.vercel.app/google_drive/${fileId}/blob?type=${fileType}`, fileType: fileType, fileName }
            ]}
        />
    );
}
