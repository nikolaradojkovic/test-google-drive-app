import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

export default function LeftPanelTree({ data, handleOnClick, clickedNode }) {
    const [expandedNodes, setExpandedNodes] = useState([]);

    useEffect(() => {
        // Update expandedNodes state when clickedNode changes
        if (clickedNode) {
            setExpandedNodes((prevExpandedNodes) => [...prevExpandedNodes, clickedNode.id]);
        }
    }, [clickedNode]);

    const handleNodeToggle = (event, nodeIds) => {
        setExpandedNodes(nodeIds);
    };

    return (
        <Box sx={{minHeight: '100vh', flexGrow: 1, width: 350, borderRight: '1px solid #999999', background:'rgba(0,0,0,0.1)'}}>
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                expanded={expandedNodes}
                onNodeToggle={handleNodeToggle}
            >
                {renderTree(data, handleOnClick, clickedNode)}
            </TreeView>
        </Box>
    );
}

function renderTree(nodes, handleOnClick, clickedNode) {
    return (
        <TreeItem
            key={nodes.id}
            nodeId={nodes.id}
            label={nodes.name}
            onClick={() => handleOnClick(nodes)}
            sx={{ background: (clickedNode && clickedNode.id === nodes.id) ? 'rgba(0,0,0,0.1)' : 'none' }}
        >
            {Array.isArray(nodes.contents)
                ? nodes.contents.map((node) => renderTree(node, handleOnClick, clickedNode))
                : null}
        </TreeItem>
    );
}

