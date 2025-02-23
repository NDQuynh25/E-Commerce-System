import React from 'react';
import { Tooltip } from 'antd';

interface RequiredLabelProps {
    label: string;
    tooltip: string;
  }
  
const RequiredLabel: React.FC<RequiredLabelProps> = ({ label, tooltip }) => (
<div style={{ display: 'flex', alignItems: 'center'}}>
    <span style={{marginRight: '2px'}}>{label}</span>
    <Tooltip title={tooltip} placement="top">
        <svg width={16.5} height={16.5} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g fill="rgb(0, 136, 255)" clip-path="url(#365__a)"><path d="M11.1 7.5v1.8h1.8v-1.8z"></path><path d="M11.1 12.9v3.6h2.7v-1.8h-.9v-3.6h-2.7v1.8z"></path><path fill-rule="evenodd" d="M12 3c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9m-7.2 9c0 4 3.2 7.2 7.2 7.2s7.2-3.2 7.2-7.2-3.2-7.2-7.2-7.2-7.2 3.2-7.2 7.2" clip-rule="evenodd"></path></g><defs><clipPath id="365__a"><path fill="currentColor" d="M3 3h18v18h-18z"></path></clipPath></defs></svg>
    </Tooltip>
</div>
);
export default RequiredLabel;