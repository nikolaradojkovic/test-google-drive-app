import {Box, Typography} from '@mui/material';
import LeftPanel from "./LeftPanel";
import {useEffect, useState} from "react";
import LeftPanelTree from "./LeftPanelTree";
import CircularProgress from '@mui/material/CircularProgress';
import RightPanel from "./RightPanel";
import ViewFilePopup from "./ViewFilePopup";

async function getGoogleDriveNodes() {
    //console.log({credentials})
    return fetch(`https://test-google-drive-api.vercel.app/google_drive`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(data => data.json())
}

export default function GoogleDrive(){

    const [firstRender, setFirstRender] = useState(true);
    const [nodes, setNodes] = useState(null);
    const [clickedNode, setClickedNode] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewFile, setViewFile] = useState(null);

    useEffect(() => {
        if(firstRender){
            getGoogleDriveNodes().then(result => {
                setNodes(result?.filesAndFolders);
                setClickedNode(result?.filesAndFolders);
                setLoading(false);
            })
            setFirstRender(false);
        }
    });

    const handleOnFileClick = (node) => {
        if(node.type === 'file') {
            setViewFile(node);
        }
    }

    const handleOnClick = (node) => {
        if(!node?.parentNode) node['parentNode'] = clickedNode;
        setClickedNode(node);
    }

    const handleGoBack = (node) => {
        handleOnClick(node.parentNode);
    }

    const exitImage = () => {
        setViewFile(null)
    }

    if(loading) {
        return (
            <Box sx={{ display: 'flex', height:'100vh', width:'100vw', alignItems:'center', justifyContent:'center'}}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Box sx={{display:'flex'}}>
            {nodes && <LeftPanelTree data={nodes} handleOnClick={handleOnClick} clickedNode={clickedNode}/>}
            <RightPanel node={clickedNode} handleOnClick={handleOnClick} handleGoBack={handleGoBack} handleOnFileClick={handleOnFileClick}/>
            {viewFile && <ViewFilePopup file={viewFile} exit={exitImage}/>}
        </Box>
    )
}
