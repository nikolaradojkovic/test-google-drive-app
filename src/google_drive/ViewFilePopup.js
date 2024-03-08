import {Box, Button} from "@mui/material";
import {useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import MicrosoftDocumentViewer from "./view_files/MicrosoftDocumentViewer";
import PdfDocumentViewer from "./view_files/PdfDocumentViewer";
import GoogleDocumentViewer from "./view_files/GoogleDocumentViewer";

export default function ViewFilePopup({file, exit}){
    const [fileImage, setFileImage] = useState(null);
    const [wordDocument, setWordDocument] = useState(null);
    const [googleDocument, setGoogleDocument] = useState(null);
    const [pdfDocument, setPdfDocument] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [fileName, setFileName] = useState(null);

    useEffect(() => {
        if(file.mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            setWordDocument(file.id);
            setPdfDocument(null);
            setFileImage(null);
            setGoogleDocument(null);
        } else if(file.mimeType === 'application/pdf') {
            setPdfDocument(file.id);
            setWordDocument(null);
            setFileImage(null);
            setGoogleDocument(null);
        } else if (file.mimeType === 'application/vnd.google-apps.spreadsheet' || file.mimeType === 'application/vnd.google-apps.document') {
            setGoogleDocument(file.id);
            setPdfDocument(null);
            setWordDocument(null);
            setFileImage(null);
        } else {
            setFileImage(file?.imageFull ? file.imageFull : file.thumbnail);
            setWordDocument(null);
            setPdfDocument(null);
            setGoogleDocument(null);
        }

        setFileType(file.mimeType);
        setFileName(file.name);
        console.log(file.mimeType);
    }, [file]);

    return (
        <Box sx={{position:'fixed', top:0, left:0, background:'rgba(0,0,0,0.7)', height:1, width:1, display:'flex', alignItems: 'center', justifyContent:'center'}}>
            <Button onClick={exit} variant={'contained'} sx={{position:'absolute', top:25, right:25, zIndex:10}}>Exit</Button>
            { wordDocument && <MicrosoftDocumentViewer fileId={wordDocument} fileType={fileType} fileName={fileName}/> }
            { pdfDocument && <PdfDocumentViewer fileId={pdfDocument} fileType={fileType} fileName={fileName}/> }
            { googleDocument && <GoogleDocumentViewer fileId={googleDocument} fileType={fileType} fileName={fileName}/> }
            { fileImage && <PreviewImage fileImage={fileImage}/> }
        </Box>
    )

}


function PreviewImage({fileImage}) {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <Box sx={{height:0.9}}>
            <img
                src={fileImage}
                width={"auto"}
                height={"100%"}
                style={{display: imageLoaded ? 'block' : 'none'}}
                onLoad={handleImageLoad}
                alt={"Image preview"}
                referrerPolicy="no-referrer"
            />
            {!imageLoaded && (
                <Box sx={{ width: 1, height: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            )}
        </Box>
    )
}
