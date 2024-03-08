import React from 'react';
import { Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';



export default function LeftPanelTree({ data, handleOnClick }) {

    return (
            <Box sx={{minHeight: '100vh', flexGrow: 1, width: 350, paddingRight:2, borderRight: '1px solid #999999'}}>
                <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon/>}
                    defaultExpandIcon={<ChevronRightIcon/>}
                >
                    {renderTree(data, handleOnClick)}
                </TreeView>
            </Box>
        )

}

function renderTree(nodes, handleOnClick) {

    return (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} onClick={() => handleOnClick(nodes)}>
            {Array.isArray(nodes.contents)
                ? nodes.contents.map((node) => renderTree(node, handleOnClick))
                : null}
        </TreeItem>
    )
}
