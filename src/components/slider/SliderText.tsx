import React, { ReactNode } from "react";
import { Button } from "antd";
import "../../styles/modal.slider.css";
import { Link } from "react-router-dom";

interface SliderTextProps {
    title?: string;
    description?: string;
    buttonText?: string;
    href?: string;
    style?: React.CSSProperties;
}

const SliderText: React.FC<SliderTextProps> = ({ title, description, buttonText, href = '#', style }) => {
    return (
        <div className={`slider-text`} style={style}>
            <div className="slider-text-content" style={style}>
                <h2 className="title">{title}</h2>
                <p className="content">{description}</p>
                <Button className="slider-btn">
                    <Link to={href}>
                        <p style={{fontSize: "16px"}} >{buttonText}</p>
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default SliderText;
