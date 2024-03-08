import {useEffect, useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import FolderImage from '../media/folder-placeholder.png';
import PdfPlaceholder from '../media/pdf-placeholder.png';
import ImagePlaceholder from '../media/image-placeholder.jpg';
import WordPlaceholder from '../media/word-placeholder.png';
import ExcelPlaceholder from '../media/excell-placeholder.png';

export default function RightPanel({node, handleOnClick, handleGoBack, handleOnFileClick}){

    const [name, setName] = useState("");
    const [folder, setFolder] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        if(node){
            setName(node?.name);
            if(node.type === 'folder'){
                setFolder(node);
            } else {
                setFile(node);
            }
        }

    }, [node]);

    return (
        <Box sx={{width:1, padding:2}}>
            <Button onClick={() => handleGoBack(folder)} variant={'contained'} sx={{marginBottom:2}}>GO BACK</Button>
            {
                folder && <ViewFolder folder={folder} handleOnClick={handleOnClick} handleOnFileClick={handleOnFileClick}/>
            }
        </Box>
    )

}

function ViewFolder ({folder, handleOnClick, handleOnFileClick}){

    const [content, setContent] = useState(null);

    useEffect(() => {
        setContent(folder?.contents);
    }, [folder]);

    return (
        <Box>
            <Typography variant={"h5"} mb={2}>{folder.name} </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '2px' }}>
                {
                    (content && content?.length > 0) && content.map(item => {
                        return (
                            item.type === 'folder' ? <FolderItem key={item.id} folder={item} handleOnClick={handleOnClick}/> : <FileItem key={item.id} file={item} thumbnail={item.thumbnail} handleOnFileClick={handleOnFileClick}/>
                        )
                    })
                }
            </Box>
        </Box>

    )
}

function FolderItem({folder, handleOnClick}){
    if(folder) {
        return (
            <Box sx={{width:200, height:200, padding:2, marginTop:2, borderRadius:'8px', boxShadow:'1px 2px 10px 2px rgba(0,0,0,0.1)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between', cursor:'pointer'}} onClick={() => handleOnClick(folder)}>
                <Typography
                    sx={{
                        maxWidth: '180px', // Adjust the maximum width as needed
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        height:0.15
                    }}
                >{folder.name}</Typography>
                <img
                    src={FolderImage}
                    width={"70%"}
                    height={"70%"}
                    style={{objectPosition:'top', marginBottom:15 }}
                />
            </Box>
        )
    }

}

function FileItem({ file, thumbnail, handleOnFileClick }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [defaultThumbnail, setDefaultThumbnail] = useState(null);


    useEffect(() => {
        if(file.mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.mimeType === 'application/vnd.google-apps.document' ) {
            setDefaultThumbnail(WordPlaceholder);
        } else if(file.mimeType === 'application/pdf') {
            setDefaultThumbnail(PdfPlaceholder);
        } else if (file.mimeType === 'application/vnd.google-apps.spreadsheet' || file.mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            setDefaultThumbnail(ExcelPlaceholder);
        } else {
            setDefaultThumbnail(ImagePlaceholder);
        }
    }, [file]);

    const handleImageLoad = (e) => {
        setImageLoaded(true);
    };

    const handleImageError = (err) => {
        setImageError(true);
    };

    //console.log({id:file.id, thumbnail})

    if (file) {
        return (
            <Box sx={{ width: 200, height: 200, padding: 2, marginTop:2, borderRadius: '8px', boxShadow:'1px 2px 10px 2px rgba(0,0,0,0.1)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between', cursor:'pointer' }} onClick={() => handleOnFileClick(file)}>
                <Typography
                    sx={{
                        maxWidth: '180px', // Adjust the maximum width as needed
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        height:0.15
                    }}
                >{file.name}</Typography>
                <img
                    src={(!imageLoaded || imageError || !thumbnail) ? defaultThumbnail : thumbnail}
                    width={"100%"}
                    height={"100%"}
                    style={{ display: 'block', margin:15, boxShadow:'1px 2px 10px 2px rgba(0,0,0,0.1)', objectFit: (!imageLoaded || imageError || !thumbnail) ? "contain" : 'cover', objectPosition:'top' }}
                    onLoad={handleImageLoad}
                    onError={(e) => handleImageError(e)}
                    alt={file.name}
                    referrerPolicy="no-referrer"
                />
            </Box>
        );
    }
}
